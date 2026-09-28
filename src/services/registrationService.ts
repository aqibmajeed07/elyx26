import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Registration, RegistrationFormData, CulturalEvent, RegistrationStatus } from '../types';

const CACHE_KEY = 'elyx26_registrations_cache';

export const registrationService = {
  /**
   * Fetches registrations from Supabase.
   * If studentId is supplied, queries for that student.
   * If admin is authenticated, returns all registrations.
   */
  async fetchRegistrations(studentId?: string): Promise<{ data: Registration[]; error: Error | null }> {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem(CACHE_KEY) || localStorage.getItem('artifex_registrations_cache');
      if (saved) {
        try {
          const list = JSON.parse(saved) as Registration[];
          if (studentId) {
            return { data: list.filter((r) => r.student_id === studentId), error: null };
          }
          return { data: list, error: null };
        } catch {
          // ignore
        }
      }
      return { data: [], error: null };
    }

    try {
      // Standard table query
      let query = supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (studentId) {
        query = query.eq('student_id', studentId);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        const parsed: Registration[] = data.map((d) => ({
          ...d,
          team_members: typeof d.team_members === 'string' ? JSON.parse(d.team_members) : d.team_members || [],
        }));
        return { data: parsed, error: null };
      }

      // 3. Fallback to cached entries if table query returns 0 (e.g. Postgres RLS filter)
      const saved = localStorage.getItem(CACHE_KEY) || localStorage.getItem('artifex_registrations_cache');
      if (saved) {
        try {
          const list = JSON.parse(saved) as Registration[];
          if (studentId) {
            return { data: list.filter((r) => r.student_id === studentId), error: null };
          }
          return { data: list, error: null };
        } catch {
          // ignore
        }
      }

      return { data: [], error: null };
    } catch (err) {
      return { data: [], error: err as Error };
    }
  },

  /**
   * Self-service pass lookup by Register / Roll number.
   */
  async fetchRegistrationsByRegNo(regNo: string): Promise<{ data: Registration[]; error: Error | null }> {
    const cleanRegNo = regNo.trim().toUpperCase();
    if (!cleanRegNo) return { data: [], error: null };

    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        try {
          const list = JSON.parse(saved) as Registration[];
          return {
            data: list.filter((r) => r.register_number.trim().toUpperCase() === cleanRegNo),
            error: null,
          };
        } catch {
          // ignore
        }
      }
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase.rpc('lookup_passes_by_reg_no', {
        target_reg_no: cleanRegNo,
      });

      if (error) {
        // Fall back to local cache if error
        const saved = localStorage.getItem(CACHE_KEY);
        if (saved) {
          try {
            const list = JSON.parse(saved) as Registration[];
            return {
              data: list.filter((r) => r.register_number.trim().toUpperCase() === cleanRegNo),
              error: null,
            };
          } catch {
            // ignore
          }
        }
        return { data: [], error: new Error(error.message) };
      }

      if (data) {
        const parsed: Registration[] = (data as any[]).map((d) => ({
          ...d,
          team_members: typeof d.team_members === 'string' ? JSON.parse(d.team_members) : d.team_members || [],
        }));
        return { data: parsed, error: null };
      }

      return { data: [], error: null };
    } catch (err) {
      return { data: [], error: err as Error };
    }
  },

  /**
   * Submits event registration with strict validation & database constraint enforcement.
   */
  async registerForEvent(
    event: CulturalEvent,
    formData: RegistrationFormData,
    studentId?: string
  ): Promise<{ success: boolean; registration?: Registration; error?: string }> {
    // 1. Verify Event Status
    if (event.status !== 'registration_open') {
      return {
        success: false,
        error: `Registration for ${event.title} is currently closed.`,
      };
    }

    // 2. Verify Registration Deadline
    if (event.registration_deadline) {
      const deadline = new Date(event.registration_deadline).getTime();
      const now = Date.now();
      if (now > deadline) {
        return {
          success: false,
          error: `Registration deadline for ${event.title} has passed.`,
        };
      }
    }

    const regNoNormalized = formData.register_number.trim().toUpperCase();

    // 3. Optional Event Capacity Check
    if (event.max_participants && isSupabaseConfigured) {
      try {
        const { count, error: countErr } = await supabase
          .from('registrations')
          .select('id', { count: 'exact', head: true })
          .eq('event_id', event.id)
          .neq('status', 'cancelled');

        if (!countErr && count !== null && count >= event.max_participants) {
          return {
            success: false,
            error: `Registration is full for "${event.title}". Maximum capacity of ${event.max_participants} reached.`,
          };
        }
      } catch {
        // Proceed if count check encounters transient error
      }
    }

    const newRecord: Registration = {
      id: 'reg-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
      event_id: event.id,
      event_title: event.title,
      student_id: studentId,
      full_name: formData.full_name.trim(),
      register_number: regNoNormalized,
      department: formData.department,
      year: formData.year,
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      college: formData.college.trim(),
      participation_type: event.participation_type,
      team_name: formData.team_name?.trim() || undefined,
      team_members: formData.team_members || [],
      additional_notes: formData.additional_notes?.trim() || undefined,
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const insertPayload = {
          event_id: newRecord.event_id,
          student_id: newRecord.student_id || null,
          full_name: newRecord.full_name,
          register_number: newRecord.register_number,
          department: newRecord.department,
          year: newRecord.year,
          email: newRecord.email,
          phone: newRecord.phone,
          college: newRecord.college,
          participation_type: newRecord.participation_type,
          team_name: newRecord.team_name,
          team_members: newRecord.team_members,
          additional_notes: newRecord.additional_notes,
          status: newRecord.status,
        };

        if (newRecord.student_id) {
          const { data, error: sbError } = await supabase
            .from('registrations')
            .insert(insertPayload)
            .select()
            .single();

          if (sbError) {
            if (sbError.code === '23505' || sbError.message.includes('uq_student_event_reg')) {
              return {
                success: false,
                error: `Register number ${regNoNormalized} is already registered for this event. Duplicate registration rejected.`,
              };
            }
            return {
              success: false,
              error: sbError.message || 'Registration could not be completed. Please check your details and try again.',
            };
          }
          if (data) {
            newRecord.id = data.id;
          }
        } else {
          const { error: sbError } = await supabase
            .from('registrations')
            .insert(insertPayload);

          if (sbError) {
            if (sbError.code === '23505' || sbError.message.includes('uq_student_event_reg')) {
              return {
                success: false,
                error: `Register number ${regNoNormalized} is already registered for this event. Duplicate registration rejected.`,
              };
            }
            return {
              success: false,
              error: sbError.message || 'Registration could not be completed. Please check your details and try again.',
            };
          }
        }
      } catch (err) {
        console.error('Registration Supabase error:', err);
        return {
          success: false,
          error: 'An unexpected error occurred while saving your registration. Please try again.',
        };
      }
    }

    // Update local cache across both keys
    const saved = localStorage.getItem(CACHE_KEY) || localStorage.getItem('artifex_registrations_cache');
    const prev: Registration[] = saved ? JSON.parse(saved) : [];
    const updated = [newRecord, ...prev.filter((r) => r.id !== newRecord.id)];
    localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
    localStorage.setItem('artifex_registrations_cache', JSON.stringify(updated));

    // Dispatch real-time global event so any active admin panels or views update instantly
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('elyx:registration-created', { detail: newRecord }));
    }

    return {
      success: true,
      registration: newRecord,
    };
  },

  /**
   * Admin: Update registration status.
   */
  async updateRegistrationStatus(
    regId: string,
    status: RegistrationStatus
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (isSupabaseConfigured) {
        const { error: sbError } = await supabase
          .from('registrations')
          .update({ status })
          .eq('id', regId);

        if (sbError) {
          return { success: false, error: sbError.message };
        }
      }

      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        const prev: Registration[] = JSON.parse(saved);
        const updated = prev.map((r) => (r.id === regId ? { ...r, status } : r));
        localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  },

  /**
   * Student: Cancel their own registration.
   */
  async cancelRegistration(regId: string): Promise<{ success: boolean; error?: string }> {
    return this.updateRegistrationStatus(regId, 'cancelled');
  },
};

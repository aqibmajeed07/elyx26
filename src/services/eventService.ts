import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { CulturalEvent, EventStatus } from '../types';
import { INITIAL_EVENTS } from '../data/seedData';

const CACHE_KEY = 'elyx26_events_cache';

export const eventService = {
  /**
   * Fetches all events ordered by event date.
   */
  async fetchEvents(): Promise<{ data: CulturalEvent[]; error: Error | null }> {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        try {
          return { data: JSON.parse(saved) as CulturalEvent[], error: null };
        } catch {
          // ignore
        }
      }
      return { data: INITIAL_EVENTS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true, nullsFirst: false });

      if (error) {
        console.warn('Supabase fetch events error:', error.message);
        const saved = localStorage.getItem(CACHE_KEY);
        const fallback = saved ? JSON.parse(saved) : INITIAL_EVENTS;
        return { data: fallback, error: new Error(error.message) };
      }

      if (data) {
        const parsed: CulturalEvent[] = data.map((d) => ({
          ...d,
          rules: typeof d.rules === 'string' ? JSON.parse(d.rules) : d.rules || [],
          faculty_incharge: typeof d.faculty_incharge === 'string' ? JSON.parse(d.faculty_incharge) : d.faculty_incharge || [],
          coordinators: typeof d.coordinators === 'string' ? JSON.parse(d.coordinators) : d.coordinators || [],
        }));
        localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
        return { data: parsed, error: null };
      }

      return { data: [], error: null };
    } catch (err) {
      return { data: INITIAL_EVENTS, error: err as Error };
    }
  },

  /**
   * Fetches an event by slug or ID.
   */
  async fetchEventBySlug(slug: string): Promise<{ data: CulturalEvent | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      const { data } = await this.fetchEvents();
      const ev = data.find((e) => e.slug === slug || e.id === slug) || null;
      return { data: ev, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .maybeSingle();

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      if (data) {
        const parsed: CulturalEvent = {
          ...data,
          rules: typeof data.rules === 'string' ? JSON.parse(data.rules) : data.rules || [],
          faculty_incharge: typeof data.faculty_incharge === 'string' ? JSON.parse(data.faculty_incharge) : data.faculty_incharge || [],
          coordinators: typeof data.coordinators === 'string' ? JSON.parse(data.coordinators) : data.coordinators || [],
        };
        return { data: parsed, error: null };
      }

      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Admin: Creates a new event in Supabase.
   */
  async createEvent(event: CulturalEvent): Promise<{ success: boolean; data?: CulturalEvent; error?: string }> {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('events')
          .insert({
            id: event.id,
            slug: event.slug,
            title: event.title,
            category: event.category,
            participation_type: event.participation_type,
            team_size_min: event.team_size_min,
            team_size_max: event.team_size_max,
            event_date: event.event_date || null,
            start_time: event.start_time || null,
            end_time: event.end_time || null,
            venue: event.venue,
            registration_deadline: event.registration_deadline || null,
            description: event.description,
            rules: event.rules,
            faculty_incharge: event.faculty_incharge,
            coordinators: event.coordinators,
            status: event.status,
            featured: event.featured ?? false,
            max_participants: event.max_participants ?? null,
            eligibility: event.eligibility || 'Open to all students of Government College of Engineering, Tirunelveli',
            image_url: event.image_url || null,
          })
          .select()
          .single();

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true, data: data as CulturalEvent };
      }

      return { success: true, data: event };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  },

  /**
   * Admin: Updates an existing event.
   */
  async updateEvent(updated: CulturalEvent): Promise<{ success: boolean; error?: string }> {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('events')
          .update({
            title: updated.title,
            category: updated.category,
            participation_type: updated.participation_type,
            team_size_min: updated.team_size_min,
            team_size_max: updated.team_size_max,
            event_date: updated.event_date || null,
            start_time: updated.start_time || null,
            end_time: updated.end_time || null,
            venue: updated.venue,
            registration_deadline: updated.registration_deadline || null,
            description: updated.description,
            rules: updated.rules,
            faculty_incharge: updated.faculty_incharge,
            coordinators: updated.coordinators,
            status: updated.status,
            featured: updated.featured ?? false,
            max_participants: updated.max_participants ?? null,
            eligibility: updated.eligibility || 'Open to all students of Government College of Engineering, Tirunelveli',
            image_url: updated.image_url || null,
          })
          .eq('id', updated.id);

        if (error) {
          return { success: false, error: error.message };
        }
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  },

  /**
   * Admin: Updates status of an event (e.g. registration_open / registration_closed).
   */
  async updateEventStatus(eventId: string, newStatus: EventStatus): Promise<{ success: boolean; error?: string }> {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('events')
          .update({ status: newStatus })
          .eq('id', eventId);

        if (error) {
          return { success: false, error: error.message };
        }
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  },

  /**
   * Admin: Deletes an event.
   */
  async deleteEvent(eventId: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', eventId);

        if (error) {
          return { success: false, error: error.message };
        }
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  },
};

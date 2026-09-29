import { useState, useEffect, useCallback } from 'react';
import type { Registration, RegistrationFormData, CulturalEvent, RegistrationStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { registrationService } from '../services/registrationService';

const LOCAL_REGISTRATIONS_KEY = 'elyx26_registrations_cache';

export const useRegistrations = () => {
  const { user, profile, isAdmin } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch registrations from Supabase
  const fetchRegistrations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // If admin, fetch all; if authenticated student, fetch theirs
    const studentId = isAdmin ? undefined : (user?.id || profile?.id);
    const res = await registrationService.fetchRegistrations(studentId);

    if (res.data) {
      setRegistrations(res.data);
      localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(res.data));
    }

    if (res.error) {
      setError(res.error.message);
    }

    setIsLoading(false);
  }, [user?.id, profile?.id, isAdmin]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Real-time live listener for registrations submitted in any tab / modal
  useEffect(() => {
    const handleNewReg = (e: Event) => {
      const customEvent = e as CustomEvent<Registration>;
      if (customEvent.detail) {
        setRegistrations((prev) => {
          const updated = [customEvent.detail, ...prev.filter((r) => r.id !== customEvent.detail.id)];
          localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(updated));
          localStorage.setItem('artifex_registrations_cache', JSON.stringify(updated));
          return updated;
        });
      }
    };
    window.addEventListener('elyx:registration-created', handleNewReg);
    return () => window.removeEventListener('elyx:registration-created', handleNewReg);
  }, []);

  // Submit registration with strict validation & duplicate prevention
  const registerForEvent = async (
    event: CulturalEvent,
    formData: RegistrationFormData
  ): Promise<{ success: boolean; registration?: Registration; error?: string }> => {
    const studentId = user?.id || profile?.id;
    const res = await registrationService.registerForEvent(event, formData, studentId);

    if (res.success && res.registration) {
      setRegistrations((prev) => {
        const updated = [res.registration!, ...prev.filter((r) => r.id !== res.registration!.id)];
        localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(updated));
        localStorage.setItem('artifex_registrations_cache', JSON.stringify(updated));
        return updated;
      });
    }

    return res;
  };

  // Admin capability: update registration status
  const updateRegistrationStatus = async (
    regId: string,
    status: RegistrationStatus
  ): Promise<{ success: boolean; error?: string }> => {
    const res = await registrationService.updateRegistrationStatus(regId, status);
    if (res.success) {
      setRegistrations((prev) => {
        const updated = prev.map((r) => (r.id === regId ? { ...r, status } : r));
        localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(updated));
        return updated;
      });
    }
    return res;
  };

  // Student capability: cancel own registration
  const cancelRegistration = async (regId: string): Promise<{ success: boolean; error?: string }> => {
    const res = await registrationService.cancelRegistration(regId);
    if (res.success) {
      setRegistrations((prev) => {
        const updated = prev.map((r) => (r.id === regId ? { ...r, status: 'cancelled' as RegistrationStatus } : r));
        localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(updated));
        return updated;
      });
    }
    return res;
  };

  // Get registrations for a specific register number (for pass lookup)
  const getRegistrationsByRegNo = (regNo: string) => {
    const clean = regNo.trim().toUpperCase();
    return registrations.filter((r) => r.register_number.trim().toUpperCase() === clean);
  };

  return {
    registrations,
    isLoading,
    error,
    refreshRegistrations: fetchRegistrations,
    registerForEvent,
    updateRegistrationStatus,
    cancelRegistration,
    getRegistrationsByRegNo,
  };
};

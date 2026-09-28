import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile } from '../types';

export const profileService = {
  /**
   * Fetches the user profile by user UUID from Supabase profiles table.
   */
  async getProfile(userId: string): Promise<{ data: Profile | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      const prof = data as Profile;
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id === userId && session.user.user_metadata?.role === 'admin') {
        prof.role = 'admin';
      }

      return { data: prof, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Updates student profile fields (e.g. register number, department, phone).
   */
  async updateProfile(
    userId: string,
    updates: Partial<Omit<Profile, 'id' | 'role' | 'created_at'>>
  ): Promise<{ data: Profile | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem('elyx26_mock_profile');
      let prof: Profile = saved ? JSON.parse(saved) : { id: userId, email: '', full_name: '', role: 'student' };
      prof = { ...prof, ...updates };
      localStorage.setItem('elyx26_mock_profile', JSON.stringify(prof));
      return { data: prof, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      return { data: data as Profile, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },
};

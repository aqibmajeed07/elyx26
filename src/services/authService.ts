import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

export const authService = {
  /**
   * Signs in a user using Supabase Auth password authentication.
   */
  async signIn(email: string, password = ''): Promise<{ user: User | null; session: Session | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { user: null, session: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, session: null, error: new Error(error.message) };
      }

      return { user: data.user, session: data.session, error: null };
    } catch (err) {
      return { user: null, session: null, error: err as Error };
    }
  },

  /**
   * Signs up a new user using Supabase Auth with metadata.
   */
  async signUp(
    email: string,
    password = '',
    fullName = '',
    metadata: Record<string, string> = {}
  ): Promise<{ user: User | null; session: Session | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { user: null, session: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            ...metadata,
          },
        },
      });

      if (error) {
        return { user: null, session: null, error: new Error(error.message) };
      }

      return { user: data.user, session: data.session, error: null };
    } catch (err) {
      return { user: null, session: null, error: err as Error };
    }
  },

  /**
   * Signs out the current user session from Supabase.
   */
  async signOut(): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: new Error(error.message) };
      }
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  },

  /**
   * Gets current active session from Supabase.
   */
  async getSession(): Promise<{ session: Session | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { session: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return { session: null, error: new Error(error.message) };
      }
      return { session: data.session, error: null };
    } catch (err) {
      return { session: null, error: err as Error };
    }
  },

  /**
   * Listens for auth state changes (sign in, sign out, token refresh).
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!isSupabaseConfigured) {
      return { unsubscribe: () => {} };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return subscription;
  },

  /**
   * Sends a password reset email via Supabase.
   */
  async resetPassword(email: string): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`,
      });
      if (error) {
        return { error: new Error(error.message) };
      }
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  },
};

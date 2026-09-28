import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password?: string, fullName?: string, metadata?: Record<string, string>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  mockLoginAsAdmin: () => void;
  mockLoginAsStudent: (name?: string, regNo?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Clean up any legacy mock session on mount
  useEffect(() => {
    try {
      localStorage.removeItem('elyx26_mock_profile');
      localStorage.removeItem('artifex_mock_profile');
    } catch {
      // ignore
    }
  }, []);

  // Fetch Supabase profile from public.profiles
  const fetchProfile = useCallback(async (userId: string, email: string, userMetadata?: Record<string, any>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      const resolvedRole = (data?.role === 'admin' || userMetadata?.role === 'admin') ? 'admin' : (data?.role || 'student');

      if (!error && data) {
        setProfile({
          ...data,
          role: resolvedRole,
        } as Profile);
      } else {
        // Fallback: create profile if trigger hasn't completed yet
        const defaultProfile: Profile = {
          id: userId,
          email,
          full_name: userMetadata?.full_name || email.split('@')[0],
          register_number: userMetadata?.register_number,
          department: userMetadata?.department,
          year: userMetadata?.year,
          phone: userMetadata?.phone,
          role: resolvedRole,
        };

        const { data: upserted } = await supabase
          .from('profiles')
          .upsert(defaultProfile)
          .select()
          .maybeSingle();

        setProfile((upserted as Profile) || defaultProfile);
      }
    } catch (err) {
      console.warn('Error fetching Supabase profile:', err);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user && user.email) {
      await fetchProfile(user.id, user.email, user.user_metadata);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser && currentUser.email) {
          fetchProfile(currentUser.id, currentUser.email, currentUser.user_metadata);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          const currentUser = session?.user ?? null;
          setUser(currentUser);
          if (currentUser && currentUser.email) {
            fetchProfile(currentUser.id, currentUser.email, currentUser.user_metadata);
          } else {
            setProfile(null);
          }
          setIsLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [fetchProfile]);

  const signIn = async (email: string, password = ''): Promise<{ error: Error | null }> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return { error: new Error(error.message) };
      }

      if (data.user && data.user.email) {
        await fetchProfile(data.user.id, data.user.email, data.user.user_metadata);
      }

      return { error: null };
    } else {
      return { error: new Error('Supabase is not configured. Real database authentication is required.') };
    }
  };

  const signUp = async (
    email: string,
    password = '',
    fullName = '',
    metadata: Record<string, string> = {}
  ): Promise<{ error: Error | null }> => {
    if (isSupabaseConfigured) {
      // Prevent client signups from spoofing admin role
      const { role: _spoofedRole, ...safeMetadata } = metadata;
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName,
            ...safeMetadata,
          },
        },
      });

      if (error) {
        return { error: new Error(error.message) };
      }

      if (data.user && data.user.email) {
        await fetchProfile(data.user.id, data.user.email, data.user.user_metadata);
      }

      return { error: null };
    } else {
      return { error: new Error('Supabase is not configured. Real database authentication is required.') };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    try {
      localStorage.removeItem('elyx26_mock_profile');
      localStorage.removeItem('artifex_mock_profile');
    } catch {
      // ignore
    }
  };

  const mockLoginAsAdmin = () => {
    console.warn('Mock admin login is disabled. Real Supabase authentication is required.');
  };

  const mockLoginAsStudent = (_name = 'Student', _regNo = '') => {
    console.warn('Mock student login is disabled. Real Supabase authentication is required.');
  };

  // Strictly enforce that both an authenticated Supabase user and admin role exist
  const isAdmin = Boolean(
    user && (profile?.role === 'admin' || user.user_metadata?.role === 'admin')
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        isLoading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        mockLoginAsAdmin,
        mockLoginAsStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

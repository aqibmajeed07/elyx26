import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { profileService } from '../../services/profileService';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, isAdmin } = useAuth();

  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in as admin, redirect to /admin
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await signIn(email, password);
        if (res.error) {
          setError(res.error.message);
        } else {
          // Strictly verify profile role from Supabase
          const { session } = await authService.getSession();
          if (session?.user) {
            const { data: prof } = await profileService.getProfile(session.user.id);
            const isAuthorized = prof?.role === 'admin' || session.user.user_metadata?.role === 'admin';
            if (!isAuthorized) {
              await authService.signOut();
              setError('Access Denied: This account is authenticated in Supabase but lacks administrator permissions (role is not admin).');
              return;
            }
          }
          navigate('/admin');
        }
      } else if (mode === 'forgot') {
        const res = await authService.resetPassword(email);
        if (res.error) {
          setError(res.error.message);
        } else {
          setSuccessMsg('Password reset instructions have been sent to your email.');
          setMode('login');
        }
      }
    } catch {
      setError('An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-md p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto shadow-md shadow-orange-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400 font-mono">
            GCE Tirunelveli
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
            {mode === 'login' ? 'Organizer & Admin Portal' : 'Reset Password'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authorized portal for ELYX 26 faculty incharges and core event coordinators.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter authorized admin email"
                className="form-input pl-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(null); }}
                  className="text-[11px] text-orange-600 dark:text-orange-400 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input pl-10 text-xs sm:text-sm"
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-xs !py-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'login'
                    ? 'Sign in to Dashboard'
                    : 'Send Password Reset Email'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          {mode === 'forgot' ? (
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-semibold"
            >
              ← Back to Sign In
            </button>
          ) : (
            <Link to="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
              ← Return to ELYX 26 Public Homepage
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

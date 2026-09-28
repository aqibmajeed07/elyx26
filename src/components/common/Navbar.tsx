import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, BookOpen, Users, Ticket, ShieldCheck, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/useTheme';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Events', path: '/events', icon: Sparkles },
    { name: 'Schedule & Rules', path: '/rules', icon: BookOpen },
    { name: 'Coordinators', path: '/coordinators', icon: Users },
    { name: 'My Registrations', path: '/my-registrations', icon: Ticket },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'glass-nav-scrolled' : 'glass-nav'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & College Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative">
              <img
                src="/assets/gcelogo.webp"
                alt="ELYX 26 Official Festival Logo"
                className="w-12 h-12 rounded-full object-contain shadow-md bg-black p-0.5 border border-orange-500/50 group-hover:scale-105 group-hover:shadow-glow-sm transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                GCE Tirunelveli
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                  ELYX<span className="text-orange-600 dark:text-orange-500"> 26</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border border-orange-200/60 dark:border-orange-500/30">
                  Culturals
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-400'}`} />
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-600 dark:bg-orange-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Dark Mode Toggle & Admin Portal & CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Dark Mode Animated Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Admin Portal Button */}
            <Link
              to={isAdmin ? '/admin' : '/admin/login'}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                isAdmin
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                  : 'bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${isAdmin ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-400'}`} />
              <span>{isAdmin ? 'Admin Portal' : 'Admin Login'}</span>
            </Link>

            {/* Primary Action Button */}
            <Link to="/events" className="btn-primary text-xs !py-2 !px-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Events</span>
            </Link>
          </div>

          {/* Mobile Actions: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-col gap-2">
            <Link
              to={isAdmin ? '/admin' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>{isAdmin ? 'Admin Portal' : 'Admin Login'}</span>
            </Link>
            <Link
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary text-center text-sm py-2.5"
            >
              Explore & Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

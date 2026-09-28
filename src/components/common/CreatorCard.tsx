import React from 'react';
import { Code2, ExternalLink } from 'lucide-react';

const LinkedInIcon = () => (
  <svg
    className="w-3.5 h-3.5 fill-current"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

export const CreatorCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`
        relative group overflow-hidden
        p-6 rounded-2xl
        bg-white/80 dark:bg-slate-900/60
        backdrop-blur-xl
        border border-slate-200/90 dark:border-white/10
        hover:border-orange-500/40 dark:hover:border-orange-500/40
        shadow-sm dark:shadow-glass-dark
        hover:shadow-lg dark:hover:shadow-glass-dark-hover
        hover:-translate-y-1
        transition-all duration-300
        ${className}
      `}
    >
      {/* Subtle background ambient gradient on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          {/* Developer Icon Badge */}
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200/80 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Code2 className="w-6 h-6" />
          </div>

          {/* Identity & Role */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-display tracking-tight">
                Aqib Majeed
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-300 border border-orange-200/60 dark:border-orange-500/30">
                Creator & Engineer
              </span>
            </div>

            <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
              Web Developer & Digital Experience
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md pt-0.5">
              Designed and developed the digital experience for GEC Tirunelveli CULTURES.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium flex-wrap">
              <span>Frontend Development</span>
              <span>•</span>
              <span>UI/UX</span>
              <span>•</span>
              <span>Full-Stack Development</span>
              <span>•</span>
              <span>Web Experience</span>
            </div>
          </div>
        </div>

        {/* Action Link to LinkedIn */}
        <a
          href="https://www.linkedin.com/in/aqibmajeed07"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
            bg-slate-900 text-white dark:bg-white dark:text-slate-950
            hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white
            text-xs font-semibold
            shadow-sm hover:shadow-md
            active:scale-[0.98]
            transition-all duration-200 shrink-0 self-stretch sm:self-center justify-center
          "
          aria-label="Connect with Aqib Majeed on LinkedIn"
        >
          <LinkedInIcon />
          <span>Connect on LinkedIn</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  User,
  ShieldAlert,
  GraduationCap,
  Phone,
  Mail,
  ChevronLeft,
  Sparkles,
  Share2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import type { CulturalEvent } from '../types';
import { formatDateTimeRange, getStatusBadgeInfo, getCategoryGradient } from '../utils/formatters';

interface EventDetailsPageProps {
  events: CulturalEvent[];
  onRegisterClick: (event: CulturalEvent) => void;
}

export const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ events, onRegisterClick }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const event = events.find((e) => e.slug === slug || e.id === slug);

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Event Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The requested cultural event could not be found or has been rescheduled.
        </p>
        <Link to="/events" className="btn-primary !text-xs !py-2.5">
          Browse All Events
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusBadgeInfo(event.status);
  const isTeam = event.participation_type === 'team';
  const isOpen = event.status === 'registration_open';
  const isDigital = event.category === 'Digital Events';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${event.title} - ELYX 26`,
          text: `Check out ${event.title} at GCE Tirunelveli Cultural Fest ELYX 26!`,
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event URL copied to clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to events</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          title="Share event link"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Hero Header Banner */}
      <div className="glass-panel overflow-hidden relative">
        <div className={`h-3 bg-gradient-to-r ${getCategoryGradient(event.category)}`} />

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="glass-pill text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {event.category}
                </span>
                <span className={`badge-subtle ${statusInfo.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                  <span className="dark:text-white font-medium">{statusInfo.label}</span>
                </span>
                <span className="badge-subtle bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10">
                  {isTeam ? `Team (Up to ${event.team_size_max})` : 'Individual / Solo'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                {event.title}
              </h1>
            </div>

            {/* Quick Register CTA */}
            {isOpen ? (
              <button
                onClick={() => onRegisterClick(event)}
                className="btn-primary !text-sm !py-3 !px-6 shrink-0 shadow-lg shadow-orange-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Register for Event</span>
              </button>
            ) : (
              <button
                disabled
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10 cursor-not-allowed shrink-0"
              >
                Registration Closed
              </button>
            )}
          </div>

          {/* Key Event Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/10 text-xs">
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/10">
              <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-semibold">Date & Time</strong>
                <span className="text-slate-600 dark:text-slate-300">
                  {formatDateTimeRange(event.event_date, event.start_time, event.end_time)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/10">
              {isTeam ? (
                <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              ) : (
                <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="block text-slate-900 dark:text-white font-semibold">Eligibility</strong>
                <span className="text-slate-600 dark:text-slate-300">
                  All GCE Tirunelveli UG / PG students
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Description & Rules vs Coordinators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description, Rules, Digital info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Event */}
          <div className="glass-panel p-6 sm:p-7 space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              About This Event
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Official Rules & Instructions */}
          <div className="glass-panel p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
              <ShieldAlert className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Official Rules & Instructions
              </h2>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2 mt-4">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>Violation of any rules mentioned above will lead to immediate disqualification.</span>
            </div>
          </div>

          {/* Digital Submission Guidelines if digital event */}
          {isDigital && (
            <div className="glass-panel p-6 sm:p-7 space-y-3 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/30 border-sky-200 dark:border-sky-800/40">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Digital Submission Protocol
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Participants must email their final creative work to{' '}
                <a
                  href={`mailto:elexgce2026@gmail.com?subject=${encodeURIComponent(`ELYX 26 Submission - ${event.title}`)}`}
                  className="font-mono font-bold text-indigo-700 dark:text-indigo-300 underline"
                >
                  elexgce2026@gmail.com
                </a>
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <li>Subject: <span className="font-mono text-slate-800 dark:text-slate-200">ELYX 26 - {event.title}</span></li>
                <li>File Name Format: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">Name - Year - Department</span> (e.g. Arun-IV-CSE.jpeg)</li>
                <li>Final Deadline: <strong>Will be announced soon</strong></li>
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Coordinators & Incharge (1 col) */}
        <div className="space-y-6">
          {/* Faculty In-charge */}
          {event.faculty_incharge && event.faculty_incharge.length > 0 && (
            <div className="glass-panel p-6 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                <GraduationCap className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">Faculty In-Charge</h3>
              </div>
              <div className="space-y-2 text-xs">
                {event.faculty_incharge.map((faculty, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/10">
                    <p className="font-bold text-slate-900 dark:text-white">{faculty.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{faculty.designation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Event Coordinators */}
          {event.coordinators && event.coordinators.length > 0 && (
            <div className="glass-panel p-6 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">Student Coordinators</h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Contact respective senior coordinators if you have any questions or require guidance.
              </p>
              <div className="space-y-2 text-xs">
                {event.coordinators.map((coordinator, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/10 flex items-center justify-between gap-2"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{coordinator.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{coordinator.department}</p>
                    </div>

                    <a
                      href={`tel:${coordinator.phone}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors font-mono text-xs font-semibold"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{coordinator.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Register CTA card */}
          {isOpen && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg space-y-3 text-center">
              <Sparkles className="w-8 h-8 mx-auto text-orange-200" />
              <h3 className="text-lg font-extrabold font-display">Ready to Participate?</h3>
              <p className="text-xs text-orange-100">
                Free registration for all GCE Tirunelveli students. Instant ticket pass generation.
              </p>
              <button
                onClick={() => onRegisterClick(event)}
                className="w-full py-2.5 px-4 rounded-xl font-bold bg-white text-orange-700 hover:bg-orange-50 shadow-sm transition-all text-xs active:scale-95"
              >
                Register Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

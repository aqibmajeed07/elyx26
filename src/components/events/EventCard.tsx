import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, User, Phone, Sparkles, ArrowRight } from 'lucide-react';
import type { CulturalEvent } from '../../types';
import { formatDateTimeRange, getStatusBadgeInfo, getCategoryGradient } from '../../utils/formatters';

interface EventCardProps {
  event: CulturalEvent;
  onRegisterClick: (event: CulturalEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegisterClick }) => {
  const statusInfo = getStatusBadgeInfo(event.status);
  const primaryCoordinator = event.coordinators && event.coordinators.length > 0 ? event.coordinators[0] : null;
  const isTeam = event.participation_type === 'team';
  const isOpen = event.status === 'registration_open';

  return (
    <div className="
      group relative flex flex-col h-full overflow-hidden
      bg-white/80 dark:bg-slate-900/60
      backdrop-blur-xl
      border border-slate-200/80 dark:border-white/10
      hover:border-orange-500/40 dark:hover:border-orange-500/40
      rounded-2xl
      shadow-sm dark:shadow-glass-dark
      hover:shadow-lg dark:hover:shadow-glass-dark-hover
      hover:-translate-y-1.5
      transition-all duration-300 ease-out
    ">
      {/* Top Banner Accent with Category Gradient */}
      <div className="relative overflow-hidden h-2.5">
        <div className={`w-full h-full bg-gradient-to-r ${getCategoryGradient(event.category)} transition-transform duration-300 group-hover:scale-x-105`} />
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Badges row */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="glass-pill text-[11px] font-semibold text-slate-700 dark:text-slate-200">
              {event.category}
            </span>

            <span className={`badge-subtle ${statusInfo.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot} animate-pulse`} />
              <span className="dark:text-white font-medium">{statusInfo.label}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-1 font-display">
            {event.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Event Meta info */}
        <div className="my-4 py-3 border-y border-slate-100 dark:border-white/10 space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
              {formatDateTimeRange(event.event_date, event.start_time, event.end_time)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isTeam ? (
              <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            ) : (
              <User className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            )}
            <span className="truncate">
              {isTeam
                ? `Team Event (${event.team_size_min === event.team_size_max ? `${event.team_size_min} members` : `Up to ${event.team_size_max} members`})`
                : 'Solo / Individual Participation'}
            </span>
          </div>
        </div>

        {/* Primary Coordinator snippet */}
        {primaryCoordinator && (
          <div className="pb-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="truncate">Coord: {primaryCoordinator.name}</span>
            <a
              href={`tel:${primaryCoordinator.phone}`}
              className="inline-flex items-center gap-1 font-mono text-orange-600 dark:text-orange-400 hover:underline shrink-0 ml-2"
              title={`Call ${primaryCoordinator.name}`}
            >
              <Phone className="w-3 h-3" />
              <span>{primaryCoordinator.phone}</span>
            </a>
          </div>
        )}

        {/* Actions Row */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/events/${event.slug}`}
            className="btn-secondary !text-xs !py-2 !px-3 flex-1 text-center justify-center"
          >
            <span>Rules</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {isOpen ? (
            <button
              onClick={() => onRegisterClick(event)}
              className="btn-primary !text-xs !py-2 !px-4 flex-1 justify-center"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          ) : (
            <button
              disabled
              className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10 cursor-not-allowed flex-1 text-center justify-center"
            >
              Closed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

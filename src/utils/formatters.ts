import type { EventCategory, EventStatus, RegistrationStatus } from '../types';

export const formatDate = (_dateStr?: string): string => {
  return 'Will be announced soon';
};

export const formatTime = (timeStr?: string): string => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }
  return timeStr;
};

export const formatDateTimeRange = (
  _dateStr?: string,
  _startTime?: string,
  _endTime?: string
): string => {
  return 'Will be announced soon';
};

export const getStatusBadgeInfo = (status: EventStatus) => {
  switch (status) {
    case 'registration_open':
      return {
        label: 'Registration Open',
        bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        dot: 'bg-emerald-500 animate-pulse',
      };
    case 'upcoming':
      return {
        label: 'Upcoming',
        bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
        dot: 'bg-blue-500',
      };
    case 'registration_closed':
      return {
        label: 'Registration Closed',
        bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        dot: 'bg-amber-500',
      };
    case 'completed':
      return {
        label: 'Event Completed',
        bg: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
        dot: 'bg-slate-400',
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
        dot: 'bg-rose-500',
      };
    default:
      return {
        label: status,
        bg: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
        dot: 'bg-slate-400',
      };
  }
};

export const getRegStatusBadgeInfo = (status: RegistrationStatus) => {
  switch (status) {
    case 'confirmed':
      return {
        label: 'Confirmed',
        bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
      };
    case 'waitlisted':
      return {
        label: 'Waitlisted',
        bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
      };
    default:
      return {
        label: status,
        bg: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
      };
  }
};

export const getCategoryGradient = (category: EventCategory): string => {
  switch (category) {
    case 'Digital Events':
      return 'from-sky-500 to-indigo-600';
    case 'Literary & Arts':
      return 'from-amber-500 to-orange-600';
    case 'Theatre & Performance':
      return 'from-rose-500 to-pink-600';
    case 'Craft & Design':
      return 'from-teal-500 to-emerald-600';
    case 'Music & Vocal':
      return 'from-purple-500 to-violet-700';
    case 'Dance & Choreography':
      return 'from-orange-500 to-red-600';
    case 'Traditional Martial Arts':
      return 'from-yellow-600 to-amber-700';
    case 'Culinary & Lifestyle':
      return 'from-lime-600 to-green-700';
    case 'Adventure & Fun':
      return 'from-cyan-500 to-blue-600';
    default:
      return 'from-orange-500 to-amber-600';
  }
};

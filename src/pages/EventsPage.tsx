import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, User, Users, X } from 'lucide-react';
import type { CulturalEvent } from '../types';
import { EventCard } from '../components/events/EventCard';
import { CATEGORIES } from '../data/departments';
import { AnimatedSection } from '../components/common/AnimatedSection';

interface EventsPageProps {
  events: CulturalEvent[];
  onRegisterClick: (event: CulturalEvent) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ events, onRegisterClick }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [participationFilter, setParticipationFilter] = useState<'all' | 'individual' | 'team'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Search Query
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const titleMatch = event.title.toLowerCase().includes(query);
        const descMatch = event.description.toLowerCase().includes(query);
        const venueMatch = event.venue.toLowerCase().includes(query);
        const coordMatch = event.coordinators?.some((c) =>
          c.name.toLowerCase().includes(query) || c.department.toLowerCase().includes(query)
        );
        if (!titleMatch && !descMatch && !venueMatch && !coordMatch) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Participation Type
      if (participationFilter !== 'all' && event.participation_type !== participationFilter) {
        return false;
      }

      // 4. Status Filter
      if (statusFilter === 'open' && event.status !== 'registration_open') return false;
      if (statusFilter === 'closed' && event.status === 'registration_open') return false;

      return true;
    });
  }, [events, searchQuery, selectedCategory, participationFilter, statusFilter]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setParticipationFilter('all');
    setStatusFilter('all');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
            Official Schedule & Directory
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30">
            30 Events
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          All Cultural Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Browse through all 30 cultural competitions. Official dates and schedules will be announced soon. Filter by category, participation type, or search for your favorite event.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 space-y-4">
        {/* Search Input Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event name, rules, or coordinator..."
              className="form-input pl-10 pr-9 text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Solo / Team Filter */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs border border-slate-200/60 dark:border-white/10">
              <button
                onClick={() => setParticipationFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  participationFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setParticipationFilter('individual')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  participationFilter === 'individual'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Solo</span>
              </button>
              <button
                onClick={() => setParticipationFilter('team')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  participationFilter === 'team'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>Team</span>
              </button>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="form-select !w-auto text-xs py-2"
            >
              <option value="all">All Status</option>
              <option value="open">Registration Open</option>
              <option value="closed">Closed / Completed</option>
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-orange-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <p>
          Showing <strong className="text-slate-900 dark:text-white">{filteredEvents.length}</strong> of{' '}
          {events.length} events
        </p>

        {(searchQuery || selectedCategory !== 'All' || participationFilter !== 'all' || statusFilter !== 'all') && (
          <button
            onClick={handleResetFilters}
            className="text-orange-600 dark:text-orange-400 hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <AnimatedSection animation="fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={onRegisterClick}
              />
            ))}
          </div>
        </AnimatedSection>
      ) : (
        <div className="glass-panel p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No events found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            No events match your current search query or category filter. Try clearing your filters.
          </p>
          <button onClick={handleResetFilters} className="btn-secondary !text-xs !py-2">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

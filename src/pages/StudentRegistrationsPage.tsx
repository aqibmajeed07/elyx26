import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Search, Calendar, Printer, ArrowRight, User, Loader2, Ban } from 'lucide-react';
import { useRegistrations } from '../hooks/useRegistrations';
import { useEvents } from '../hooks/useEvents';
import { registrationService } from '../services/registrationService';
import type { Registration, CulturalEvent } from '../types';
import { RegistrationSuccessCard } from '../components/registration/RegistrationSuccessCard';
import { formatDateTimeRange } from '../utils/formatters';
import { AnimatedSection } from '../components/common/AnimatedSection';

export const StudentRegistrationsPage: React.FC = () => {
  const { cancelRegistration } = useRegistrations();
  const { events } = useEvents();

  const [searchRegNo, setSearchRegNo] = useState('');
  const [queriedRegNo, setQueriedRegNo] = useState('');
  const [matchedRegistrations, setMatchedRegistrations] = useState<Registration[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [selectedPass, setSelectedPass] = useState<{
    registration: Registration;
    event: CulturalEvent;
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchRegNo.trim().toUpperCase();
    if (!clean) return;

    setQueriedRegNo(clean);
    setIsSearching(true);
    setActionMessage(null);

    try {
      const res = await registrationService.fetchRegistrationsByRegNo(clean);
      setMatchedRegistrations(res.data);
    } catch {
      setMatchedRegistrations([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancel = async (regId: string) => {
    if (!window.confirm('Are you sure you want to cancel this event registration?')) {
      return;
    }

    setCancellingId(regId);
    const res = await cancelRegistration(regId);
    setCancellingId(null);

    if (res.success) {
      setActionMessage('Registration cancelled successfully.');
      setMatchedRegistrations((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, status: 'cancelled' } : r))
      );
      setTimeout(() => setActionMessage(null), 4000);
    } else {
      setActionMessage(res.error || 'Failed to cancel registration.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
          Self-Service Pass Lookup
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          My Event Registrations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Enter your College Register / Roll number to view, verify, reprint, or manage your official ELYX 26 entry passes.
        </p>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-500/30 text-orange-900 dark:text-orange-200 text-xs flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-orange-700 dark:text-orange-400 font-bold hover:underline">
            ×
          </button>
        </div>
      )}

      {/* Search Input Box */}
      <div className="glass-panel p-6 sm:p-8 space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchRegNo}
              onChange={(e) => setSearchRegNo(e.target.value)}
              placeholder="Enter your Register Number (e.g. 951221104021)..."
              className="form-input pl-10 uppercase text-xs sm:text-sm py-3"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="btn-primary !text-xs !py-3 !px-6 shrink-0 flex items-center justify-center gap-2"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>Find My Passes</span>
          </button>
        </form>

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Tip: You can find your Register Number printed on your official GCE Tirunelveli ID card or hall ticket.
        </p>
      </div>

      {/* Results Section */}
      {queriedRegNo && (
        <AnimatedSection animation="fade-in" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Registrations for <span className="font-mono text-orange-600 dark:text-orange-400">{queriedRegNo}</span>
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {matchedRegistrations.length} {matchedRegistrations.length === 1 ? 'Pass' : 'Passes'} found
            </span>
          </div>

          {matchedRegistrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedRegistrations.map((reg) => {
                const event = events.find((e) => e.id === reg.event_id);
                const isCancelled = reg.status === 'cancelled';

                return (
                  <div
                    key={reg.id}
                    className={`glass-card p-5 space-y-3 flex flex-col justify-between hover:border-orange-500/40 transition-all group ${
                      isCancelled ? 'opacity-60 bg-slate-50 dark:bg-white/5' : ''
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`badge-subtle text-[10px] ${
                            isCancelled
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50'
                          }`}
                        >
                          {isCancelled ? 'Cancelled' : 'Confirmed'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors font-display">
                        {reg.event_title || event?.title || 'Cultural Event'}
                      </h3>

                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                        <p className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          <span>{reg.full_name} ({reg.department})</span>
                        </p>
                        {event && (
                          <p className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-orange-500" />
                            <span>{formatDateTimeRange(event.event_date, event.start_time, event.end_time)}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate">
                        ID: {reg.id.substring(0, 14)}...
                      </span>

                      <div className="flex items-center gap-2">
                        {!isCancelled && (
                          <button
                            onClick={() => handleCancel(reg.id)}
                            disabled={cancellingId === reg.id}
                            className="text-[11px] text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 px-2 py-1 rounded transition-colors inline-flex items-center gap-1"
                            title="Cancel registration"
                          >
                            <Ban className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                        )}

                        {event && !isCancelled && (
                          <button
                            onClick={() => setSelectedPass({ registration: reg, event })}
                            className="btn-secondary !text-xs !py-1.5 !px-3 inline-flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>View Pass</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel p-10 text-center space-y-3">
              <Ticket className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No active registrations found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                We couldn't find any registered passes under <strong className="font-mono text-slate-900 dark:text-white">{queriedRegNo}</strong>. Ensure you entered your register number correctly or register for an event below.
              </p>
              <Link to="/events" className="btn-primary !text-xs !py-2.5 inline-flex items-center gap-2 mt-2">
                <span>Browse & Register for Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </AnimatedSection>
      )}

      {/* Pass Detail Modal */}
      {selectedPass && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedPass(null)}
        >
          <div
            className="glass-panel w-full max-w-lg p-6 animate-scale-in my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <RegistrationSuccessCard
              registration={selectedPass.registration}
              event={selectedPass.event}
              onClose={() => setSelectedPass(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

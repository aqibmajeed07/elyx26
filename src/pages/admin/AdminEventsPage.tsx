import React, { useState } from 'react';
import {
  Search,
  Edit,
  CheckCircle2,
  Save,
  X,
  Users,
  User,
} from 'lucide-react';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { useEvents } from '../../hooks/useEvents';
import type { CulturalEvent, EventStatus } from '../../types';
import { CATEGORIES } from '../../data/departments';
import { formatDateTimeRange } from '../../utils/formatters';

export const AdminEventsPage: React.FC = () => {
  const { events, updateEventStatus, updateEvent } = useEvents();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingEvent, setEditingEvent] = useState<CulturalEvent | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
    const matchesCat = categoryFilter === 'All' || e.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleStatusChange = async (eventId: string, newStatus: EventStatus) => {
    const res = await updateEventStatus(eventId, newStatus);
    if (res.success) {
      setSaveSuccessMsg('Event status updated successfully.');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    const res = await updateEvent(editingEvent);
    if (res.success) {
      setEditingEvent(null);
      setSaveSuccessMsg('Event details saved successfully.');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <AdminNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Event Administration
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Manage Cultural Events
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Toggle registration status, update schedules, venues, and edit rules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge-subtle bg-slate-800 text-slate-300 border-slate-700 text-xs">
              {events.length} Total Events
            </span>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event by name or venue..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Events Table */}
        <div className="rounded-2xl bg-slate-800/70 border border-slate-700/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Event Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Status Control</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300">
                {filteredEvents.map((event) => {
                  return (
                    <tr key={event.id} className="hover:bg-slate-750 transition-colors">
                      <td className="p-4 font-semibold text-white">
                        <div className="flex flex-col">
                          <span className="text-sm">{event.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{event.id}</span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-300 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-slate-700 text-[10px] text-slate-300">
                          {event.category}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {event.participation_type === 'team' ? (
                          <span className="inline-flex items-center gap-1 text-indigo-400 text-[11px]">
                            <Users className="w-3 h-3" />
                            <span>Team ({event.team_size_max})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                            <User className="w-3 h-3" />
                            <span>Solo</span>
                          </span>
                        )}
                      </td>

                      <td className="p-4 whitespace-nowrap text-slate-300">
                        {formatDateTimeRange(event.event_date, event.start_time, event.end_time)}
                      </td>

                      <td className="p-4 text-slate-400 max-w-xs truncate">{event.venue}</td>

                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={event.status}
                          onChange={(e) => handleStatusChange(event.id, e.target.value as EventStatus)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold focus:outline-none focus:border-orange-500"
                        >
                          <option value="registration_open">Registration Open</option>
                          <option value="registration_closed">Registration Closed</option>
                          <option value="upcoming">Upcoming</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setEditingEvent(event)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setEditingEvent(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-scaleUp my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Edit Event Details</h3>
                <p className="text-xs text-slate-400 font-mono">{editingEvent.title}</p>
              </div>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Venue</label>
                  <input
                    type="text"
                    value={editingEvent.venue}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={editingEvent.event_date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, event_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Registration Deadline</label>
                  <input
                    type="datetime-local"
                    value={editingEvent.registration_deadline ? editingEvent.registration_deadline.slice(0, 16) : ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, registration_deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={editingEvent.start_time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, start_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">End Time</label>
                  <input
                    type="time"
                    value={editingEvent.end_time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, end_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Event Description</label>
                <textarea
                  rows={3}
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white leading-relaxed"
                  required
                />
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

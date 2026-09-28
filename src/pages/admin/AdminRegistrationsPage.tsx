import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Eye,
  X
} from 'lucide-react';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { useRegistrations } from '../../hooks/useRegistrations';
import { useEvents } from '../../hooks/useEvents';
import type { Registration, RegistrationStatus, TeamMember } from '../../types';
import { DEPARTMENTS, YEARS } from '../../data/departments';
import { exportRegistrationsToCSV } from '../../utils/csvExport';

export const AdminRegistrationsPage: React.FC = () => {
  const { registrations, updateRegistrationStatus } = useRegistrations();
  const { events } = useEvents();

  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const q = search.trim().toLowerCase();
      if (q) {
        const matchesName = reg.full_name.toLowerCase().includes(q);
        const matchesRegNo = reg.register_number.toLowerCase().includes(q);
        const matchesEmail = reg.email.toLowerCase().includes(q);
        const matchesPhone = reg.phone.includes(q);
        const matchesTeam = reg.team_name?.toLowerCase().includes(q);
        if (!matchesName && !matchesRegNo && !matchesEmail && !matchesPhone && !matchesTeam) {
          return false;
        }
      }

      if (eventFilter !== 'all' && reg.event_id !== eventFilter) return false;
      if (deptFilter !== 'all' && reg.department !== deptFilter) return false;
      if (yearFilter !== 'all' && reg.year !== yearFilter) return false;
      if (statusFilter !== 'all' && reg.status !== statusFilter) return false;

      return true;
    });
  }, [registrations, search, eventFilter, deptFilter, yearFilter, statusFilter]);

  const handleExportCSV = () => {
    exportRegistrationsToCSV(
      filteredRegistrations,
      `elyx26_registrations_filtered_${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  const handleStatusChange = async (regId: string, newStatus: RegistrationStatus) => {
    await updateRegistrationStatus(regId, newStatus);
    if (selectedReg && selectedReg.id === regId) {
      setSelectedReg({ ...selectedReg, status: newStatus });
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
              Participant Registry
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Manage Registrations
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Search, verify, update participation status, and export official rosters for event coordinators.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shadow-sm self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Filtered CSV ({filteredRegistrations.length})</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, register number, team name, email, or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Dropdown Filters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* Event Filter */}
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none truncate"
            >
              <option value="all">All Events ({events.length})</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>

            {/* Department Filter */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none truncate"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
            >
              <option value="all">All Years</option>
              {YEARS.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Count Strip */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <p>
            Showing <strong className="text-white">{filteredRegistrations.length}</strong> of{' '}
            {registrations.length} registrations
          </p>

          {(search || eventFilter !== 'all' || deptFilter !== 'all' || yearFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setEventFilter('all');
                setDeptFilter('all');
                setYearFilter('all');
                setStatusFilter('all');
              }}
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-slate-800/70 border border-slate-700/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Reg No</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Department & Year</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Type / Team</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300">
                {filteredRegistrations.map((reg: Registration) => {
                  const isTeam = reg.participation_type === 'team';
                  return (
                    <tr key={reg.id} className="hover:bg-slate-750 transition-colors">
                      <td className="p-4 font-semibold text-white whitespace-nowrap">
                        {reg.full_name}
                      </td>

                      <td className="p-4 font-mono text-orange-400 whitespace-nowrap">
                        {reg.register_number}
                      </td>

                      <td className="p-4 text-slate-200 whitespace-nowrap">
                        {reg.event_title || reg.event_id}
                      </td>

                      <td className="p-4 whitespace-nowrap text-slate-400">
                        {reg.department} • {reg.year}
                      </td>

                      <td className="p-4 whitespace-nowrap text-slate-400">
                        <div>{reg.phone}</div>
                        <div className="text-[10px] text-slate-500">{reg.email}</div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {isTeam ? (
                          <div className="text-indigo-400 font-medium">
                            <span>{reg.team_name || 'Team'}</span>
                            <span className="text-[10px] text-slate-500 block">
                              {reg.team_members ? `${reg.team_members.length + 1} members` : 'Team'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-emerald-400">Solo</span>
                        )}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={reg.status}
                          onChange={(e) => handleStatusChange(reg.id, e.target.value as RegistrationStatus)}
                          className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold focus:outline-none"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="waitlisted">Waitlisted</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="p-12 text-center text-xs text-slate-400">
              No registrations found matching the specified criteria.
            </div>
          )}
        </div>
      </main>

      {/* Registration Details Modal */}
      {selectedReg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedReg(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-scaleUp my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase">
                  Registration Details
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  {selectedReg.event_title || selectedReg.event_id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                <div>
                  <span className="text-slate-500 block text-[10px]">Student Name</span>
                  <span className="font-semibold text-white">{selectedReg.full_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Register Number</span>
                  <span className="font-mono text-orange-400 font-semibold">{selectedReg.register_number}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Department & Year</span>
                  <span className="text-slate-300">{selectedReg.department} ({selectedReg.year})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Phone Number</span>
                  <span className="font-mono text-slate-300">{selectedReg.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[10px]">Email Address</span>
                  <span className="text-slate-300">{selectedReg.email}</span>
                </div>
              </div>

              {selectedReg.team_name && (
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 space-y-2">
                  <span className="text-slate-500 block text-[10px]">Team Details</span>
                  <p className="font-bold text-white text-sm">{selectedReg.team_name}</p>
                  {selectedReg.team_members && selectedReg.team_members.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] text-slate-400 font-semibold">Other Members:</p>
                      {selectedReg.team_members.map((m: TeamMember, i: number) => (
                        <div key={i} className="p-2 rounded bg-slate-800 text-[11px] flex justify-between">
                          <span>{m.name} ({m.department}, {m.year})</span>
                          <span className="font-mono text-orange-400">{m.register_number}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedReg.additional_notes && (
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                  <span className="text-slate-500 block text-[10px]">Additional Notes / Requirements</span>
                  <p className="text-slate-300">{selectedReg.additional_notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400 text-[11px]">
                  Registered on: {new Date(selectedReg.created_at).toLocaleString()}
                </span>
                <span className="text-[11px] font-mono text-slate-500">ID: {selectedReg.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

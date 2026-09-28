import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Ticket,
  CheckCircle2,
  Clock,
  Download,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { useEvents } from '../../hooks/useEvents';
import { useRegistrations } from '../../hooks/useRegistrations';
import { exportRegistrationsToCSV } from '../../utils/csvExport';
import { DEPARTMENTS } from '../../data/departments';
import { getRegStatusBadgeInfo } from '../../utils/formatters';

export const AdminDashboardPage: React.FC = () => {
  const { events } = useEvents();
  const { registrations } = useRegistrations();

  const totalEvents = events.length;
  const openEvents = events.filter((e) => e.status === 'registration_open').length;
  const completedEvents = events.filter((e) => e.status === 'completed').length;
  const totalRegistrations = registrations.length;

  // Department distribution
  const deptCounts = DEPARTMENTS.map((dept) => {
    const code = dept.match(/\(([^)]+)\)/)?.[1] || dept;
    const count = registrations.filter((r) => r.department === dept || r.department.includes(code)).length;
    return { name: code, count, full: dept };
  });

  const recentRegistrations = registrations.slice(0, 8);

  const handleExportCSV = () => {
    exportRegistrationsToCSV(registrations, `elyx26_all_registrations_${new Date().toISOString().slice(0,10)}.csv`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <AdminNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge-subtle bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">
                Live Control Center
              </span>
              <span className="text-xs text-slate-400">Government College of Engineering, Tirunelveli</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              ELYX 26 Organizing Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export All Registrations (CSV)</span>
            </button>
          </div>
        </div>

        {/* 1. Quick Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">Total Events</span>
              <Calendar className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-display">{totalEvents}</p>
            <p className="text-[11px] text-slate-400">Scheduled across campus</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">Total Registrations</span>
              <Ticket className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-400 font-display">{totalRegistrations}</p>
            <p className="text-[11px] text-slate-400">Verified student entries</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">Open for Entry</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-amber-400 font-display">{openEvents}</p>
            <p className="text-[11px] text-slate-400">Accepting registrations</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">Completed</span>
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-3xl font-extrabold text-sky-400 font-display">{completedEvents}</p>
            <p className="text-[11px] text-slate-400">Events concluded</p>
          </div>
        </div>

        {/* 2. Department Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Registration Distribution by Department
              </h2>
            </div>
            <span className="text-xs text-slate-400">Total: {totalRegistrations} entries</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {deptCounts.map((dept) => (
              <div
                key={dept.name}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{dept.name}</span>
                  <span className="text-orange-400 font-bold">{dept.count}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: totalRegistrations > 0 ? `${(dept.count / totalRegistrations) * 100}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Recent Registrations Table */}
        <div className="p-6 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Recent Student Registrations
              </h2>
              <p className="text-xs text-slate-400">Latest submissions across all cultural categories</p>
            </div>

            <Link
              to="/admin/registrations"
              className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold"
            >
              <span>View All Registrations</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentRegistrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 border-b border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Register No</th>
                    <th className="p-3">Event</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Year</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {recentRegistrations.map((reg) => {
                    const statusBadge = getRegStatusBadgeInfo(reg.status);
                    return (
                      <tr key={reg.id} className="hover:bg-slate-750">
                        <td className="p-3 font-semibold text-white whitespace-nowrap">
                          {reg.full_name}
                        </td>
                        <td className="p-3 font-mono text-slate-300 whitespace-nowrap">
                          {reg.register_number}
                        </td>
                        <td className="p-3 text-orange-400 whitespace-nowrap">
                          {reg.event_title || reg.event_id}
                        </td>
                        <td className="p-3 text-slate-400 whitespace-nowrap">{reg.department}</td>
                        <td className="p-3 text-slate-400 whitespace-nowrap">{reg.year}</td>
                        <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{reg.phone}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`badge-subtle ${statusBadge.bg} text-[10px]`}>
                            {statusBadge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No registrations recorded yet. Students can register through the public website.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

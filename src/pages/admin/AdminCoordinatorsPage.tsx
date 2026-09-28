import React, { useState, useEffect } from 'react';
import { Phone, Search, Loader2 } from 'lucide-react';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { OVERALL_COORDINATORS, COMMITTEES } from '../../data/seedData';
import { coordinatorService, type DbCoordinator } from '../../services/coordinatorService';

export const AdminCoordinatorsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [coordinators, setCoordinators] = useState<DbCoordinator[]>(() => [
    ...OVERALL_COORDINATORS.map((c) => ({
      id: c.name,
      name: c.name,
      department: c.department,
      phone: c.phone,
      role: c.role || 'Overall Coordinator',
      committee_name: 'Overall Coordinators',
    })),
    ...COMMITTEES.flatMap((comm) =>
      comm.members.map((m) => ({
        id: m.name,
        name: m.name,
        department: m.department,
        phone: m.phone,
        role: 'Committee Member',
        committee_name: comm.name,
      }))
    ),
  ]);

  useEffect(() => {
    coordinatorService.fetchCoordinators().then((res) => {
      if (res.all.length > 0) {
        setCoordinators(res.all);
      }
      setLoading(false);
    });
  }, []);

  const filtered = coordinators.filter((c) => {
    const q = search.trim().toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.committee_name && c.committee_name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <AdminNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Student Leadership Directory
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Coordinators & Committees Roster
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Official contact list for student coordinators across all departments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge-subtle bg-slate-800 text-slate-300 border-slate-700 text-xs">
              {coordinators.length} Total Appointed
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coordinator by name, department, phone, or committee..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-6 gap-2 text-xs text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
            <span>Loading database coordinator roster...</span>
          </div>
        )}

        {/* Coordinators Table */}
        <div className="rounded-2xl bg-slate-800/70 border border-slate-700/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Coordinator Name</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Assigned Committee / Role</th>
                  <th className="p-4">Phone Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300">
                {filtered.map((coord, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/90 transition-colors">
                    <td className="p-4 font-semibold text-white whitespace-nowrap">
                      {coord.name}
                    </td>
                    <td className="p-4 text-slate-400 whitespace-nowrap">
                      {coord.department}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-orange-400 border border-slate-700 font-medium">
                        {coord.committee_name || coord.role}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <a
                        href={`tel:${coord.phone}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-orange-400 hover:text-orange-300 font-semibold"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{coord.phone}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

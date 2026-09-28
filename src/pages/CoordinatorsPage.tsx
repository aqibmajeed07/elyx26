import React, { useState } from 'react';
import { Phone, Search, Building2, Download, Sparkles, Award } from 'lucide-react';
import {
  OVERALL_COORDINATORS_REVISED,
  SECTION_COORDINATORS_REVISED,
  COMMITTEES_REVISED,
  OFFICIAL_RULEBOOK_PDF_URL
} from '../data/revisedRulebook';
import { AnimatedSection } from '../components/common/AnimatedSection';

export const CoordinatorsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'overall' | 'sections' | 'committees'>('overall');

  const filteredOverall = OVERALL_COORDINATORS_REVISED.filter((c) => {
    const q = search.trim().toLowerCase();
    return c.name.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || (c.phone && c.phone.includes(q));
  });

  const filteredCommittees = COMMITTEES_REVISED.map((comm) => ({
    ...comm,
    members: comm.members.filter((m) => {
      const q = search.trim().toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        comm.name.toLowerCase().includes(q)
      );
    }),
  })).filter((comm) => comm.members.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Download Option */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 dark:border-white/10 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Student Leadership & Organizing Committees</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Coordinators & Committees
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Official directory of overall festival coordinators, section leads, and organizing committees managing ELYX 26 at Government College of Engineering, Tirunelveli.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={OFFICIAL_RULEBOOK_PDF_URL}
            download="ELYX26_RULEBOOK_Final.pdf"
            className="btn-primary !text-xs !py-2.5 !px-4 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Rulebook (PDF)</span>
          </a>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="glass-panel p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Tab switch */}
        <div className="flex flex-wrap items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs border border-slate-200/60 dark:border-white/10">
          <button
            onClick={() => setSelectedTab('overall')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all ${
              selectedTab === 'overall'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overall Coordinators ({OVERALL_COORDINATORS_REVISED.length})
          </button>
          <button
            onClick={() => setSelectedTab('sections')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all ${
              selectedTab === 'sections'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Section Coordinators (3 Sections)
          </button>
          <button
            onClick={() => setSelectedTab('committees')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all ${
              selectedTab === 'committees'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Organizing Committees ({COMMITTEES_REVISED.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by coordinator name or department..."
            className="form-input pl-10 text-xs py-2"
          />
        </div>
      </div>

      {/* TAB 1: Overall Coordinators */}
      {selectedTab === 'overall' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredOverall.length}</strong> core student leaders
            </span>
            <span className="text-[11px] text-orange-600 dark:text-orange-400 font-mono">Fine Arts Association</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOverall.map((coordinator, idx) => (
              <AnimatedSection key={idx} animation="fade-up" delay={idx * 50}>
                <div className="glass-card p-5 space-y-4 border border-slate-200/80 dark:border-white/10 hover:border-orange-500/40 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="badge-subtle bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800 text-[10px] font-mono">
                        {coordinator.role || 'Overall Coordinator'}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mt-2">
                        {coordinator.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Department of {coordinator.department}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {coordinator.name.charAt(0)}
                    </div>
                  </div>

                  {coordinator.phone && (
                    <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Contact Number:</span>
                      <a
                        href={`tel:${coordinator.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-100 font-mono text-xs font-semibold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{coordinator.phone}</span>
                      </a>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Section Coordinators */}
      {selectedTab === 'sections' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span>Specialized category leads coordinating event operations across General, Digital, and On-Stage branches.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(SECTION_COORDINATORS_REVISED).map(([sectionTitle, members], sIdx) => (
              <div
                key={sIdx}
                className="glass-card p-6 space-y-4 border border-slate-200/80 dark:border-white/10"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
                  <Award className="w-5 h-5 text-orange-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    {sectionTitle}
                  </h3>
                </div>

                <div className="space-y-2">
                  {members.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/5 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-900 dark:text-white">{m.name}</span>
                      <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-[10px] border border-slate-200 dark:border-white/10">
                        {m.department}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Organizing Committees */}
      {selectedTab === 'committees' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredCommittees.length}</strong> active committees
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommittees.map((committee, idx) => (
              <AnimatedSection key={idx} animation="fade-up" delay={idx * 40}>
                <div className="glass-card p-5 space-y-4 border border-slate-200/80 dark:border-white/10 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm font-display leading-snug">
                        {committee.name}
                      </h3>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                        Committee Members ({committee.members.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {committee.members.map((member, mIdx) => (
                          <span
                            key={mIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                          >
                            <span className="font-medium">{member.name}</span>
                            <span className="text-[10px] text-orange-600 dark:text-orange-400 font-mono">
                              ({member.department})
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Fine Arts Association</span>
                    <span>Official Committee</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  Mail,
  Award,
  Shirt,
  IdCard,
  Download,
  ExternalLink,
  Search,
  Phone,
  UserCheck,
  Sparkles,
  FileText
} from 'lucide-react';
import { AnimatedSection } from '../components/common/AnimatedSection';
import {
  REVISED_EVENTS_RULEBOOK,
  OFFICIAL_RULEBOOK_PDF_URL,
  DIGITAL_COMMON_INSTRUCTIONS,
  type RulebookEvent
} from '../data/revisedRulebook';

export const RulesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General Events', 'Digital Events', 'On Stage Events'];

  const filteredEvents = useMemo(() => {
    return REVISED_EVENTS_RULEBOOK.filter((ev: RulebookEvent) => {
      if (selectedCategory !== 'All' && ev.category !== selectedCategory) {
        return false;
      }
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(q);
        const matchesRules = ev.rules.some((r) => r.toLowerCase().includes(q));
        const matchesCoords = ev.coordinators.some((c) =>
          c.name.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || (c.phone && c.phone.includes(q))
        );
        const matchesFaculty = ev.faculty.some((f) =>
          f.name.toLowerCase().includes(q) || f.designation.toLowerCase().includes(q)
        );
        return matchesTitle || matchesRules || matchesCoords || matchesFaculty;
      }
      return true;
    });
  }, [search, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title & Rulebook Download Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 dark:border-white/10 pb-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Official Revised Festival Guidelines</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            ELYX 26 Official Rulebook
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Authorized competition regulations, etiquette code, on-duty policies, and coordinator contacts issued by the Fine Arts Association, Government College of Engineering, Tirunelveli.
          </p>
        </div>

        {/* Download Action Box */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={OFFICIAL_RULEBOOK_PDF_URL}
            download="ELYX26_RULEBOOK_Final.pdf"
            className="btn-primary !text-xs !py-3 !px-5 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Rulebook (PDF)</span>
          </a>

          <a
            href={OFFICIAL_RULEBOOK_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !text-xs !py-3 !px-4 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span>Open PDF Viewer</span>
          </a>
        </div>
      </div>

      {/* Disqualification & Code of Conduct Notice */}
      <AnimatedSection animation="fade-up">
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 flex items-start gap-3.5 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <strong className="block font-bold">Important Notice on Event Etiquette:</strong>
            <p className="leading-relaxed text-amber-900/90 dark:text-amber-300/90">
              This rulebook contains all rules and instructions to be followed by each participant for their corresponding events. Please go through each instruction clearly. If you have any doubts, feel free to contact respective event coordinators.
            </p>
            <p className="font-semibold text-rose-700 dark:text-rose-400 pt-0.5">
              (Note: Violation of any rules mentioned in this book will lead to immediate disqualification of the participant).
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* General Campus Etiquette & Policies */}
      <AnimatedSection animation="fade-up" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <span>General Campus Guidelines</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>Event Days & Classroom Policy</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              On the day of events, juniors (1st, 2nd & 3rd years) except registered participants should strictly stay in their classrooms and attend scheduled academic hours.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Official On-Duty (OD) Provision</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              On-Duty (OD) will be granted strictly for registered <strong>Participants</strong>, 4th-year <strong>Event Coordinators</strong>, and official <strong>Student Volunteers</strong>.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <Shirt className="w-4 h-4" />
              <span>Dress Code & Decorum</span>
            </div>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <p>• <strong>Girls:</strong> Chudidhar with Shawl is compulsory.</p>
              <p>• <strong>Boys:</strong> Formal College Wear.</p>
              <p>• All students must strictly follow the proper dress code on all event days.</p>
            </div>
          </div>

          <div className="glass-card p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
              <IdCard className="w-4 h-4" />
              <span>ID Verification & Junior Support</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              College ID card is <strong>mandatory</strong> for all students attending or participating. Juniors can reach out directly to their respective senior event coordinators for questions and guidance.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Common Digital Events Instructions */}
      <AnimatedSection animation="fade-up">
        <div className="glass-panel p-6 sm:p-7 space-y-3 bg-gradient-to-br from-white/90 via-sky-50/40 to-indigo-50/30 dark:from-slate-900/90 dark:via-sky-950/20 dark:to-indigo-950/20 border-sky-200/90 dark:border-sky-800/40">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Digital Events: Common Submission Instructions
            </h2>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Applicable for Photography, Short Film Making, Video Editing, Certificate Designing, Flex Designing, and Meme Creation:
          </p>

          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
            {DIGITAL_COMMON_INSTRUCTIONS.map((instruction, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>
                  {instruction.includes('elexgce2026@gmail.com') ? (
                    <>
                      Participants must submit their work via email to:{' '}
                      <a
                        href="mailto:elexgce2026@gmail.com"
                        className="font-mono font-bold text-orange-600 dark:text-orange-400 underline underline-offset-2"
                      >
                        elexgce2026@gmail.com
                      </a>
                    </>
                  ) : (
                    instruction
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Event-by-Event Interactive Rules Directory */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <span>Competition Rules & Coordinators Directory</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Browse detailed rules, assigned faculty in-charge, and contact numbers for all 27 festival events.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event, rule, faculty or coordinator..."
              className="form-input pl-10 text-xs py-2.5"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200/80 dark:border-white/10 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-orange-500/40'
              }`}
            >
              {cat}
              {cat === 'All' && ` (${REVISED_EVENTS_RULEBOOK.length})`}
              {cat === 'General Events' && ' (13)'}
              {cat === 'Digital Events' && ' (6)'}
              {cat === 'On Stage Events' && ' (8)'}
            </button>
          ))}
        </div>

        {/* Count summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredEvents.length}</strong> events
          </span>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-orange-600 dark:text-orange-400 font-semibold hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.number}
              className="glass-card p-6 flex flex-col justify-between space-y-5 border border-slate-200/80 dark:border-white/10 hover:border-orange-500/40 transition-all duration-300"
            >
              {/* Event Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-bold font-mono flex items-center justify-center">
                        #{ev.number}
                      </span>
                      <span className="badge-subtle bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 text-[10px]">
                        {ev.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                      {ev.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30 font-mono text-[11px] font-bold shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>{ev.date}</span>
                  </span>
                </div>

                {/* Rules List */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Rules & Instructions
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {ev.rules.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold leading-none mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Faculty & Student Coordinators Box */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3 text-xs">
                {/* Faculty In-Charge */}
                {ev.faculty && ev.faculty.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Faculty In-Charge
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {ev.faculty.map((f, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/10"
                        >
                          <UserCheck className="w-3 h-3 text-emerald-500" />
                          <span>
                            {f.name} {f.designation ? `(${f.designation})` : ''}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Student Coordinators with Contact */}
                {ev.coordinators && ev.coordinators.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Student Event Coordinators
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                      {ev.coordinators.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/10 text-xs"
                        >
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white leading-tight">{c.name}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{c.department}</p>
                          </div>
                          {c.phone ? (
                            <a
                              href={`tel:${c.phone}`}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-mono text-[11px] font-bold hover:bg-orange-200 transition-colors"
                              title={`Call ${c.name}`}
                            >
                              <Phone className="w-3 h-3" />
                              <span>{c.phone}</span>
                            </a>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Download Banner */}
      <AnimatedSection animation="fade-up">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold font-display">Need an Offline Copy of the Rulebook?</h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
              Download the complete 20-page ELYX 26 rulebook containing comprehensive etiquette, full committee rosters, and coordinator contact details for offline reference.
            </p>
          </div>

          <a
            href={OFFICIAL_RULEBOOK_PDF_URL}
            download="ELYX26_RULEBOOK_Final.pdf"
            className="px-6 py-3.5 rounded-2xl bg-white text-orange-700 hover:bg-orange-50 font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4 text-orange-600" />
            <span>Download Official PDF</span>
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
};

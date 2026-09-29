import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Trophy,
  Award,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Zap,
  Download,
} from 'lucide-react';
import type { CulturalEvent } from '../types';
import { EventCard } from '../components/events/EventCard';
import { CATEGORIES } from '../data/departments';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { CreatorCard } from '../components/common/CreatorCard';

interface HomePageProps {
  events: CulturalEvent[];
  onRegisterClick: (event: CulturalEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ events, onRegisterClick }) => {
  const featuredEvents = events.filter((e) => e.featured).slice(0, 6);

  return (
    <div className="space-y-10 sm:space-y-16 lg:space-y-20 pb-12 sm:pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-b-2xl sm:rounded-b-[2.5rem] shadow-2xl border-b border-white/10">
        {/* Subtle Organic Floating Gradient Blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none animate-float-slow -z-0" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-float-medium -z-0" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-float-slower -z-0" />

        {/* Background Image with Dark Vignette Gradient */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source srcSet="/assets/artifex_hero.webp" type="image/webp" />
            <img
              src="/assets/artifex_hero.jpg"
              alt="ELYX 26 Cultural Festival Celebration Atmosphere"
              className="w-full h-full object-cover object-center opacity-30 filter brightness-75 contrast-125 scale-105 transition-transform duration-1000 ease-out"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Hero Content & Staggered Entrance */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              {/* Institution Badge */}
              <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-orange-300 shadow-sm max-w-full">
                  <img
                    src="/assets/gcelogo.webp"
                    alt="GCE Tirunelveli Logo"
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white p-0.5 object-contain shrink-0"
                  />
                  <span className="truncate">Government College of Engineering, Tirunelveli</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-1.5 sm:space-y-2 animate-fade-up opacity-0" style={{ animationDelay: '100ms' }}>
                <p className="text-[11px] sm:text-sm font-bold tracking-widest uppercase text-orange-400 font-mono">
                  Fine Arts Association Presents
                </p>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.05] text-white">
                  ELYX<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400"> 26</span>
                </h1>
                <p className="text-base sm:text-xl lg:text-2xl font-medium text-slate-300">
                  The Annual Inter-Departmental Cultural Extravaganza
                </p>
              </div>

              {/* Tagline */}
              <p
                className="text-xs sm:text-sm lg:text-base text-slate-300/90 leading-relaxed max-w-2xl animate-fade-up opacity-0"
                style={{ animationDelay: '200ms' }}
              >
                Celebrate art, expression, music, and tradition across 30 thrilling on-stage, off-stage, and digital events. Compete for departmental glory. <strong>Official dates will be announced soon</strong>.
              </p>

              {/* Key Meta Badges */}
              <div
                className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300 animate-fade-up opacity-0"
                style={{ animationDelay: '300ms' }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs">
                  <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>Dates: Will be announced soon</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>OD Provided for All Participants</span>
                </span>
              </div>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-4 animate-fade-up opacity-0"
                style={{ animationDelay: '400ms' }}
              >
                <Link
                  to="/events"
                  className="btn-primary !text-xs sm:!text-sm !py-3 sm:!py-3.5 !px-6 sm:!px-8 text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Browse All 30 Events</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="/ELYX26_RULEBOOK_Final.pdf"
                  download="ELYX26_RULEBOOK_Final.pdf"
                  className="btn-secondary !text-xs sm:!text-sm !py-3 sm:!py-3.5 !px-5 sm:!px-6 text-center !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-orange-400" />
                  <span>Download Rulebook (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Floating Decorative Glass Cards */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4 animate-fade-in opacity-0" style={{ animationDelay: '450ms' }}>
              <div className="glass-card p-5 space-y-2 border-white/15 bg-white/10 backdrop-blur-xl text-white hover:border-orange-500/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Festival Scale</span>
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                <h4 className="text-xl font-bold font-display">30 Competitions</h4>
                <p className="text-xs text-slate-300">
                  Stage oratory, solo & group music, choreography, digital cinema & fine arts.
                </p>
              </div>

              <div className="glass-card p-5 space-y-2 border-white/15 bg-white/10 backdrop-blur-xl text-white hover:border-orange-500/40 transition-all duration-300 translate-x-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Academic Policy</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold font-display">Official On-Duty (OD)</h4>
                <p className="text-xs text-slate-300">
                  Automated attendance verification for registered competitors and coordinators.
                </p>
              </div>

              <div className="glass-card p-5 space-y-2 border-white/15 bg-white/10 backdrop-blur-xl text-white hover:border-orange-500/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Grand Finale</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold font-display text-amber-300">Will be announced soon</h4>
                <p className="text-xs text-slate-300">
                  Annual Department Championship Cup & Grand Valedictory Celebration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-display">30</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Events Listed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">12</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Committees</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">7</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Engineering Depts</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">Free</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Student Registration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPORTANT ANNOUNCEMENT STRIP */}
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-600 text-white uppercase tracking-wider">
                  Important Notice
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Digital Events Submission</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium mt-1">
                Photography, Video Making, Meme Creation & Designing entries must be emailed to{' '}
                <strong className="text-orange-600 dark:text-orange-400 font-mono">elexgce2026@gmail.com</strong> before the submission deadline (will be announced soon) with filename format: <span className="font-mono text-xs bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-orange-200 dark:border-white/10">Name-Year-Department</span>.
              </p>
            </div>
          </div>

          <Link
            to="/rules"
            className="btn-secondary !text-xs !py-2 shrink-0 self-end md:self-center"
          >
            Read Rules
          </Link>
        </div>
      </AnimatedSection>

      {/* 3. FEATURED EVENTS SHOWCASE */}
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
              Handpicked Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Featured Cultural Events
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline group"
          >
            <span>View all 30 events</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegisterClick={onRegisterClick}
            />
          ))}
        </div>
      </AnimatedSection>

      {/* 4. EVENT CATEGORIES OVERVIEW */}
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
            Broad Spectrum
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Explore by Category
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            From stage performances and literary oratory to digital arts and martial disciplines.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3.5">
          {CATEGORIES.filter((c) => c !== 'All').map((cat) => {
            const count = events.filter((e) => e.category === cat).length;
            return (
              <Link
                key={cat}
                to={`/events?category=${encodeURIComponent(cat)}`}
                className="glass-card-interactive p-3 sm:p-4 text-center space-y-1.5 sm:space-y-2 flex flex-col items-center justify-center group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                  {cat}
                </h3>
                <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  {count} {count === 1 ? 'Event' : 'Events'}
                </span>
              </Link>
            );
          })}
        </div>
      </AnimatedSection>

      {/* 5. WHY PARTICIPATE & RECOGNITION */}
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-5 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 bg-gradient-to-br from-white/90 via-slate-50/80 to-orange-50/30 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-orange-950/20">
          <div className="max-w-2xl space-y-1.5 sm:space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
              Student Benefits
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Why Participate in ELYX 26?
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every GCE Tirunelveli student is encouraged to participate and represent their department.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Official On-Duty (OD)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Official OD will be provided for all verified participants, event coordinators, and 4th-year volunteers.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Prizes & Trophies</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Exciting awards and trophies distributed during the Grand Finale ceremony (Schedule will be announced soon).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Official Certificates</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Recognized participation and merit certificates issued by GCE Tirunelveli Fine Arts Association.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Department Glory</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Earn overall championship points for your engineering department across all categories.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 6. DIGITAL EXPERIENCE & CREATOR SPOTLIGHT */}
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
              Digital Architecture & Engineering
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Platform Craft & Experience
            </h2>
          </div>
        </div>

        <CreatorCard />
      </AnimatedSection>

      {/* 7. CALL TO ACTION BANNER */}
      <AnimatedSection animation="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-slate-950 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 sm:space-y-3 max-w-xl relative z-10">
            <span className="badge-subtle bg-orange-500/20 text-orange-300 border-orange-500/30 text-[11px] sm:text-xs">
              Registrations Open Now
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display tracking-tight">
              Ready to Showcase Your Talent at ELYX 26?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Registration takes less than a minute. Secure your slot and get your official printable event pass.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto relative z-10 shrink-0">
            <Link
              to="/events"
              className="btn-primary !text-xs sm:!text-sm !py-3 !px-6 text-center justify-center"
            >
              Explore Events Now
            </Link>
            <Link
              to="/coordinators"
              className="btn-secondary !bg-slate-900 !text-white !border-slate-800 hover:!bg-slate-850 !text-xs sm:!text-sm !py-3 !px-6 text-center justify-center"
            >
              Contact Coordinators
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

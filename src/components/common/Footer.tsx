import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe, MapPin, ExternalLink, QrCode, Shield } from 'lucide-react';
import { FESTIVAL_INFO } from '../../data/seedData';

const InstagramIcon = () => (
  <svg
    className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-3.5 h-3.5 fill-current text-[#0A66C2] group-hover:text-white transition-colors"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <footer className="mt-auto bg-slate-950 text-slate-400 border-t border-slate-900/90 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: College Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/gcelogo.webp"
                alt="ELYX 26 Official Festival Logo"
                className="w-12 h-12 rounded-full bg-black p-0.5 border border-orange-500/50 object-contain shadow-md"
              />
              <div>
                <h4 className="text-white font-bold text-base leading-tight font-display tracking-tight">
                  ELYX 26
                </h4>
                <p className="text-xs text-orange-400 font-medium">Fine Arts Association • GCE Tirunelveli</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Government College of Engineering, Tirunelveli - 627007, Tamil Nadu.
              Autonomous Institution affiliated with Anna University.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Tirunelveli, Tamil Nadu 627007</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-sm tracking-wide">Quick Navigation</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/events" className="hover:text-orange-400 transition-colors inline-block py-0.5">
                  All Cultural Events (30 Competitions)
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-orange-400 transition-colors inline-block py-0.5">
                  Schedule, Venues & General Rules
                </Link>
              </li>
              <li>
                <Link to="/coordinators" className="hover:text-orange-400 transition-colors inline-block py-0.5">
                  Overall Coordinators & Committees
                </Link>
              </li>
              <li>
                <Link to="/my-registrations" className="hover:text-orange-400 transition-colors inline-block py-0.5">
                  Check My Registration Status
                </Link>
              </li>
              <li>
                <a
                  href="https://gcetly.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors inline-flex items-center gap-1.5 py-0.5"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Official College Website (gcetly.ac.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Submissions */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-sm tracking-wide">Digital Submissions & Support</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              For Photography, Video Making, Meme Creation, and Designing competitions, email your entries:
            </p>
            <a
              href={`mailto:${FESTIVAL_INFO.contact_email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-orange-400 hover:border-orange-500/50 hover:bg-slate-850 transition-all"
            >
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>{FESTIVAL_INFO.contact_email}</span>
            </a>
            <p className="text-[11px] text-slate-500">
              Format: <span className="text-slate-300 font-mono">Name-Year-Department</span> (Deadline: Will be announced soon)
            </p>
          </div>

          {/* Col 4: Social & Community */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-sm tracking-wide">Connect with Us</h5>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://instagram.com/elyx_26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600/15 to-purple-600/15 border border-pink-500/25 text-xs text-pink-300 hover:text-white hover:border-pink-500/50 transition-all group"
              >
                <InstagramIcon />
                <span>Follow {FESTIVAL_INFO.instagram_handle}</span>
              </a>

              <button
                onClick={() => setShowQrModal(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <QrCode className="w-4 h-4 text-orange-400" />
                <span>View Official Instagram QR</span>
              </button>

              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors pt-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Event Organizer & Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Professional Creator Credit */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-medium text-slate-300">
              © 2026 GEC Tirunelveli CULTURES
            </p>
            <p className="text-[11px] text-slate-500">
              Government College of Engineering, Tirunelveli. Fine Arts Association. All rights reserved.
            </p>
          </div>

          {/* Professional Creator Credit */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-slate-400 text-xs">Website crafted by</span>
            <a
              href="https://www.linkedin.com/in/aqibmajeed07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-orange-400 hover:text-white hover:underline transition-colors group"
              title="View Aqib Majeed on LinkedIn"
            >
              <LinkedInIcon />
              <span>Aqib Majeed</span>
              <ExternalLink className="w-3 h-3 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                Official Instagram QR
              </h3>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 text-sm rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex justify-center border border-slate-100 dark:border-white/5">
              <img
                src="/assets/instagram_qr.webp"
                alt="ELYX 26 Instagram QR Code"
                className="w-56 h-56 object-contain rounded-xl"
              />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Scan with your camera or Instagram app to follow{' '}
              <strong className="text-orange-600 dark:text-orange-400">@elyx_26</strong> for live updates and results!
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

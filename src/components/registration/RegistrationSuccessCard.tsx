import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  CheckCircle2,
  Printer,
  Calendar,
  Hash,
  ShieldCheck,
  QrCode as QrIcon,
  Check,
  Sparkles,
  Clock
} from 'lucide-react';
import type { Registration, CulturalEvent } from '../../types';

interface RegistrationSuccessCardProps {
  registration: Registration;
  event: CulturalEvent;
  onClose: () => void;
}

export const RegistrationSuccessCard: React.FC<RegistrationSuccessCardProps> = ({
  registration,
  event,
  onClose,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const passRef = useRef<HTMLDivElement>(null);

  // Generate offline-capable high-res vector/PNG QR Code for pass verification
  useEffect(() => {
    const payload = JSON.stringify({
      passId: registration.id,
      regNo: registration.register_number,
      name: registration.full_name,
      event: event.title,
      dept: registration.department,
      status: registration.status,
      authority: 'GCE Tirunelveli Fine Arts Association',
      festival: 'ELYX 26'
    });

    QRCode.toDataURL(payload, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate pass QR code:', err));
  }, [registration, event]);

  // Clean, isolated print handler: prints strictly 1 page with no buttons or modal clutter
  const handlePrint = () => {
    setIsPrinting(true);
    const passElement = passRef.current || document.getElementById('registration-pass');
    if (!passElement) {
      window.print();
      setIsPrinting(false);
      return;
    }

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    printFrame.setAttribute('aria-hidden', 'true');
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow?.document;
    if (!doc) {
      window.print();
      setIsPrinting(false);
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>ELYX 26 Official Pass - ${registration.full_name} (${registration.register_number})</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 15mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            color: #0f172a;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 20px;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .ticket-container {
            width: 100%;
            max-width: 600px;
            border: 2px solid #ea580c;
            border-radius: 16px;
            background: #ffffff;
            overflow: hidden;
            box-shadow: none;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .ticket-header {
            background: #090d16;
            color: #ffffff;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #ea580c;
          }
          .ticket-body {
            padding: 20px;
            background: #fafafa;
          }
          .ticket-footer {
            padding: 12px 20px;
            background: #ffffff;
            border-top: 1px dashed #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
            color: #64748b;
          }
          .qr-box {
            text-align: center;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 10px;
          }
          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            background: #dcfce7;
            color: #15803d;
            border: 1px solid #86efac;
          }
          .field-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            margin-bottom: 2px;
          }
          .field-val-lg {
            font-size: 15px;
            font-weight: 800;
            color: #0f172a;
          }
          .field-val-md {
            font-size: 13px;
            font-weight: 700;
            color: #1e293b;
          }
          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
        </style>
      </head>
      <body>
        <div class="ticket-container">
          <div class="ticket-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="/assets/gcelogo.webp" style="width: 44px; height: 44px; border-radius: 50%; object-fit: contain; border: 1.5px solid #ea580c; background: #000;" alt="ELYX Logo" />
              <div>
                <p style="font-size: 10px; font-weight: 700; color: #fb923c; letter-spacing: 1px; text-transform: uppercase;">
                  GCE Tirunelveli • Fine Arts Association
                </p>
                <h2 style="font-size: 17px; font-weight: 900; letter-spacing: 0.5px; color: #ffffff;">
                  ELYX 26 OFFICIAL ENTRY PASS
                </h2>
              </div>
            </div>
            <div class="badge">CONFIRMED</div>
          </div>

          <div class="ticket-body">
            <div style="display: flex; gap: 16px; align-items: flex-start;">
              <div style="flex: 1;">
                <div class="grid-2">
                  <div>
                    <div class="field-label">Event Registered</div>
                    <div class="field-val-lg">${event.title}</div>
                    <div style="font-size: 11px; color: #ea580c; font-weight: 600;">${event.category}</div>
                  </div>

                  <div>
                    <div class="field-label">Participant Name</div>
                    <div class="field-val-lg">${registration.full_name}</div>
                    <div style="font-size: 11px; font-family: monospace; color: #475569; font-weight: 700;">
                      Reg No: ${registration.register_number}
                    </div>
                  </div>

                  <div>
                    <div class="field-label">Department & Year</div>
                    <div class="field-val-md">${registration.department}</div>
                    <div style="font-size: 11px; color: #64748b;">${registration.year}</div>
                  </div>

                  <div>
                    <div class="field-label">Schedule</div>
                    <div class="field-val-md" style="color: #ea580c; display: flex; align-items: center; gap: 4px;">
                      Will be announced soon
                    </div>
                    <div style="font-size: 11px; color: #64748b;">Official notification to follow</div>
                  </div>
                </div>

                ${
                  registration.team_name
                    ? `
                  <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                    <div class="field-label">Team: ${registration.team_name}</div>
                    <div style="font-size: 11px; color: #334155; margin-top: 2px;">
                      ${(registration.team_members || []).map((m: any) => `${m.name} (${m.register_number})`).join(' • ')}
                    </div>
                  </div>
                `
                    : ''
                }
              </div>

              ${
                qrCodeUrl
                  ? `
                <div class="qr-box" style="width: 130px; flex-shrink: 0;">
                  <img src="${qrCodeUrl}" style="width: 105px; height: 105px; display: block; margin: 0 auto;" alt="Verification QR Code" />
                  <p style="font-size: 9px; font-weight: 700; color: #0f172a; margin-top: 4px; text-transform: uppercase;">
                    Scan to Verify
                  </p>
                  <p style="font-size: 8px; color: #64748b;">Official Digital Pass</p>
                </div>
              `
                  : ''
              }
            </div>
          </div>

          <div class="ticket-footer">
            <div>
              <strong>PASS ID:</strong> <span style="font-family: monospace;">${registration.id}</span>
            </div>
            <div style="color: #15803d; font-weight: 700;">
              ✓ OD Eligible for verified attendees
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(printFrame);
        setIsPrinting(false);
      }, 1000);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Success Title Header */}
      <div className="text-center space-y-2 print:hidden">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-1 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
          Registration Confirmed!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your entry for ELYX 26 has been successfully recorded in the official event register.
        </p>
      </div>

      {/* Official Enhanced Pass Ticket */}
      <div
        id="registration-pass"
        ref={passRef}
        className="bg-white dark:bg-slate-900 border-2 border-orange-500/70 dark:border-orange-500/60 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-300"
      >
        {/* Top Header Strip with ELYX Emblem */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-orange-500/80">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/assets/gcelogo.webp"
                alt="ELYX 26 Festival Badge"
                className="w-12 h-12 rounded-full object-contain p-0.5 bg-black border-2 border-orange-500/80 shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-orange-400 font-mono">
                GCE Tirunelveli • Fine Arts Association
              </p>
              <h4 className="text-base sm:text-lg font-extrabold text-white font-display tracking-tight flex items-center gap-2">
                <span>ELYX 26 OFFICIAL PASS</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
              </h4>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>CONFIRMED</span>
          </span>
        </div>

        {/* Ticket Body: Details & QR Code */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-orange-50/30 dark:from-slate-900 dark:to-slate-950">
          <div className="flex flex-col sm:flex-row gap-5 items-start justify-between">
            {/* Left Column: Details */}
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Event */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                    Event Registered
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    {event.title}
                  </span>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30">
                    {event.category}
                  </span>
                </div>

                {/* Participant */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                    Participant Name
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    {registration.full_name}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 font-mono font-bold block mt-0.5">
                    Reg No: {registration.register_number}
                  </span>
                </div>

                {/* Department & Year */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                    Department & Year
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs mt-0.5">
                    {registration.department}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{registration.year}</span>
                </div>

                {/* Schedule (Venue completely removed as per request) */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                    Schedule
                  </span>
                  <span className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5 text-xs mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>Will be announced soon</span>
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Official timetable to be released</span>
                  </span>
                </div>
              </div>

              {/* Team Members */}
              {registration.team_name && (
                <div className="pt-3 border-t border-orange-100 dark:border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                    Team: {registration.team_name} ({registration.team_members?.length ? registration.team_members.length + 1 : 1} members)
                  </span>
                  {registration.team_members && registration.team_members.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {registration.team_members.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-orange-200 dark:border-white/10 text-[10px] text-slate-700 dark:text-slate-300 font-mono"
                        >
                          {m.name} ({m.register_number})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Scannable QR Code */}
            <div className="w-full sm:w-auto flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 self-center sm:self-start">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="Official Verification QR Code"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg p-0.5 bg-white"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <QrIcon className="w-8 h-8 text-slate-400 animate-pulse" />
                </div>
              )}
              <div className="mt-2 text-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 block font-mono">
                  Scan to Verify
                </span>
                <span className="text-[8px] text-slate-400 dark:text-slate-400 block">
                  Official Digital Pass
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Perforated Stub / Ticket Footer */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950/80 border-t border-dashed border-orange-300/80 dark:border-orange-500/30 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <Hash className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>
              ID: <strong className="text-slate-800 dark:text-white font-mono">{registration.id}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OD Eligible for verified attendees</span>
          </div>
        </div>
      </div>

      {/* Important Notes (hidden in print) */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 space-y-1 print:hidden">
        <p className="font-semibold">Important Instructions from Organizers:</p>
        <ul className="list-disc list-inside text-[11px] space-y-0.5 text-amber-900/80 dark:text-amber-400/80">
          <li>College ID card is mandatory for participation.</li>
          <li>Official event dates and schedules will be announced soon.</li>
          <li>For digital events, send your submission files to <span className="font-mono font-bold">elexgce2026@gmail.com</span> before the announced deadline.</li>
        </ul>
      </div>

      {/* Action Buttons (explicitly hidden in print output) */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 print:hidden">
        <button
          onClick={handlePrint}
          disabled={isPrinting}
          className="btn-secondary !text-xs !py-2.5 w-full flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 text-orange-500" />
          <span>{isPrinting ? 'Preparing Pass...' : 'Print / Save Pass as PDF'}</span>
        </button>

        <button
          onClick={onClose}
          className="btn-primary !text-xs !py-2.5 w-full flex items-center justify-center gap-2"
        >
          <span>Done / Browse More Events</span>
        </button>
      </div>
    </div>
  );
};


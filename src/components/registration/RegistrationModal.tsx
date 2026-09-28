import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, User, Users, Plus, Trash2, AlertCircle, Calendar } from 'lucide-react';
import type { CulturalEvent, RegistrationFormData, TeamMember, Registration } from '../../types';
import { DEPARTMENTS, YEARS } from '../../data/departments';
import { registrationFormSchema } from '../../utils/validation';
import { RegistrationSuccessCard } from './RegistrationSuccessCard';
import { useAuth } from '../../context/AuthContext';

interface RegistrationModalProps {
  event: CulturalEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRegistration: (
    event: CulturalEvent,
    formData: RegistrationFormData
  ) => Promise<{ success: boolean; registration?: Registration; error?: string }>;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onSubmitRegistration,
}) => {
  const { profile } = useAuth();
  const [formData, setFormData] = useState<RegistrationFormData>({
    full_name: profile?.full_name || '',
    register_number: profile?.register_number || '',
    department: profile?.department || DEPARTMENTS[0],
    year: profile?.year || YEARS[0],
    email: profile?.email || '',
    phone: profile?.phone || '',
    college: 'Government College of Engineering, Tirunelveli',
    team_name: '',
    team_members: [],
    additional_notes: '',
    agreed_to_rules: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedRegistration, setCompletedRegistration] = useState<Registration | null>(null);

  if (!isOpen || !event) return null;

  const isTeam = event.participation_type === 'team';
  const minTeam = event.team_size_min;
  const maxTeam = event.team_size_max;

  const handleAddTeamMember = () => {
    const currentMembers = formData.team_members || [];
    if (currentMembers.length + 1 >= maxTeam) return;

    setFormData({
      ...formData,
      team_members: [
        ...currentMembers,
        {
          name: '',
          register_number: '',
          department: DEPARTMENTS[0],
          year: YEARS[0],
          phone: '',
        },
      ],
    });
  };

  const handleRemoveTeamMember = (index: number) => {
    const currentMembers = [...(formData.team_members || [])];
    currentMembers.splice(index, 1);
    setFormData({ ...formData, team_members: currentMembers });
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const currentMembers = [...(formData.team_members || [])];
    currentMembers[index] = {
      ...currentMembers[index],
      [field]: value,
    };
    setFormData({ ...formData, team_members: currentMembers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setFormErrors({});

    // Validate with Zod
    const validator = registrationFormSchema(isTeam, minTeam, maxTeam);
    const result = validator.safeParse(formData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const pathKey = issue.path.join('.');
        errors[pathKey] = issue.message;
      });
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await onSubmitRegistration(event, formData);
      if (res.success && res.registration) {
        setCompletedRegistration(res.registration);
        // Confetti effect
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f97316', '#ea580c', '#3b82f6', '#10b981'],
          });
        } catch {
          // Ignore if confetti not supported
        }
      } else {
        setSubmissionError(res.error || 'Registration failed. Please check your information.');
      }
    } catch {
      setSubmissionError('Network or server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setCompletedRegistration(null);
    setSubmissionError(null);
    setFormErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleModalClose}
    >
      <div
        className="glass-panel w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-in my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              {isTeam ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase font-mono">
                {event.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 font-display">
                {event.title}
              </h3>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {completedRegistration ? (
            <RegistrationSuccessCard
              registration={completedRegistration}
              event={event}
              onClose={handleModalClose}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Timing Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 bg-orange-50/60 dark:bg-orange-950/30 rounded-xl border border-orange-100 dark:border-orange-500/20 text-xs text-orange-950 dark:text-orange-200">
                <span className="flex items-center gap-1.5 font-medium text-orange-700 dark:text-orange-400">
                  <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                  <span>Schedule: Will be announced soon</span>
                </span>
                <span className="font-semibold text-orange-700 dark:text-orange-400">
                  {isTeam ? `Team Event (${minTeam} - ${maxTeam} members)` : 'Solo Participation'}
                </span>
              </div>

              {/* Error banner */}
              {submissionError && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Registration Unsuccessful</strong>
                    <span>{submissionError}</span>
                  </div>
                </div>
              )}

              {/* Section 1: Student / Leader Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 pb-1.5 font-mono">
                  {isTeam ? 'Team Leader / Primary Contact' : 'Participant Information'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name (as in College ID) *
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Karthikeyan S"
                      className={`form-input ${formErrors.full_name ? 'border-rose-400 focus:ring-rose-400/20' : ''}`}
                    />
                    {formErrors.full_name && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.full_name}</p>
                    )}
                  </div>

                  {/* Register Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Register / Roll Number *
                    </label>
                    <input
                      type="text"
                      value={formData.register_number}
                      onChange={(e) => setFormData({ ...formData, register_number: e.target.value })}
                      placeholder="e.g. 951221104021"
                      className={`form-input uppercase ${formErrors.register_number ? 'border-rose-400 focus:ring-rose-400/20' : ''}`}
                    />
                    {formErrors.register_number && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.register_number}</p>
                    )}
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="form-select"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    {formErrors.department && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.department}</p>
                    )}
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Academic Year *
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="form-select"
                    >
                      {YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                    {formErrors.year && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.year}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@gmail.com"
                      className={`form-input ${formErrors.email ? 'border-rose-400 focus:ring-rose-400/20' : ''}`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className={`form-input ${formErrors.phone ? 'border-rose-400 focus:ring-rose-400/20' : ''}`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Team Members (if applicable) */}
              {isTeam && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-1.5">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 font-mono">
                        Team Details (Max {maxTeam} members total)
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Leader counts as Member 1. Add remaining members below.
                      </p>
                    </div>

                    {(formData.team_members?.length || 0) + 1 < maxTeam && (
                      <button
                        type="button"
                        onClick={handleAddTeamMember}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-500/30"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Member</span>
                      </button>
                    )}
                  </div>

                  {/* Team Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Team / Crew Name *
                    </label>
                    <input
                      type="text"
                      value={formData.team_name}
                      onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                      placeholder="e.g. Mech Beats / Code Breakers"
                      className={`form-input ${formErrors.team_name ? 'border-rose-400 focus:ring-rose-400/20' : ''}`}
                    />
                    {formErrors.team_name && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.team_name}</p>
                    )}
                  </div>

                  {/* Team Members List */}
                  {formData.team_members && formData.team_members.map((member, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-white/10 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Team Member {idx + 2}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTeamMember(idx)}
                          className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                          placeholder="Full Name *"
                          className="form-input text-xs"
                          required
                        />
                        <input
                          type="text"
                          value={member.register_number}
                          onChange={(e) => handleMemberChange(idx, 'register_number', e.target.value)}
                          placeholder="Register Number *"
                          className="form-input text-xs uppercase"
                          required
                        />
                        <select
                          value={member.department}
                          onChange={(e) => handleMemberChange(idx, 'department', e.target.value)}
                          className="form-select text-xs"
                        >
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        <select
                          value={member.year}
                          onChange={(e) => handleMemberChange(idx, 'year', e.target.value)}
                          className="form-select text-xs"
                        >
                          {YEARS.map((yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  {formErrors['team_members'] && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400">{formErrors['team_members']}</p>
                  )}
                </div>
              )}

              {/* Section 3: Notes / Props / Instruments */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Additional Notes / Equipment / Instrument Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.additional_notes}
                  onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                  placeholder="e.g. Bringing own acoustic guitar / Need 2 cordless mics"
                  className="form-input"
                />
              </div>

              {/* Section 4: Rules Agreement Checkbox */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreed_to_rules}
                    onChange={(e) => setFormData({ ...formData, agreed_to_rules: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 dark:border-white/20 dark:bg-slate-900"
                  />
                  <span className="text-slate-700 dark:text-slate-300 leading-snug">
                    I agree to follow all official instructions and code of conduct for <strong>{event.title}</strong> and ELYX 26. I understand that violation of rules leads to immediate disqualification.
                  </span>
                </label>
                {formErrors.agreed_to_rules && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 pl-6.5">
                    {formErrors.agreed_to_rules}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="btn-ghost text-xs"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs !py-3 !px-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying & Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Registration</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

import type { Registration } from '../types';

export const exportRegistrationsToCSV = (
  registrations: Registration[],
  filename = 'elyx26_registrations.csv'
) => {
  const headers = [
    'Registration ID',
    'Event ID',
    'Event Name',
    'Student Name',
    'Register Number',
    'Department',
    'Year',
    'Email',
    'Phone',
    'College',
    'Participation Type',
    'Team Name',
    'Team Members',
    'Status',
    'Registered Date',
  ];

  const escapeCSV = (value: string | number | undefined | null): string => {
    if (value === null || value === undefined) return '""';
    const stringValue = String(value).replace(/"/g, '""');
    return `"${stringValue}"`;
  };

  const rows = registrations.map((r) => {
    const teamMembersSummary = r.team_members && r.team_members.length > 0
      ? r.team_members.map((m) => `${m.name} (${m.register_number}, ${m.department})`).join('; ')
      : 'N/A';

    return [
      escapeCSV(r.id),
      escapeCSV(r.event_id),
      escapeCSV(r.event_title || r.event_id),
      escapeCSV(r.full_name),
      escapeCSV(r.register_number),
      escapeCSV(r.department),
      escapeCSV(r.year),
      escapeCSV(r.email),
      escapeCSV(r.phone),
      escapeCSV(r.college),
      escapeCSV(r.participation_type),
      escapeCSV(r.team_name || 'N/A'),
      escapeCSV(teamMembersSummary),
      escapeCSV(r.status),
      escapeCSV(new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })),
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

import { z } from 'zod';

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Member name must be at least 2 characters').max(100),
  register_number: z.string().min(4, 'Register number must be at least 4 characters').max(20),
  department: z.string().min(1, 'Please select department'),
  year: z.string().min(1, 'Please select year'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number').optional().or(z.literal('')),
});

export const registrationFormSchema = (isTeamEvent: boolean, minTeamSize: number, maxTeamSize: number) => {
  return z.object({
    full_name: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name cannot exceed 100 characters')
      .regex(/^[a-zA-Z\s.]+$/, 'Name should only contain letters, spaces, and dots'),
    register_number: z
      .string()
      .min(4, 'Valid register number is required')
      .max(20, 'Register number is too long')
      .regex(/^[a-zA-Z0-9]+$/, 'Register number must be alphanumeric'),
    department: z.string().min(1, 'Please select your department'),
    year: z.string().min(1, 'Please select your academic year'),
    email: z
      .string()
      .email('Please enter a valid email address')
      .max(100, 'Email cannot exceed 100 characters'),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
    college: z
      .string()
      .min(2, 'College name is required')
      .default('Government College of Engineering, Tirunelveli'),
    team_name: isTeamEvent
      ? z.string().min(2, 'Team name is required for team events').max(50)
      : z.string().optional(),
    team_members: isTeamEvent
      ? z
          .array(teamMemberSchema)
          .refine(
            (members) => members.length + 1 >= minTeamSize,
            `Total team size must be at least ${minTeamSize} (including leader)`
          )
          .refine(
            (members) => members.length + 1 <= maxTeamSize,
            `Total team size cannot exceed ${maxTeamSize} (including leader)`
          )
      : z.array(teamMemberSchema).optional(),
    additional_notes: z.string().max(300, 'Notes cannot exceed 300 characters').optional(),
    agreed_to_rules: z
      .boolean()
      .refine((val) => val === true, 'You must agree to the official event rules to participate'),
  });
};

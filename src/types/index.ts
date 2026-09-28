export type EventCategory =
  | 'Digital Events'
  | 'Literary & Arts'
  | 'Theatre & Performance'
  | 'Craft & Design'
  | 'Music & Vocal'
  | 'Dance & Choreography'
  | 'Traditional Martial Arts'
  | 'Culinary & Lifestyle'
  | 'Adventure & Fun';

export type ParticipationType = 'individual' | 'team';

export type EventStatus =
  | 'upcoming'
  | 'registration_open'
  | 'registration_closed'
  | 'completed'
  | 'cancelled';

export type RegistrationStatus = 'confirmed' | 'waitlisted' | 'cancelled';

export interface FacultyIncharge {
  name: string;
  designation: string;
}

export interface Coordinator {
  name: string;
  department: string;
  phone: string;
  email?: string;
  role?: string;
  committee_name?: string;
}

export interface CulturalEvent {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  participation_type: ParticipationType;
  team_size_min: number;
  team_size_max: number;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  registration_deadline: string;
  description: string;
  rules: string[];
  faculty_incharge: FacultyIncharge[];
  coordinators: Coordinator[];
  status: EventStatus;
  featured?: boolean;
  image_url?: string;
  max_participants?: number;
  eligibility?: string;
  created_at?: string;
}

export interface TeamMember {
  name: string;
  register_number: string;
  department: string;
  year: string;
  phone?: string;
}

export interface Registration {
  id: string;
  event_id: string;
  event_title?: string;
  student_id?: string;
  full_name: string;
  register_number: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  college: string;
  participation_type: ParticipationType;
  team_name?: string;
  team_members?: TeamMember[];
  additional_notes?: string;
  status: RegistrationStatus;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  register_number?: string;
  department?: string;
  year?: string;
  phone?: string;
  role: 'student' | 'admin';
  created_at?: string;
}

export interface Committee {
  name: string;
  members: Coordinator[];
}

export interface FestivalInfo {
  festival_name: string;
  institution_name: string;
  institution_code: string;
  pincode: string;
  organizing_body: string;
  instagram_handle: string;
  contact_email: string;
  date_range: string;
  final_day: string;
  dress_code: {
    girls: string;
    boys: string;
  };
  general_rules: string[];
}

export interface RegistrationFormData {
  full_name: string;
  register_number: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  college: string;
  team_name?: string;
  team_members?: TeamMember[];
  additional_notes?: string;
  agreed_to_rules: boolean;
}

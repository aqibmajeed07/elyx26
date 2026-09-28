-- 004_seed_events.sql
-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform
-- Verified Seed Data from Official Rulebook and Coordinator Rosters

-- Clear existing seed data safely if running re-seed
-- TRUNCATE public.events CASCADE;

-- 1. Seed Events (30 events)
INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'photography', 'photography', 'Photography', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'GCE Campus (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Capture the beauty and moments of GCE campus through your mobile camera lens. Evaluated based on creativity and perspective.',
  '["Candidates should participate individually.", "Photos should be taken only with mobile phones.", "Photos should be taken only inside GCE-campus.", "Photos should not be edited.", "Photos should be submitted with watermark.", "Files should be sent in JPEG format to artifex2k25@gmail.com.", "File naming format: Name-Year-Department (e.g., Arun-IV-CSE.jpeg).", "Deadline for submission: 05/05/2025. Submissions after deadline will not be validated."]'::jsonb, '[{"name": "Dr. E. Siva Sankari", "designation": "AsP/CSE"}, {"name": "Prof. G. Sona", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Nawin", "department": "ECE-A", "phone": "6385662945"}, {"name": "Jonathan", "department": "MECH", "phone": "7598150117"}, {"name": "Muthu Laksmi", "department": "CIVIL", "phone": "9159970274"}, {"name": "Suba Sri", "department": "EEE", "phone": "9361046360"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'video-making', 'video-making', 'Video Making', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'GCE Campus (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Create an engaging cinematic or creative video of the campus atmosphere within 30 seconds.',
  '["Candidates should participate individually.", "Videos can be taken with mobile phones only.", "Videos should be taken only inside GCE campus.", "Maximum time for a video: 30 seconds.", "Videos should be taken in landscape mode.", "Evaluated based on creativity and storytelling.", "Submit to artifex2k25@gmail.com with format Name-Year-Department.", "Deadline: 05/05/2025."]'::jsonb, '[{"name": "Dr. E. Mohamed Najeeb", "designation": "AP/CIVIL"}, {"name": "Prof. N. Jeenath Laila", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Rakesh Sharma", "department": "ECE-B", "phone": "9585207691"}, {"name": "Sanjay", "department": "CSE", "phone": "8825779929"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'meme-creation', 'meme-creation', 'Meme Creation', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'Online Submission (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Showcase your humor and wit through creative memes depicting Engineering college life.',
  '["Candidates should participate individually.", "The meme content should be about Engineering colleges.", "Video memes are not permitted.", "Files should be sent in JPEG format.", "The Meme must not be intended to hurt anyone in specific.", "Submit to artifex2k25@gmail.com with format Name-Year-Department.", "Deadline: 05/05/2025."]'::jsonb, '[{"name": "Dr. E. Mohamed Najeeb", "designation": "AP/CIVIL"}, {"name": "Prof. N. Jeenath Laila", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Aabith", "department": "CSE", "phone": "6382550569"}, {"name": "Vallarasu", "department": "ECE-B", "phone": "6374033827"}, {"name": "Abhina", "department": "EEE", "phone": "9384500262"}, {"name": "Suganthi", "department": "CIVIL", "phone": "9488044575"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'certificate-designing', 'certificate-designing', 'Certificate Designing', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'Online Submission (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Design the official participation and merit certificate for Artifex''25.',
  '["Candidates should participate individually.", "All details regarding Artifex’25 should be included.", "Files should be sent in PDF or PNG format.", "Certificate will be selected based on design quality and aesthetic balance.", "If there is any change in the content of the certificate it will be informed after selection.", "Submit to artifex2k25@gmail.com by 05/05/2025."]'::jsonb, '[{"name": "Dr. S. Supriya", "designation": "HOD/MECH"}, {"name": "Dr. S. Mariraj Mohan", "designation": "AsP/CIVIL"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Vengadesan", "department": "CSE", "phone": "6380188588"}, {"name": "Ananth", "department": "ECE-A", "phone": "6385822658"}, {"name": "Mohana Madubala", "department": "EEE", "phone": "9344086310"}, {"name": "Jeba Catharin", "department": "ECE-A", "phone": "9789112567"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'flex-designing', 'flex-designing', 'Flex Designing', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'Online Submission (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Design the official stage flex and banner for Artifex''25.',
  '["Candidates should participate individually.", "All details regarding Artifex’25 should be included such as Chief Guest Name, Event duration, and Culturals information.", "Files should be sent in PDF or PNG format.", "Flex will be selected based on design excellence.", "Submit to artifex2k25@gmail.com with format Name-Year-Department by 05/05/2025."]'::jsonb, '[{"name": "Dr. K. Thulasimani", "designation": "PROF/CSE"}, {"name": "Dr. S. Anbu Chudar Azhagan", "designation": "AsP/PHYSICS"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Kedhar A", "department": "CSE", "phone": "9597799546"}, {"name": "Boopathi", "department": "CIVIL", "phone": "8124876926"}, {"name": "Navaneetha Krshinan", "department": "MECH", "phone": "8608926177"}, {"name": "Vinayagam", "department": "CSE", "phone": "8072838896"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'poetry', 'poetry', 'Poetry (கவிதை போட்டி)', 'Literary & Arts', 'individual',
  1, 1, '2025-04-21'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-20T23:59:59'::timestamptz, 'Express your thoughts and poetic brilliance. Topic will be given on the spot (போட்டியின் போது தலைப்பு வழங்கப்படும்).',
  '["Duration: 15 minutes.", "Paper will be provided.", "Mobile phones are strictly not allowed.", "Strictly no plagiarism."]'::jsonb, '[{"name": "Prof. V. Kumar", "designation": "AP/ENGLISH"}, {"name": "Dr. E. Esaiarasi", "designation": "AP/MATHS"}]'::jsonb, '[{"name": "Arun Kumar J", "department": "MECH IV Year", "phone": "9360850186"}, {"name": "Kokila", "department": "CIVIL IV Year", "phone": "8072517917"}, {"name": "Amala Akash", "department": "EEE", "phone": "80153183251"}, {"name": "Bowsihan", "department": "MECH", "phone": "9043364977"}, {"name": "Lakshmipriya", "department": "CSE", "phone": "9176719613"}, {"name": "Jerlin", "department": "ECE-A", "phone": "9047788847"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'essay-writing', 'essay-writing', 'Essay Writing (கட்டுரை போட்டி)', 'Literary & Arts', 'individual',
  1, 1, '2025-04-21'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-20T23:59:59'::timestamptz, 'Articulate deep perspectives, analytical prowess, and eloquence on a topical theme given on the spot.',
  '["Duration: 30 minutes.", "Topic will be given on the spot.", "Paper will be provided.", "Mobile phones not allowed.", "Strictly no plagiarism."]'::jsonb, '[{"name": "Prof. S. Muthupriya", "designation": "AP/ENGLISH"}, {"name": "Dr. J. Rajakumar", "designation": "AP/MATHS"}]'::jsonb, '[{"name": "Senthil Murugan", "department": "CIVIL IV Year", "phone": "9384365161"}, {"name": "Jeya Vinosha", "department": "CIVIL IV Year", "phone": "629268088"}, {"name": "Kalaiselvan", "department": "MECH-A", "phone": "6383419411"}, {"name": "Logesh Kumar", "department": "EEE", "phone": "8525940905"}, {"name": "Gnana Romie", "department": "ECE-A", "phone": "8220482102"}, {"name": "Madumitha", "department": "CSE", "phone": "9843235474"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'elocution', 'elocution', 'Elocution (பேச்சு போட்டி)', 'Literary & Arts', 'individual',
  1, 1, '2025-04-22'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-21T23:59:59'::timestamptz, 'Showcase your public speaking eloquence and persuasive oratory skills.',
  '["Duration: Maximum 5 minutes.", "Topic will be given on the spot.", "Do not carry any hints with you.", "Mobile phones not allowed while performing."]'::jsonb, '[{"name": "Dr. N. Suresh Babu", "designation": "AP/CHEMISTRY"}, {"name": "Prof. R. Meenakshi", "designation": "AP/PHYSICS"}]'::jsonb, '[{"name": "Nandhini N", "department": "CIVIL IV Year", "phone": "8754681101"}, {"name": "Anis Britto V", "department": "MECH IV Year", "phone": "9443655878"}, {"name": "Manikandan", "department": "EEE", "phone": "7603832177"}, {"name": "Padma", "department": "ECE-B", "phone": "7810021303"}, {"name": "Durga", "department": "CSE", "phone": "8438801404"}, {"name": "Hari Haran", "department": "CIVIL", "phone": "9344644058"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'drawing', 'drawing', 'Drawing', 'Literary & Arts', 'individual',
  1, 1, '2025-04-22'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-21T23:59:59'::timestamptz, 'Unleash your artistic imagination on canvas on a topic provided on the spot.',
  '["Duration: 1 Hour.", "Topic will be given on the spot.", "Pencil, crayons and paint are allowed.", "A3 sheet will be provided.", "Drawing essentials should be brought on your own.", "Mobile phones are not allowed."]'::jsonb, '[{"name": "Prof. P. Sureshkumar", "designation": "AP/MECH"}, {"name": "Prof. P. Prema", "designation": "AP/MECH"}]'::jsonb, '[{"name": "Shakthivelnathan", "department": "MECH IV Year", "phone": "9952624778"}, {"name": "Abinaya", "department": "ECE IV Year", "phone": "7550387120"}, {"name": "Thiyaga Thilipan", "department": "ECE-B", "phone": "9566733853"}, {"name": "Jeswin Israel", "department": "ECE-A", "phone": "9486558725"}, {"name": "Leona Amorita", "department": "MECH", "phone": "7708588899"}, {"name": "Rani", "department": "CSE", "phone": "7397151677"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'mimicry', 'mimicry', 'Mimicry', 'Theatre & Performance', 'individual',
  1, 1, '2025-04-23'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-22T23:59:59'::timestamptz, 'Imitate voices, sounds, personalities, and cinematic characters with humor and precision.',
  '["Duration: Maximum 5 minutes.", "Adult contents and controversial contents are strictly not allowed.", "Contents that offend our college faculties are not permitted."]'::jsonb, '[{"name": "Dr. A. Thangaraj", "designation": "AP/EEE"}, {"name": "Dr. M. Balasubramanian", "designation": "AP/EEE"}]'::jsonb, '[{"name": "Priya Dharshini", "department": "CSE IV Year", "phone": "9566473834"}, {"name": "Mohamed Mussammil Hussain KL", "department": "ECE IV Year", "phone": "8270359561"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'adzap', 'adzap', 'Adzap', 'Theatre & Performance', 'team',
  2, 10, '2025-04-24'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-23T23:59:59'::timestamptz, 'A comical advertisement performance where participants promote an imaginary/funny product of their choice with live voiceover.',
  '["Group event: Maximum number of persons allowed is 10.", "Duration: Maximum 10 minutes.", "Voiceover should be given for acting by anyone of the team members.", "Background audio is not allowed.", "Adult contents and controversial contents are not allowed."]'::jsonb, '[{"name": "Dr. M. Mahil", "designation": "AP/CSE"}, {"name": "Dr. D. Anitha", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Vishal M", "department": "ECE IV Year", "phone": "9600369796"}, {"name": "Venu S", "department": "MECH IV Year", "phone": "8148054624"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'art-from-waste', 'art-from-waste', 'Art from Waste', 'Craft & Design', 'individual',
  1, 1, '2025-04-25'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-24T23:59:59'::timestamptz, 'Transform waste paper, cardboard, wood, glass, plastics, metals, and rubber into sustainable and economical works of art.',
  '["Duration: Maximum 45 minutes.", "Candidates should participate individually.", "Waste materials should be brought on your own.", "Art must be made at the given time inside the venue.", "All essential tools (scissors, glue, etc.) must be brought on your own."]'::jsonb, '[{"name": "Dr. M. Mohamen Younus", "designation": "AP/CIVIL"}, {"name": "Dr. M. Murugan", "designation": "AP/CIVIL"}]'::jsonb, '[{"name": "Hemalatha AR", "department": "EEE IV Year", "phone": "9363476818"}, {"name": "Ram Kumar K", "department": "ECE IV Year", "phone": "6369646209"}, {"name": "Barath", "department": "ECE-A", "phone": "9360502257"}, {"name": "Muthamil", "department": "MECH", "phone": "9342420694"}, {"name": "Saraswathi", "department": "CSE", "phone": "9094480344"}, {"name": "Barani", "department": "EEE", "phone": "7339555384"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'mime', 'mime', 'Mime', 'Theatre & Performance', 'team',
  2, 10, '2025-04-28'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-27T23:59:59'::timestamptz, 'Silent performing art conveying deep stories and social messages solely through facial expressions, body movements, and gestures.',
  '["Duration: Maximum 10 minutes.", "Maximum number of persons allowed: 10.", "Adult contents and controversial contents are strictly not allowed.", "Contents that offend college faculties are strictly not permitted."]'::jsonb, '[{"name": "Dr. M. Vijayaraj", "designation": "HOD/ECE"}, {"name": "Dr. E. Sivaraman", "designation": "AsP/ECE"}, {"name": "Prof. V. Selvakumar", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Magdalene Mary J", "department": "ECE IV Year", "phone": "8220620848"}, {"name": "Surya C", "department": "MECH IV Year", "phone": "6374629452"}, {"name": "Vijay Kumar", "department": "CSE", "phone": "6369345012"}, {"name": "Vijay", "department": "ECE-B", "phone": "6380239097"}, {"name": "Tamil Selvi", "department": "CIVIL", "phone": "9092264520"}, {"name": "Swetha Lakshmi", "department": "EEE", "phone": "8825543878"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'silambam', 'silambam', 'Silambam', 'Traditional Martial Arts', 'individual',
  1, 1, '2025-04-28'::date, '15:00'::time, '17:00'::time,
  'Admin Block', '2025-04-27T23:59:59'::timestamptz, 'Display traditional Tamil martial arts mastery, agile stick rotations, and rhythmic combat forms.',
  '["Duration: Maximum 2 minutes.", "Candidates should participate individually.", "Silambam sticks will be provided."]'::jsonb, '[{"name": "Prof. S. Somesh Subramanian", "designation": "AP/MECH"}, {"name": "Dr. S. Ananthakumar", "designation": "AP/MECH"}]'::jsonb, '[{"name": "Arul Selva Jayasurya", "department": "MECH IV Year", "phone": "9600933054"}, {"name": "Oviya V", "department": "ECE IV Year", "phone": "9363384527"}, {"name": "Ramkumar", "department": "ECE-B", "phone": "8015407335"}, {"name": "Vedha Sujith", "department": "ECE-B", "phone": "6379665181"}, {"name": "Maharaja", "department": "EEE", "phone": "9524669119"}, {"name": "Kaviya G", "department": "ECE-A", "phone": "9487194686"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'debate', 'debate', 'Debate', 'Literary & Arts', 'individual',
  1, 1, '2025-04-29'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-28T23:59:59'::timestamptz, 'Engage in dynamic, formal debates on contemporary themes. Best individual speakers will be awarded.',
  '["Topic will be given on the spot.", "All registered participants will be divided into two groups according to preference.", "Participants should put forward a formal discussion under the given topic.", "The best speakers will be selected as individuals on the basis of their debating skills.", "Mobile phones not allowed.", "Candidates are permitted to deliver their speech in colloquial way."]'::jsonb, '[{"name": "Dr. B. Paramasivam", "designation": "AsP/EEE"}, {"name": "Dr. G. Balasubramanian", "designation": "AP/EEE"}]'::jsonb, '[{"name": "Vignesh M", "department": "EEE IV Year", "phone": "9566642507"}, {"name": "Swathi", "department": "EEE IV Year", "phone": "6385592581"}, {"name": "Kishore G P", "department": "CSE", "phone": "6380658348"}, {"name": "Vishva", "department": "CIVIL", "phone": "8610425526"}, {"name": "Femi", "department": "CIVIL", "phone": "7708879903"}, {"name": "Gracy", "department": "EEE", "phone": "6382488936"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;


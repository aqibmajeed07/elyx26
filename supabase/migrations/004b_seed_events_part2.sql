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
  'drama', 'drama', 'Drama', 'Theatre & Performance', 'team',
  2, 10, '2025-05-05'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-05-04T23:59:59'::timestamptz, 'Theatrical stage drama bringing scripts, characters, emotions, and narratives to life.',
  '["Duration: 15 minutes.", "Maximum number of persons allowed: 10.", "Group can be formed within your year students or along with other year students but MUST be within your department.", "Background audios are not allowed.", "Adult contents and controversial contents are not allowed.", "Contents that offend college faculties are strictly not permitted.", "Properties needed for drama should be brought on your own.", "Boys and Girls combined performance NOT allowed.", "Proper dress code should be followed."]'::jsonb, '[{"name": "Dr. S. Ida Evangeline", "designation": "AP/EEE"}, {"name": "Prof. A. Renaldo Maximus", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Abinesh", "department": "ECE IV Year", "phone": "9629525907"}, {"name": "Dharshana", "department": "ECE IV Year", "phone": "9486062315"}, {"name": "Rahul", "department": "CSE", "phone": "8778154886"}, {"name": "Dinafrin Marshal", "department": "EEE", "phone": "7708489488"}, {"name": "Kowshika", "department": "CIVIL", "phone": "9486202421"}, {"name": "Kumudha", "department": "ECE-A", "phone": "9080862410"}]'::jsonb,
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
  'rangoli', 'rangoli', 'Rangoli', 'Craft & Design', 'team',
  1, 4, '2025-05-06'::date, '15:00'::time, '17:00'::time,
  'Admin Block', '2025-05-05T23:59:59'::timestamptz, 'Traditional Indian floor art of vibrant patterns and symmetric geometry using colored powders.',
  '["Duration: Maximum 2 hours.", "Maximum number of people allowed: 4.", "Rangoli powder should be brought on your own.", "Chalk piece will be provided."]'::jsonb, '[{"name": "Dr. I. Muthumani", "designation": "PROF/ECE"}, {"name": "Dr. P. E. Irin Dorathy", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Gayathri KR", "department": "EEE IV Year", "phone": "8838971137"}, {"name": "Shakthi Vignesh MS", "department": "MECH IV Year", "phone": "9489567504"}, {"name": "Yuva Shruthi", "department": "CSE", "phone": "9345998685"}, {"name": "Ramya K", "department": "ECE-B", "phone": "7010432609"}, {"name": "Shifana", "department": "CIVIL", "phone": "8610010920"}, {"name": "Abinaya", "department": "MECH", "phone": "9940993668"}]'::jsonb,
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
  'vegetable-carving', 'vegetable-carving', 'Vegetable Carving', 'Craft & Design', 'individual',
  1, 1, '2025-05-07'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-05-06T23:59:59'::timestamptz, 'Intricate sculptural carving into fruits and vegetables creating ornamental pieces.',
  '["Duration: 45 minutes.", "Candidates should participate individually.", "Vegetables and other essential items (knife, toothpick, etc.) should be brought on your own."]'::jsonb, '[{"name": "Dr. M. Sabari", "designation": "AP/MATHS"}, {"name": "Dr. D. Cherine", "designation": "AP/PHYSICS"}]'::jsonb, '[{"name": "Alwin", "department": "CIVIL IV Year", "phone": "7305927703"}, {"name": "Shankarammal Sabitha K", "department": "EEE IV Year", "phone": "8778099137"}, {"name": "Sam Jenishion", "department": "MECH", "phone": "7845520405"}, {"name": "Preethi R K", "department": "ECE-B", "phone": "9342173108"}, {"name": "Vennila R", "department": "CSE", "phone": "8825955536"}, {"name": "Mussamil", "department": "CIVIL", "phone": "8838299107"}]'::jsonb,
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
  'solo-singing', 'solo-singing', 'Solo Singing', 'Music & Vocal', 'individual',
  1, 1, '2025-04-23'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-20T23:59:59'::timestamptz, 'Vocal solo performance showcasing melody, pitch, rhythm, and stage presence.',
  '["Preliminary round will be conducted based on the number of participants.", "Participants should be ready before 20/04/2025.", "There will be rehearsals.", "Duration: Maximum 5 minutes.", "Karaoke track should be submitted on or before 20/04/2025.", "Dancing is not permitted."]'::jsonb, '[{"name": "Dr. G. Tamil Pavai", "designation": "HOD/CSE"}, {"name": "Dr. J. Suganthi", "designation": "PROF/EEE"}]'::jsonb, '[{"name": "Abiksha", "department": "EEE IV Year", "phone": "6380111273"}, {"name": "Mukesh", "department": "MECH IV Year", "phone": "6381576318"}, {"name": "Ranjith Kumar", "department": "ECE-B", "phone": "6381587076"}, {"name": "Mugesh Kumar", "department": "EEE", "phone": "9345992247"}, {"name": "Vishnu C M", "department": "ECE-B", "phone": "9677807367"}, {"name": "Boomika", "department": "CIVIL", "phone": "9360805613"}, {"name": "Hema", "department": "MECH", "phone": "8438890190"}]'::jsonb,
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
  'group-singing', 'group-singing', 'Group Singing', 'Music & Vocal', 'team',
  2, 8, '2025-04-24'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-20T23:59:59'::timestamptz, 'Vocal ensemble harmony, choir, or mashup rendition with vocal synchrony.',
  '["Preliminary round will be conducted based on the number of participants.", "Participants should be ready before 20/04/2025 with rehearsals.", "Duration: Maximum 7 minutes.", "Karaoke track should be submitted on 20/04/2025.", "Boys and Girls combined performance IS allowed.", "Dancing is not permitted."]'::jsonb, '[{"name": "Dr. D. Jebakani", "designation": "PROF/MECH"}, {"name": "Dr. A. Krishnaveni", "designation": "PROF/MECH"}]'::jsonb, '[{"name": "Abiksha", "department": "EEE IV Year", "phone": "6380111273"}, {"name": "Mukesh", "department": "MECH IV Year", "phone": "6381576318"}]'::jsonb,
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
  'solo-dance', 'solo-dance', 'Solo Dance', 'Dance & Choreography', 'individual',
  1, 1, '2025-04-25'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-22T23:59:59'::timestamptz, 'Individual dance choreography showcasing rhythm, grace, energy, and expressions.',
  '["Preliminary round will be conducted based on the number of participants.", "Duration: Maximum 4 to 5 minutes.", "Dance audio must be submitted on or before 22/04/2025.", "Dance costume must be decent and informed to event coordinators on 22/04/2025.", "Boys and Girls combined performance is not allowed."]'::jsonb, '[{"name": "Dr. T. Seethalakshmi", "designation": "AP/CIVIL"}, {"name": "Dr. K. Padma Priya", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Balamurugan R", "department": "CSE IV Year", "phone": "9597810859"}, {"name": "Amutha", "department": "CIVIL IV Year", "phone": "7339077216"}, {"name": "Prathap", "department": "CSE", "phone": "7094234189"}, {"name": "Deva", "department": "MECH", "phone": "6379843913"}, {"name": "Fathima", "department": "ECE-A", "phone": "8825753153"}, {"name": "Jotheeshwari", "department": "CIVIL", "phone": "7845293989"}]'::jsonb,
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
  'group-dance', 'group-dance', 'Group Dance', 'Dance & Choreography', 'team',
  2, 8, '2025-04-30'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-22T23:59:59'::timestamptz, 'High-octane group dance performance with synchronized choreographies, formations, and themes.',
  '["Preliminary round will be conducted based on the number of participants.", "Duration: Maximum 6 to 7 minutes.", "Maximum number of people allowed: 8.", "Dance audio must be submitted on or before 22/04/2025.", "Dance costume must be decent and informed to event coordinators on 22/04/2025.", "Boys and Girls combined performance is NOT allowed."]'::jsonb, '[{"name": "Dr. P. Subha Karuvelam", "designation": "PROF/EEE"}, {"name": "Dr. M. Gnana Sundari", "designation": "PROF/EEE"}]'::jsonb, '[{"name": "Balamurugan R", "department": "CSE IV Year", "phone": "9597810859"}, {"name": "Amutha", "department": "CIVIL IV Year", "phone": "7339077216"}]'::jsonb,
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
  'instrument-playing', 'instrument-playing', 'Instrument Playing', 'Music & Vocal', 'individual',
  1, 4, '2025-04-29'::date, '15:00'::time, '17:00'::time,
  'Exam Hall', '2025-04-27T23:59:59'::timestamptz, 'Live musical instrument performance displaying melody, technique, chords, or percussion rhythms.',
  '["Preliminary round will be conducted based on the number of participants.", "Duration: Maximum 4 minutes.", "Any instrument is allowed (Keyboard, Guitar, Violin, Drums, Flute, Mridangam, etc.).", "Boys and Girls combined performance allowed.", "Usage of any recorded audios is strictly not allowed."]'::jsonb, '[{"name": "Dr. J. John", "designation": "AsP/MATHS"}, {"name": "Dr. S. Sophie Beulah", "designation": "AsP/CHEMISTRY"}]'::jsonb, '[{"name": "Nesan Paul", "department": "ECE IV Year", "phone": "7092481555"}, {"name": "Kulasekara Lakshmi", "department": "CIVIL IV Year", "phone": "9344575074"}, {"name": "Seshu Ganesh", "department": "ECE-B", "phone": "9629956042"}, {"name": "Kannan S P", "department": "CSE", "phone": "9344889051"}, {"name": "Aathi Kesavan", "department": "CIVIL", "phone": "9342456754"}, {"name": "Maridhas", "department": "ECE-A", "phone": "7305798505"}]'::jsonb,
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
  'fireless-cooking', 'fireless-cooking', 'Fireless Cooking', 'Culinary & Lifestyle', 'team',
  1, 2, '2025-05-02'::date, '15:00'::time, '17:00'::time,
  'SSS Block', '2025-05-01T23:59:59'::timestamptz, 'Prepare delicious, nutritious, and innovative culinary dishes without any thermal heating or flame.',
  '["No electric appliances or stove flames allowed.", "Ingredients must be brought by the participants.", "Cleanliness and presentation will be judged.", "Time limit: 45 minutes."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Veera Bharathi", "department": "EEE", "phone": "6385657637"}, {"name": "Jenowin", "department": "CIVIL", "phone": "9042514044"}, {"name": "Akshya", "department": "CSE", "phone": "6379548209"}, {"name": "Pavithra", "department": "ECE-B", "phone": "9360783773"}]'::jsonb,
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
  'quiz', 'quiz', 'General & Cultural Quiz', 'Literary & Arts', 'team',
  2, 2, '2025-04-26'::date, '15:00'::time, '17:00'::time,
  'Exam Hall', '2025-04-25T23:59:59'::timestamptz, 'Test your intellect, pop culture, Tamil heritage, art, history, and current affairs knowledge.',
  '["Team of 2 members.", "Preliminary written round followed by buzzer finals.", "Mobile phones strictly prohibited during the quiz."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Aravind", "department": "CIVIL", "phone": "9442981307"}, {"name": "Mohammed", "department": "MECH", "phone": "9952507669"}, {"name": "Santhiya", "department": "CSE", "phone": "6381764603"}, {"name": "Akshaya", "department": "EEE", "phone": "7904632928"}]'::jsonb,
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
  'treasure-hunt', 'treasure-hunt', 'Treasure Hunt', 'Adventure & Fun', 'team',
  3, 4, '2025-05-03'::date, '14:30'::time, '17:00'::time,
  'Campus Grounds', '2025-05-02T23:59:59'::timestamptz, 'Decipher cryptic clues, solve riddles, and navigate across campus grounds to uncover the final prize.',
  '["Team size: 3-4 members.", "All clues must be retrieved in sequential order.", "Disruption to classes or campus property leads to instant disqualification."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Siva Sankar", "department": "CSE", "phone": "7010328022"}, {"name": "Hari Pranav", "department": "CIVIL", "phone": "9384455155"}, {"name": "Beautlin", "department": "EEE", "phone": "8883260365"}, {"name": "Pavithra", "department": "CSE", "phone": "9597910333"}]'::jsonb,
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
  'mehendi', 'mehendi', 'Mehendi Designing', 'Craft & Design', 'individual',
  1, 2, '2025-05-06'::date, '15:00'::time, '17:00'::time,
  'SSS Block', '2025-05-05T23:59:59'::timestamptz, 'Showcase intricate henna body art, Arabic patterns, and traditional Indian bridal designs.',
  '["Participant may bring one model on whose hand henna is applied.", "Mehendi cones must be brought by the participants.", "Pre-drawn patterns or stencils are strictly prohibited.", "Time duration: 1 hour."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Nandhini", "department": "CSE", "phone": "9894179538"}, {"name": "Sumu Priya", "department": "MECH", "phone": "9361191642"}, {"name": "Thilai Bala", "department": "CIVIL", "phone": "8610123913"}, {"name": "Rasinath Jamroon", "department": "ECE-B", "phone": "7418002264"}]'::jsonb,
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
  'fashion-show', 'fashion-show', 'Fashion Show / Traditional Walk', 'Theatre & Performance', 'individual',
  1, 1, '2025-05-08'::date, '15:00'::time, '17:30'::time,
  'College Auditorium', '2025-05-06T23:59:59'::timestamptz, 'Celebrate Indian cultural diversity, ethnic elegance, and thematic runway walks.',
  '["Team size: 4 - 10 members.", "Strict adherence to college dress code: vulgarity or indecent costumes will result in immediate disqualification.", "Soundtrack must be submitted 2 days in advance.", "Performance duration: 7 minutes."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Shrivarsan", "department": "ECE-B", "phone": "9360998412"}, {"name": "Durgesh Ramkumar", "department": "ECE-A", "phone": "9025565520"}, {"name": "Dhanush", "department": "MECH", "phone": "9025385431"}, {"name": "Jeswn", "department": "EEE", "phone": "9385716377"}]'::jsonb,
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
  'talent-hunt', 'talent-hunt', 'Talent Hunt', 'Theatre & Performance', 'individual',
  1, 2, '2025-05-07'::date, '15:00'::time, '17:00'::time,
  'SSS Block / Auditorium', '2025-05-05T23:59:59'::timestamptz, 'Any unique, extraordinary skill—beatboxing, magic, juggling, stand-up, speed art, or unique instrument.',
  '["Performance time: 3-5 minutes.", "Props must be brought by the participant.", "Hazardous materials or fire are strictly banned."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Maheshwaran", "department": "CIVIL", "phone": "7904288968"}, {"name": "Shyam Roshan", "department": "ECE-B", "phone": "7010971796"}, {"name": "Absal", "department": "CSE", "phone": "8838669760"}, {"name": "Swetha", "department": "CIVIL", "phone": "8248814895"}]'::jsonb,
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



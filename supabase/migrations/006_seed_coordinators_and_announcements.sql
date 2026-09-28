-- 006_seed_coordinators_and_announcements.sql
-- GEC Tirunelveli - ARTIFEX25 Cultural Events

-- 2. Seed Coordinators from Committees & Overall List
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jonaham Marrion Elam', '9489470593', 'MECH A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Tychicus Samson S', '7904803731', 'MECH B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Naveen Raj V', '9487998285', 'CIVIL', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Litta Janet S', '9363472358', 'EEE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Arun Kapil M', '9360427143', 'CSE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Magdalene Mary J', '8220620848', 'ECE A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Udhayashree R', '8754351708', 'ECE B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Nakul', '7530042159', 'MECH-A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Hari Sankar', '9360807695', 'ECE-A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sanil Kumar', '9042544654', 'ECE-B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Pavinthiran', '9655374901', 'CSE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Pawan Kumar', '9361485724', 'EEE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Shasidharan', '9361794341', 'MECH-B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Loga Dhanush', '9344796313', 'CIVIL', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Vishva', '8610425526', 'CIVIL', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kiran Jothi', '6374842921', 'EEE', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Deva', '6379843913', 'MECH', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Suganthi', '9488044575', 'CIVIL', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mamathi Dhas', '6383960164', 'CIVIL', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kedhar', '9597799546', 'CSE', 'Committee Member', 'Banner and Certificate Printing Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Iyappan', '7538814967', 'ECE-A', 'Committee Member', 'Banner and Certificate Printing Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mussamil', '8838299107', 'CIVIL', 'Committee Member', 'Banner and Certificate Printing Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Monika', '6383509437', 'ECE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sankari', '9443531529', 'ECE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Barani N', '7339555384', 'EEE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Swetha Lakshmi', '8825543878', 'EEE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Akshaya', '7904632928', 'EEE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jotheeswari', '7845293989', 'CIVIL', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Abdulla', '7871574585', 'MECH', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Amala Akash', '8015318251', 'EEE', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kishore', '6380658348', 'CSE', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Remi Edwin', '9677221177', 'CIVIL', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Pawan', '9361485724', 'EEE', 'Committee Member', 'Power Supply Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mugesh Kumar', '9345992247', 'EEE', 'Committee Member', 'Power Supply Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Vinothini', '9786356135', 'EEE', 'Committee Member', 'Power Supply Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Ganthan', '8190804948', 'CSE', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sanil', '9042544654', 'ECE', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Thillai Bala', '8610123913', 'CIVIL', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Swetha', '8248814895', 'CIVIL', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kiran Jothi', '6374842921', 'EEE', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mari Eshwar', '9092825147', 'ECE-A', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kabilan R', '6382376593', 'EEE', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Thiyaga Thilipan', '9566733853', 'ECE-B', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Loga Dhanush S', '9344796313', 'CIVIL', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Esaki Shanmugam', '9442706048', 'CSE', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Maheshwaran', '7904288968', 'CIVIL', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jonathan', '7598150117', 'MECH', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sam', '80724066992', 'CSE', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kanisk', '9487169629', 'CSE', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Manoj', '7871179650', 'ECE-A', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Dino', '7708489488', 'EEE', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Subash', '8489638803', 'CIVIL', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Murugan', '9629769575', 'MECH', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kaviya', '9487194686', 'ECE-A', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jerona', '9384980739', 'ECE-A', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Santhya', '6381764603', 'CSE', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Nanthini', '9894179538', 'CSE', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Harsha Varthini', '6383370780', 'ECE-A', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Munawara', '9042029866', 'CSE', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Ramsan Safrin', '9790870905', 'CSE', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Gomathi Ambika', '7826075758', 'CSE', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Femi', '7708879903', 'CIVIL', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Ariprasath', '9994353825', 'ECE-A', 'Committee Member', 'Media and News report Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Rakesh Sharma', '9585207691', 'ECE-B', 'Committee Member', 'Media and News report Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Aabith', '6382550569', 'CSE', 'Committee Member', 'Media and News report Committee')
ON CONFLICT DO NOTHING;

-- 3. Initial Announcements
INSERT INTO public.announcements (title, content, category, is_pinned)
VALUES 
  ('Welcome to ARTIFEX''25!', 'Government College of Engineering, Tirunelveli presents ARTIFEX''25 organized by the Fine Arts Association from 21 April 2025 to 09 May 2025.', 'highlight', true),
  ('Digital Events Submissions Open', 'All digital event participants (Photography, Video Making, Meme Creation, Designing) must submit their entries to artifex2k25@gmail.com on or before 05/05/2025 with filename format: Name-Year-Department.', 'alert', true),
  ('Grand Finale Dress Code & Guidelines', 'All students should strictly follow the proper dress code on 09/05/2025: Chudidhar with compulsory shawl for girls, and formal college wear for boys. College ID cards are mandatory for all attendees.', 'info', false);

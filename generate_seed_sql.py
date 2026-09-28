import json

with open("seed_artifex25.json", encoding="utf-8") as f:
    data = json.load(f)

events = data["events"]
overall_coords = data["overall_coordinators"]
committees = data["committees"]

sql_lines = [
    "-- 004_seed_events.sql",
    "-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform",
    "-- Verified Seed Data from Official Rulebook and Coordinator Rosters",
    "",
    "-- Clear existing seed data safely if running re-seed",
    "-- TRUNCATE public.events CASCADE;",
    "",
]

# Insert Events
sql_lines.append("-- 1. Seed Events (30 events)")
for ev in events:
    title_esc = ev["title"].replace("'", "''")
    desc_esc = ev["description"].replace("'", "''")
    venue_esc = ev["venue"].replace("'", "''")
    rules_json = json.dumps(ev["rules"], ensure_ascii=False).replace("'", "''")
    faculty_json = json.dumps(ev["faculty_incharge"], ensure_ascii=False).replace("'", "''")
    coords_json = json.dumps(ev["coordinators"], ensure_ascii=False).replace("'", "''")
    reg_dl = f"'{ev['registration_deadline']}'::timestamptz" if ev.get("registration_deadline") else "NULL"
    start_t = f"'{ev['start_time']}'::time" if ev.get("start_time") else "NULL"
    end_t = f"'{ev['end_time']}'::time" if ev.get("end_time") else "NULL"
    ev_date = f"'{ev['event_date']}'::date" if ev.get("event_date") else "NULL"
    featured = "true" if ev.get("featured") else "false"

    sql = f"""INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  '{ev["id"]}', '{ev["slug"]}', '{title_esc}', '{ev["category"]}', '{ev["participation_type"]}',
  {ev["team_size_min"]}, {ev["team_size_max"]}, {ev_date}, {start_t}, {end_t},
  '{venue_esc}', {reg_dl}, '{desc_esc}',
  '{rules_json}'::jsonb, '{faculty_json}'::jsonb, '{coords_json}'::jsonb,
  '{ev["status"]}', {featured}
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;
"""
    sql_lines.append(sql)

# Insert Coordinators
sql_lines.append("\n-- 2. Seed Coordinators from Committees & Overall List")
for c in overall_coords:
    c_name = c["name"].replace("'", "''")
    dept = c["department"].replace("'", "''")
    phone = c["phone"]
    role = c["role"].replace("'", "''")
    sql = f"""INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('{c_name}', '{phone}', '{dept}', '{role}', 'Overall Coordinators')
ON CONFLICT DO NOTHING;"""
    sql_lines.append(sql)

for comm in committees:
    comm_name = comm["name"].replace("'", "''")
    for m in comm["members"]:
        m_name = m["name"].replace("'", "''")
        dept = m["department"].replace("'", "''")
        phone = m["phone"]
        sql = f"""INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('{m_name}', '{phone}', '{dept}', 'Committee Member', '{comm_name}')
ON CONFLICT DO NOTHING;"""
        sql_lines.append(sql)

# Insert Announcements
sql_lines.append("""
-- 3. Initial Announcements
INSERT INTO public.announcements (title, content, category, is_pinned)
VALUES 
  ('Welcome to ARTIFEX''25!', 'Government College of Engineering, Tirunelveli presents ARTIFEX''25 organized by the Fine Arts Association from 21 April 2025 to 09 May 2025.', 'highlight', true),
  ('Digital Events Submissions Open', 'All digital event participants (Photography, Video Making, Meme Creation, Designing) must submit their entries to artifex2k25@gmail.com on or before 05/05/2025 with filename format: Name-Year-Department.', 'alert', true),
  ('Grand Finale Dress Code & Guidelines', 'All students should strictly follow the proper dress code on 09/05/2025: Chudidhar with compulsory shawl for girls, and formal college wear for boys. College ID cards are mandatory for all attendees.', 'info', false);
""")

with open("supabase/migrations/004_seed_events.sql", "w", encoding="utf-8") as f_out:
    f_out.write("\n".join(sql_lines))

print("004_seed_events.sql generated successfully!")

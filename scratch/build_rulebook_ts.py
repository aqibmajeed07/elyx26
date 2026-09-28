import json, os

with open('scratch/parsed_rulebook.json', encoding='utf-8') as f:
    events = json.load(f)

# Clean up any raw lines in coordinators
for ev in events:
    cleaned_coords = [c for c in ev['coordinators'] if 'name' in c]
    ev['coordinators'] = cleaned_coords

overall_coordinators = [
    {"name": "NAKUL", "department": "MECH-A", "phone": "7530042159", "role": "Overall Coordinator"},
    {"name": "HARI SANKAR", "department": "ECE-A", "phone": "9360807695", "role": "Overall Coordinator"},
    {"name": "SANIL KUMAR", "department": "ECE-B", "phone": "9042544654", "role": "Overall Coordinator"},
    {"name": "PAVINTHIRAN", "department": "CSE", "phone": "9655374901", "role": "Overall Coordinator"},
    {"name": "PAWAN KUMAR", "department": "EEE", "phone": "9361485724", "role": "Overall Coordinator"},
    {"name": "SHASIDHARAN", "department": "MECH-B", "phone": "9361794341", "role": "Overall Coordinator"},
    {"name": "LOGA DHANUSH", "department": "CIVIL", "phone": "9344796313", "role": "Overall Coordinator"}
]

section_coordinators = {
    "General Events": [
        {"name": "MANIKANDAN", "department": "EEE"},
        {"name": "YUVA SHRUTHI", "department": "CSE"},
        {"name": "HARI HARAN", "department": "CIVIL"},
        {"name": "ESWIN ISRAEL", "department": "ECE"},
        {"name": "MUTHAMIL", "department": "MECH"}
    ],
    "Digital Events": [
        {"name": "AABITH", "department": "CSE"},
        {"name": "NAWIN", "department": "ECE"},
        {"name": "ARUNA", "department": "MECH"},
        {"name": "ABHINA", "department": "EEE"},
        {"name": "SUGANTHI", "department": "CIVIL"}
    ],
    "Onstage Events": [
        {"name": "PRATHAP", "department": "CSE"},
        {"name": "BOOMIKA", "department": "CIVIL"},
        {"name": "RANJITH KUMAR", "department": "ECE"},
        {"name": "MAHARAJA", "department": "EEE"},
        {"name": "DHANUSH", "department": "MECH"}
    ]
}

committees = [
    {
        "name": "Invitation Preparation and Distribution Committee",
        "members": [
            {"name": "VISHVA", "department": "CIVIL"},
            {"name": "KIRAN JOTHI", "department": "EEE"},
            {"name": "DEVA", "department": "MECH"},
            {"name": "SUGANTHI", "department": "CIVIL"},
            {"name": "MAMATHI DHAS", "department": "CIVIL"}
        ]
    },
    {
        "name": "Banner and Certificate Printing Committee",
        "members": [
            {"name": "KEDHAR", "department": "CSE"},
            {"name": "IYAPPAN", "department": "ECE-A"},
            {"name": "MUSSAMIL", "department": "CIVIL"}
        ]
    },
    {
        "name": "Reception Committee",
        "members": [
            {"name": "MONIKA", "department": "ECE"},
            {"name": "SANKARI", "department": "ECE"},
            {"name": "BARANI N", "department": "EEE"},
            {"name": "SWETHA LAKSHMI", "department": "EEE"},
            {"name": "AKSHAYA", "department": "EEE"}
        ]
    },
    {
        "name": "Auditorium Hall and Arrangement Committee",
        "members": [
            {"name": "JOTHEESWARI", "department": "CIVIL"},
            {"name": "ABDULLA", "department": "MECH"},
            {"name": "AMALA AKASH", "department": "EEE"},
            {"name": "KISHORE", "department": "CSE"},
            {"name": "REMI EDWIN", "department": "CIVIL"}
        ]
    },
    {
        "name": "Power Supply Arrangement Committee",
        "members": [
            {"name": "PAWAN", "department": "EEE"},
            {"name": "MUGESH KUMAR", "department": "EEE"},
            {"name": "VINOTHINI", "department": "EEE"}
        ]
    },
    {
        "name": "Chief Arrangement Committee",
        "members": [
            {"name": "GANTHAN", "department": "CSE"},
            {"name": "SANIL", "department": "ECE"},
            {"name": "THILLAI BALA", "department": "CIVIL"},
            {"name": "SWETHA", "department": "CIVIL"},
            {"name": "KIRAN JOTHI", "department": "EEE"}
        ]
    },
    {
        "name": "Refreshment Arrangement Committee",
        "members": [
            {"name": "MARI ESHWAR", "department": "ECE-A"},
            {"name": "KABILAN R", "department": "EEE"},
            {"name": "THIYAGA THILIPAN", "department": "ECE-B"},
            {"name": "LOGA DHANUSH S", "department": "CIVIL"}
        ]
    },
    {
        "name": "Photography and Video Arrangement Committee",
        "members": [
            {"name": "ESAKI SHANMUGAM", "department": "CSE"},
            {"name": "MAHESHWARAN", "department": "CIVIL"},
            {"name": "JONATHAN", "department": "MECH"},
            {"name": "SAM", "department": "CSE"}
        ]
    },
    {
        "name": "Student Discipline and Crowd Management Committee",
        "members": [
            {"name": "KANISK", "department": "CSE"},
            {"name": "MANOJ", "department": "ECE-A"},
            {"name": "DINO", "department": "EEE"},
            {"name": "SUBASH", "department": "CIVIL"},
            {"name": "MURUGAN", "department": "MECH"}
        ]
    },
    {
        "name": "Certificate and Prize Distribution Committee",
        "members": [
            {"name": "KAVIYA", "department": "ECE-A"},
            {"name": "JERONA", "department": "ECE-A"},
            {"name": "SANTHYA", "department": "CSE"},
            {"name": "NANTHINI", "department": "CSE"}
        ]
    },
    {
        "name": "Cultural Events and Program Coordination Committee",
        "members": [
            {"name": "HARSHA VARTHINI", "department": "ECE-A"},
            {"name": "MUNAWARA", "department": "CSE"},
            {"name": "RAMSAN SAFRIN", "department": "CSE"},
            {"name": "GOMATHI AMBIKA", "department": "CSE"},
            {"name": "FEMI", "department": "CIVIL"}
        ]
    },
    {
        "name": "Media and News Report Committee",
        "members": [
            {"name": "ARIPRASATH", "department": "ECE-A"},
            {"name": "RAKESH SHARMA", "department": "ECE-B"},
            {"name": "AABITH", "department": "CSE"}
        ]
    }
]

ts_content = f"""// src/data/revisedRulebook.ts
// Official revised rulebook data extracted from ELYX26_RULEBOOK_Final.pdf

export interface RulebookCoordinator {{
  name: string;
  department: string;
  phone?: string;
  role?: string;
}}

export interface RulebookFaculty {{
  name: string;
  designation: string;
}}

export interface RulebookEvent {{
  number: number;
  title: string;
  category: 'General Events' | 'Digital Events' | 'On Stage Events';
  date: string;
  rules: string[];
  faculty: RulebookFaculty[];
  coordinators: RulebookCoordinator[];
}}

export interface CommitteeGroup {{
  name: string;
  members: RulebookCoordinator[];
}}

export const OFFICIAL_RULEBOOK_PDF_URL = '/ELYX26_RULEBOOK_Final.pdf';

export const OVERALL_COORDINATORS_REVISED: RulebookCoordinator[] = {json.dumps(overall_coordinators, indent=2)};

export const SECTION_COORDINATORS_REVISED: Record<string, RulebookCoordinator[]> = {json.dumps(section_coordinators, indent=2)};

export const COMMITTEES_REVISED: CommitteeGroup[] = {json.dumps(committees, indent=2)};

export const REVISED_EVENTS_RULEBOOK: RulebookEvent[] = {json.dumps(events, indent=2)};

export const DIGITAL_COMMON_INSTRUCTIONS = [
  "Participants should submit their work through the Email ID: elexgce2026@gmail.com",
  "File name should be in the following format: Name - Year - Department",
  "The submissions will not be validated if submitted after the deadline."
];
"""

with open('src/data/revisedRulebook.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print('Successfully created src/data/revisedRulebook.ts')

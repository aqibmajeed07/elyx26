import type { CulturalEvent, Coordinator, Committee, FestivalInfo } from '../types';

export const FESTIVAL_INFO: FestivalInfo = {
  "festival_name": "ELYX 26",
  "institution_name": "Government College of Engineering, Tirunelveli",
  "institution_code": "GCE Tirunelveli",
  "pincode": "627007",
  "organizing_body": "Fine Arts Association",
  "instagram_handle": "@elyx_26",
  "contact_email": "elexgce2026@gmail.com",
  "date_range": "Will be announced soon",
  "final_day": "Will be announced soon",
  "dress_code": {
    "girls": "Chudidhar with Shawl compulsory",
    "boys": "College Wear"
  },
  "general_rules": [
    "On the day of events, juniors (1st, 2nd & 3rd years) except participants should stay in their class.",
    "On-Duty (OD) will be provided only for Participants, Event coordinators and Volunteers (IV year).",
    "All students should strictly follow the proper dress code on event days.",
    "College ID is mandatory for all students attending or participating in events.",
    "Juniors can contact their respective senior event coordinators for any guidance."
  ]
};

export const INITIAL_EVENTS: CulturalEvent[] = [
  {
    "id": "photography",
    "slug": "photography",
    "title": "Photography",
    "category": "Digital Events",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-05-05",
    "start_time": "09:00",
    "end_time": "17:00",
    "venue": "GCE Campus (Submit to elexgce2026@gmail.com)",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Capture the beauty and moments of GCE campus through your mobile camera lens. Evaluated based on creativity and perspective.",
    "rules": [
      "Candidates should participate individually.",
      "Photos should be taken only with mobile phones.",
      "Photos should be taken only inside GCE-campus.",
      "Photos should not be edited.",
      "Photos should be submitted with watermark.",
      "Files should be sent in JPEG format to elexgce2026@gmail.com.",
      "File naming format: Name-Year-Department (e.g., Arun-IV-CSE.jpeg).",
      "Deadline for submission: 05/05/2025. Submissions after deadline will not be validated."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. E. Siva Sankari",
        "designation": "AsP/CSE"
      },
      {
        "name": "Prof. G. Sona",
        "designation": "AP/CSE"
      }
    ],
    "coordinators": [
      {
        "name": "Muthu Venkatesh",
        "department": "MECH IV Year",
        "phone": "770832176"
      },
      {
        "name": "Srinidhi S",
        "department": "ECE IV Year",
        "phone": "6385434531"
      },
      {
        "name": "Nawin",
        "department": "ECE-A",
        "phone": "6385662945"
      },
      {
        "name": "Jonathan",
        "department": "MECH",
        "phone": "7598150117"
      },
      {
        "name": "Muthu Laksmi",
        "department": "CIVIL",
        "phone": "9159970274"
      },
      {
        "name": "Suba Sri",
        "department": "EEE",
        "phone": "9361046360"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "video-making",
    "slug": "video-making",
    "title": "Video Making",
    "category": "Digital Events",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-05-05",
    "start_time": "09:00",
    "end_time": "17:00",
    "venue": "GCE Campus (Submit to elexgce2026@gmail.com)",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Create an engaging cinematic or creative video of the campus atmosphere within 30 seconds.",
    "rules": [
      "Candidates should participate individually.",
      "Videos can be taken with mobile phones only.",
      "Videos should be taken only inside GCE campus.",
      "Maximum time for a video: 30 seconds.",
      "Videos should be taken in landscape mode.",
      "Evaluated based on creativity and storytelling.",
      "Submit to elexgce2026@gmail.com with format Name-Year-Department.",
      "Deadline: 05/05/2025."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. E. Mohamed Najeeb",
        "designation": "AP/CIVIL"
      },
      {
        "name": "Prof. N. Jeenath Laila",
        "designation": "AP/CSE"
      }
    ],
    "coordinators": [
      {
        "name": "Muthu Venkatesh",
        "department": "MECH IV Year",
        "phone": "770832176"
      },
      {
        "name": "Srinidhi S",
        "department": "ECE IV Year",
        "phone": "6385434531"
      },
      {
        "name": "Rakesh Sharma",
        "department": "ECE-B",
        "phone": "9585207691"
      },
      {
        "name": "Sanjay",
        "department": "CSE",
        "phone": "8825779929"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "meme-creation",
    "slug": "meme-creation",
    "title": "Meme Creation",
    "category": "Digital Events",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-05-05",
    "start_time": "09:00",
    "end_time": "17:00",
    "venue": "Online Submission (Submit to elexgce2026@gmail.com)",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Showcase your humor and wit through creative memes depicting Engineering college life.",
    "rules": [
      "Candidates should participate individually.",
      "The meme content should be about Engineering colleges.",
      "Video memes are not permitted.",
      "Files should be sent in JPEG format.",
      "The Meme must not be intended to hurt anyone in specific.",
      "Submit to elexgce2026@gmail.com with format Name-Year-Department.",
      "Deadline: 05/05/2025."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. E. Mohamed Najeeb",
        "designation": "AP/CIVIL"
      },
      {
        "name": "Prof. N. Jeenath Laila",
        "designation": "AP/CSE"
      }
    ],
    "coordinators": [
      {
        "name": "Muthu Venkatesh",
        "department": "MECH IV Year",
        "phone": "770832176"
      },
      {
        "name": "Srinidhi S",
        "department": "ECE IV Year",
        "phone": "6385434531"
      },
      {
        "name": "Aabith",
        "department": "CSE",
        "phone": "6382550569"
      },
      {
        "name": "Vallarasu",
        "department": "ECE-B",
        "phone": "6374033827"
      },
      {
        "name": "Abhina",
        "department": "EEE",
        "phone": "9384500262"
      },
      {
        "name": "Suganthi",
        "department": "CIVIL",
        "phone": "9488044575"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "certificate-designing",
    "slug": "certificate-designing",
    "title": "Certificate Designing",
    "category": "Digital Events",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-05-05",
    "start_time": "09:00",
    "end_time": "17:00",
    "venue": "Online Submission (Submit to elexgce2026@gmail.com)",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Design the official participation and merit certificate for ELYX 26.",
    "rules": [
      "Candidates should participate individually.",
      "All details regarding ELYX 26 should be included.",
      "Files should be sent in PDF or PNG format.",
      "Certificate will be selected based on design quality and aesthetic balance.",
      "If there is any change in the content of the certificate it will be informed after selection.",
      "Submit to elexgce2026@gmail.com by 05/05/2025."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. S. Supriya",
        "designation": "HOD/MECH"
      },
      {
        "name": "Dr. S. Mariraj Mohan",
        "designation": "AsP/CIVIL"
      }
    ],
    "coordinators": [
      {
        "name": "Muthu Venkatesh",
        "department": "MECH IV Year",
        "phone": "770832176"
      },
      {
        "name": "Srinidhi S",
        "department": "ECE IV Year",
        "phone": "6385434531"
      },
      {
        "name": "Vengadesan",
        "department": "CSE",
        "phone": "6380188588"
      },
      {
        "name": "Ananth",
        "department": "ECE-A",
        "phone": "6385822658"
      },
      {
        "name": "Mohana Madubala",
        "department": "EEE",
        "phone": "9344086310"
      },
      {
        "name": "Jeba Catharin",
        "department": "ECE-A",
        "phone": "9789112567"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "flex-designing",
    "slug": "flex-designing",
    "title": "Flex Designing",
    "category": "Digital Events",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-05-05",
    "start_time": "09:00",
    "end_time": "17:00",
    "venue": "Online Submission (Submit to elexgce2026@gmail.com)",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Design the official stage flex and banner for ELYX 26.",
    "rules": [
      "Candidates should participate individually.",
      "All details regarding ELYX 26 should be included such as Chief Guest Name, Event duration, and Culturals information.",
      "Files should be sent in PDF or PNG format.",
      "Flex will be selected based on design excellence.",
      "Submit to elexgce2026@gmail.com with format Name-Year-Department by 05/05/2025."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. K. Thulasimani",
        "designation": "PROF/CSE"
      },
      {
        "name": "Dr. S. Anbu Chudar Azhagan",
        "designation": "AsP/PHYSICS"
      }
    ],
    "coordinators": [
      {
        "name": "Muthu Venkatesh",
        "department": "MECH IV Year",
        "phone": "770832176"
      },
      {
        "name": "Srinidhi S",
        "department": "ECE IV Year",
        "phone": "6385434531"
      },
      {
        "name": "Kedhar A",
        "department": "CSE",
        "phone": "9597799546"
      },
      {
        "name": "Boopathi",
        "department": "CIVIL",
        "phone": "8124876926"
      },
      {
        "name": "Navaneetha Krshinan",
        "department": "MECH",
        "phone": "8608926177"
      },
      {
        "name": "Vinayagam",
        "department": "CSE",
        "phone": "8072838896"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "poetry",
    "slug": "poetry",
    "title": "Poetry (கவிதை போட்டி)",
    "category": "Literary & Arts",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-21",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-20T23:59:59",
    "description": "Express your thoughts and poetic brilliance. Topic will be given on the spot (போட்டியின் போது தலைப்பு வழங்கப்படும்).",
    "rules": [
      "Duration: 15 minutes.",
      "Paper will be provided.",
      "Mobile phones are strictly not allowed.",
      "Strictly no plagiarism."
    ],
    "faculty_incharge": [
      {
        "name": "Prof. V. Kumar",
        "designation": "AP/ENGLISH"
      },
      {
        "name": "Dr. E. Esaiarasi",
        "designation": "AP/MATHS"
      }
    ],
    "coordinators": [
      {
        "name": "Arun Kumar J",
        "department": "MECH IV Year",
        "phone": "9360850186"
      },
      {
        "name": "Kokila",
        "department": "CIVIL IV Year",
        "phone": "8072517917"
      },
      {
        "name": "Amala Akash",
        "department": "EEE",
        "phone": "80153183251"
      },
      {
        "name": "Bowsihan",
        "department": "MECH",
        "phone": "9043364977"
      },
      {
        "name": "Lakshmipriya",
        "department": "CSE",
        "phone": "9176719613"
      },
      {
        "name": "Jerlin",
        "department": "ECE-A",
        "phone": "9047788847"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "essay-writing",
    "slug": "essay-writing",
    "title": "Essay Writing (கட்டுரை போட்டி)",
    "category": "Literary & Arts",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-21",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-20T23:59:59",
    "description": "Articulate deep perspectives, analytical prowess, and eloquence on a topical theme given on the spot.",
    "rules": [
      "Duration: 30 minutes.",
      "Topic will be given on the spot.",
      "Paper will be provided.",
      "Mobile phones not allowed.",
      "Strictly no plagiarism."
    ],
    "faculty_incharge": [
      {
        "name": "Prof. S. Muthupriya",
        "designation": "AP/ENGLISH"
      },
      {
        "name": "Dr. J. Rajakumar",
        "designation": "AP/MATHS"
      }
    ],
    "coordinators": [
      {
        "name": "Senthil Murugan",
        "department": "CIVIL IV Year",
        "phone": "9384365161"
      },
      {
        "name": "Jeya Vinosha",
        "department": "CIVIL IV Year",
        "phone": "629268088"
      },
      {
        "name": "Kalaiselvan",
        "department": "MECH-A",
        "phone": "6383419411"
      },
      {
        "name": "Logesh Kumar",
        "department": "EEE",
        "phone": "8525940905"
      },
      {
        "name": "Gnana Romie",
        "department": "ECE-A",
        "phone": "8220482102"
      },
      {
        "name": "Madumitha",
        "department": "CSE",
        "phone": "9843235474"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "elocution",
    "slug": "elocution",
    "title": "Elocution (பேச்சு போட்டி)",
    "category": "Literary & Arts",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-22",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-21T23:59:59",
    "description": "Showcase your public speaking eloquence and persuasive oratory skills.",
    "rules": [
      "Duration: Maximum 5 minutes.",
      "Topic will be given on the spot.",
      "Do not carry any hints with you.",
      "Mobile phones not allowed while performing."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. N. Suresh Babu",
        "designation": "AP/CHEMISTRY"
      },
      {
        "name": "Prof. R. Meenakshi",
        "designation": "AP/PHYSICS"
      }
    ],
    "coordinators": [
      {
        "name": "Nandhini N",
        "department": "CIVIL IV Year",
        "phone": "8754681101"
      },
      {
        "name": "Anis Britto V",
        "department": "MECH IV Year",
        "phone": "9443655878"
      },
      {
        "name": "Manikandan",
        "department": "EEE",
        "phone": "7603832177"
      },
      {
        "name": "Padma",
        "department": "ECE-B",
        "phone": "7810021303"
      },
      {
        "name": "Durga",
        "department": "CSE",
        "phone": "8438801404"
      },
      {
        "name": "Hari Haran",
        "department": "CIVIL",
        "phone": "9344644058"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "drawing",
    "slug": "drawing",
    "title": "Drawing",
    "category": "Literary & Arts",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-22",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-21T23:59:59",
    "description": "Unleash your artistic imagination on canvas on a topic provided on the spot.",
    "rules": [
      "Duration: 1 Hour.",
      "Topic will be given on the spot.",
      "Pencil, crayons and paint are allowed.",
      "A3 sheet will be provided.",
      "Drawing essentials should be brought on your own.",
      "Mobile phones are not allowed."
    ],
    "faculty_incharge": [
      {
        "name": "Prof. P. Sureshkumar",
        "designation": "AP/MECH"
      },
      {
        "name": "Prof. P. Prema",
        "designation": "AP/MECH"
      }
    ],
    "coordinators": [
      {
        "name": "Shakthivelnathan",
        "department": "MECH IV Year",
        "phone": "9952624778"
      },
      {
        "name": "Abinaya",
        "department": "ECE IV Year",
        "phone": "7550387120"
      },
      {
        "name": "Thiyaga Thilipan",
        "department": "ECE-B",
        "phone": "9566733853"
      },
      {
        "name": "Jeswin Israel",
        "department": "ECE-A",
        "phone": "9486558725"
      },
      {
        "name": "Leona Amorita",
        "department": "MECH",
        "phone": "7708588899"
      },
      {
        "name": "Rani",
        "department": "CSE",
        "phone": "7397151677"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "mimicry",
    "slug": "mimicry",
    "title": "Mimicry",
    "category": "Theatre & Performance",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-23",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-22T23:59:59",
    "description": "Imitate voices, sounds, personalities, and cinematic characters with humor and precision.",
    "rules": [
      "Duration: Maximum 5 minutes.",
      "Adult contents and controversial contents are strictly not allowed.",
      "Contents that offend our college faculties are not permitted."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. A. Thangaraj",
        "designation": "AP/EEE"
      },
      {
        "name": "Dr. M. Balasubramanian",
        "designation": "AP/EEE"
      }
    ],
    "coordinators": [
      {
        "name": "Priya Dharshini",
        "department": "CSE IV Year",
        "phone": "9566473834"
      },
      {
        "name": "Mohamed Mussammil Hussain KL",
        "department": "ECE IV Year",
        "phone": "8270359561"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "adzap",
    "slug": "adzap",
    "title": "Adzap",
    "category": "Theatre & Performance",
    "participation_type": "team",
    "team_size_min": 2,
    "team_size_max": 10,
    "event_date": "2025-04-24",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-23T23:59:59",
    "description": "A comical advertisement performance where participants promote an imaginary/funny product of their choice with live voiceover.",
    "rules": [
      "Group event: Maximum number of persons allowed is 10.",
      "Duration: Maximum 10 minutes.",
      "Voiceover should be given for acting by anyone of the team members.",
      "Background audio is not allowed.",
      "Adult contents and controversial contents are not allowed."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. M. Mahil",
        "designation": "AP/CSE"
      },
      {
        "name": "Dr. D. Anitha",
        "designation": "AP/CSE"
      }
    ],
    "coordinators": [
      {
        "name": "Vishal M",
        "department": "ECE IV Year",
        "phone": "9600369796"
      },
      {
        "name": "Venu S",
        "department": "MECH IV Year",
        "phone": "8148054624"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "art-from-waste",
    "slug": "art-from-waste",
    "title": "Art from Waste",
    "category": "Craft & Design",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-25",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-24T23:59:59",
    "description": "Transform waste paper, cardboard, wood, glass, plastics, metals, and rubber into sustainable and economical works of art.",
    "rules": [
      "Duration: Maximum 45 minutes.",
      "Candidates should participate individually.",
      "Waste materials should be brought on your own.",
      "Art must be made at the given time inside the venue.",
      "All essential tools (scissors, glue, etc.) must be brought on your own."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. M. Mohamen Younus",
        "designation": "AP/CIVIL"
      },
      {
        "name": "Dr. M. Murugan",
        "designation": "AP/CIVIL"
      }
    ],
    "coordinators": [
      {
        "name": "Hemalatha AR",
        "department": "EEE IV Year",
        "phone": "9363476818"
      },
      {
        "name": "Ram Kumar K",
        "department": "ECE IV Year",
        "phone": "6369646209"
      },
      {
        "name": "Barath",
        "department": "ECE-A",
        "phone": "9360502257"
      },
      {
        "name": "Muthamil",
        "department": "MECH",
        "phone": "9342420694"
      },
      {
        "name": "Saraswathi",
        "department": "CSE",
        "phone": "9094480344"
      },
      {
        "name": "Barani",
        "department": "EEE",
        "phone": "7339555384"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "mime",
    "slug": "mime",
    "title": "Mime",
    "category": "Theatre & Performance",
    "participation_type": "team",
    "team_size_min": 2,
    "team_size_max": 10,
    "event_date": "2025-04-28",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-27T23:59:59",
    "description": "Silent performing art conveying deep stories and social messages solely through facial expressions, body movements, and gestures.",
    "rules": [
      "Duration: Maximum 10 minutes.",
      "Maximum number of persons allowed: 10.",
      "Adult contents and controversial contents are strictly not allowed.",
      "Contents that offend college faculties are strictly not permitted."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. M. Vijayaraj",
        "designation": "HOD/ECE"
      },
      {
        "name": "Dr. E. Sivaraman",
        "designation": "AsP/ECE"
      },
      {
        "name": "Prof. V. Selvakumar",
        "designation": "AP/ECE"
      }
    ],
    "coordinators": [
      {
        "name": "Magdalene Mary J",
        "department": "ECE IV Year",
        "phone": "8220620848"
      },
      {
        "name": "Surya C",
        "department": "MECH IV Year",
        "phone": "6374629452"
      },
      {
        "name": "Vijay Kumar",
        "department": "CSE",
        "phone": "6369345012"
      },
      {
        "name": "Vijay",
        "department": "ECE-B",
        "phone": "6380239097"
      },
      {
        "name": "Tamil Selvi",
        "department": "CIVIL",
        "phone": "9092264520"
      },
      {
        "name": "Swetha Lakshmi",
        "department": "EEE",
        "phone": "8825543878"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "silambam",
    "slug": "silambam",
    "title": "Silambam",
    "category": "Traditional Martial Arts",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-28",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Admin Block",
    "registration_deadline": "2025-04-27T23:59:59",
    "description": "Display traditional Tamil martial arts mastery, agile stick rotations, and rhythmic combat forms.",
    "rules": [
      "Duration: Maximum 2 minutes.",
      "Candidates should participate individually.",
      "Silambam sticks will be provided."
    ],
    "faculty_incharge": [
      {
        "name": "Prof. S. Somesh Subramanian",
        "designation": "AP/MECH"
      },
      {
        "name": "Dr. S. Ananthakumar",
        "designation": "AP/MECH"
      }
    ],
    "coordinators": [
      {
        "name": "Arul Selva Jayasurya",
        "department": "MECH IV Year",
        "phone": "9600933054"
      },
      {
        "name": "Oviya V",
        "department": "ECE IV Year",
        "phone": "9363384527"
      },
      {
        "name": "Ramkumar",
        "department": "ECE-B",
        "phone": "8015407335"
      },
      {
        "name": "Vedha Sujith",
        "department": "ECE-B",
        "phone": "6379665181"
      },
      {
        "name": "Maharaja",
        "department": "EEE",
        "phone": "9524669119"
      },
      {
        "name": "Kaviya G",
        "department": "ECE-A",
        "phone": "9487194686"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "debate",
    "slug": "debate",
    "title": "Debate",
    "category": "Literary & Arts",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-29",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-04-28T23:59:59",
    "description": "Engage in dynamic, formal debates on contemporary themes. Best individual speakers will be awarded.",
    "rules": [
      "Topic will be given on the spot.",
      "All registered participants will be divided into two groups according to preference.",
      "Participants should put forward a formal discussion under the given topic.",
      "The best speakers will be selected as individuals on the basis of their debating skills.",
      "Mobile phones not allowed.",
      "Candidates are permitted to deliver their speech in colloquial way."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. B. Paramasivam",
        "designation": "AsP/EEE"
      },
      {
        "name": "Dr. G. Balasubramanian",
        "designation": "AP/EEE"
      }
    ],
    "coordinators": [
      {
        "name": "Vignesh M",
        "department": "EEE IV Year",
        "phone": "9566642507"
      },
      {
        "name": "Swathi",
        "department": "EEE IV Year",
        "phone": "6385592581"
      },
      {
        "name": "Kishore G P",
        "department": "CSE",
        "phone": "6380658348"
      },
      {
        "name": "Vishva",
        "department": "CIVIL",
        "phone": "8610425526"
      },
      {
        "name": "Femi",
        "department": "CIVIL",
        "phone": "7708879903"
      },
      {
        "name": "Gracy",
        "department": "EEE",
        "phone": "6382488936"
      }
    ],
    "status": "registration_open",
    "featured": false
  },

  {
    "id": "drama",
    "slug": "drama",
    "title": "Drama",
    "category": "Theatre & Performance",
    "participation_type": "team",
    "team_size_min": 2,
    "team_size_max": 10,
    "event_date": "2025-05-05",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-05-04T23:59:59",
    "description": "Theatrical stage drama bringing scripts, characters, emotions, and narratives to life.",
    "rules": [
      "Duration: 15 minutes.",
      "Maximum number of persons allowed: 10.",
      "Group can be formed within your year students or along with other year students but MUST be within your department.",
      "Background audios are not allowed.",
      "Adult contents and controversial contents are not allowed.",
      "Contents that offend college faculties are strictly not permitted.",
      "Properties needed for drama should be brought on your own.",
      "Boys and Girls combined performance NOT allowed.",
      "Proper dress code should be followed."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. S. Ida Evangeline",
        "designation": "AP/EEE"
      },
      {
        "name": "Prof. A. Renaldo Maximus",
        "designation": "AP/ECE"
      }
    ],
    "coordinators": [
      {
        "name": "Abinesh",
        "department": "ECE IV Year",
        "phone": "9629525907"
      },
      {
        "name": "Dharshana",
        "department": "ECE IV Year",
        "phone": "9486062315"
      },
      {
        "name": "Rahul",
        "department": "CSE",
        "phone": "8778154886"
      },
      {
        "name": "Dinafrin Marshal",
        "department": "EEE",
        "phone": "7708489488"
      },
      {
        "name": "Kowshika",
        "department": "CIVIL",
        "phone": "9486202421"
      },
      {
        "name": "Kumudha",
        "department": "ECE-A",
        "phone": "9080862410"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "rangoli",
    "slug": "rangoli",
    "title": "Rangoli",
    "category": "Craft & Design",
    "participation_type": "team",
    "team_size_min": 1,
    "team_size_max": 4,
    "event_date": "2025-05-06",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Admin Block",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Traditional Indian floor art of vibrant patterns and symmetric geometry using colored powders.",
    "rules": [
      "Duration: Maximum 2 hours.",
      "Maximum number of people allowed: 4.",
      "Rangoli powder should be brought on your own.",
      "Chalk piece will be provided."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. I. Muthumani",
        "designation": "PROF/ECE"
      },
      {
        "name": "Dr. P. E. Irin Dorathy",
        "designation": "AP/ECE"
      }
    ],
    "coordinators": [
      {
        "name": "Gayathri KR",
        "department": "EEE IV Year",
        "phone": "8838971137"
      },
      {
        "name": "Shakthi Vignesh MS",
        "department": "MECH IV Year",
        "phone": "9489567504"
      },
      {
        "name": "Yuva Shruthi",
        "department": "CSE",
        "phone": "9345998685"
      },
      {
        "name": "Ramya K",
        "department": "ECE-B",
        "phone": "7010432609"
      },
      {
        "name": "Shifana",
        "department": "CIVIL",
        "phone": "8610010920"
      },
      {
        "name": "Abinaya",
        "department": "MECH",
        "phone": "9940993668"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "vegetable-carving",
    "slug": "vegetable-carving",
    "title": "Vegetable Carving",
    "category": "Craft & Design",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-05-07",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block & Exam Hall",
    "registration_deadline": "2025-05-06T23:59:59",
    "description": "Intricate sculptural carving into fruits and vegetables creating ornamental pieces.",
    "rules": [
      "Duration: 45 minutes.",
      "Candidates should participate individually.",
      "Vegetables and other essential items (knife, toothpick, etc.) should be brought on your own."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. M. Sabari",
        "designation": "AP/MATHS"
      },
      {
        "name": "Dr. D. Cherine",
        "designation": "AP/PHYSICS"
      }
    ],
    "coordinators": [
      {
        "name": "Alwin",
        "department": "CIVIL IV Year",
        "phone": "7305927703"
      },
      {
        "name": "Shankarammal Sabitha K",
        "department": "EEE IV Year",
        "phone": "8778099137"
      },
      {
        "name": "Sam Jenishion",
        "department": "MECH",
        "phone": "7845520405"
      },
      {
        "name": "Preethi R K",
        "department": "ECE-B",
        "phone": "9342173108"
      },
      {
        "name": "Vennila R",
        "department": "CSE",
        "phone": "8825955536"
      },
      {
        "name": "Mussamil",
        "department": "CIVIL",
        "phone": "8838299107"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "solo-singing",
    "slug": "solo-singing",
    "title": "Solo Singing",
    "category": "Music & Vocal",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-23",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Auditorium / Stage",
    "registration_deadline": "2025-04-20T23:59:59",
    "description": "Vocal solo performance showcasing melody, pitch, rhythm, and stage presence.",
    "rules": [
      "Preliminary round will be conducted based on the number of participants.",
      "Participants should be ready before 20/04/2025.",
      "There will be rehearsals.",
      "Duration: Maximum 5 minutes.",
      "Karaoke track should be submitted on or before 20/04/2025.",
      "Dancing is not permitted."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. G. Tamil Pavai",
        "designation": "HOD/CSE"
      },
      {
        "name": "Dr. J. Suganthi",
        "designation": "PROF/EEE"
      }
    ],
    "coordinators": [
      {
        "name": "Abiksha",
        "department": "EEE IV Year",
        "phone": "6380111273"
      },
      {
        "name": "Mukesh",
        "department": "MECH IV Year",
        "phone": "6381576318"
      },
      {
        "name": "Ranjith Kumar",
        "department": "ECE-B",
        "phone": "6381587076"
      },
      {
        "name": "Mugesh Kumar",
        "department": "EEE",
        "phone": "9345992247"
      },
      {
        "name": "Vishnu C M",
        "department": "ECE-B",
        "phone": "9677807367"
      },
      {
        "name": "Boomika",
        "department": "CIVIL",
        "phone": "9360805613"
      },
      {
        "name": "Hema",
        "department": "MECH",
        "phone": "8438890190"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "group-singing",
    "slug": "group-singing",
    "title": "Group Singing",
    "category": "Music & Vocal",
    "participation_type": "team",
    "team_size_min": 2,
    "team_size_max": 8,
    "event_date": "2025-04-24",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Auditorium / Stage",
    "registration_deadline": "2025-04-20T23:59:59",
    "description": "Vocal ensemble harmony, choir, or mashup rendition with vocal synchrony.",
    "rules": [
      "Preliminary round will be conducted based on the number of participants.",
      "Participants should be ready before 20/04/2025 with rehearsals.",
      "Duration: Maximum 7 minutes.",
      "Karaoke track should be submitted on 20/04/2025.",
      "Boys and Girls combined performance IS allowed.",
      "Dancing is not permitted."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. D. Jebakani",
        "designation": "PROF/MECH"
      },
      {
        "name": "Dr. A. Krishnaveni",
        "designation": "PROF/MECH"
      }
    ],
    "coordinators": [
      {
        "name": "Abiksha",
        "department": "EEE IV Year",
        "phone": "6380111273"
      },
      {
        "name": "Mukesh",
        "department": "MECH IV Year",
        "phone": "6381576318"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "solo-dance",
    "slug": "solo-dance",
    "title": "Solo Dance",
    "category": "Dance & Choreography",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-04-25",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Auditorium / Stage",
    "registration_deadline": "2025-04-22T23:59:59",
    "description": "Individual dance choreography showcasing rhythm, grace, energy, and expressions.",
    "rules": [
      "Preliminary round will be conducted based on the number of participants.",
      "Duration: Maximum 4 to 5 minutes.",
      "Dance audio must be submitted on or before 22/04/2025.",
      "Dance costume must be decent and informed to event coordinators on 22/04/2025.",
      "Boys and Girls combined performance is not allowed."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. T. Seethalakshmi",
        "designation": "AP/CIVIL"
      },
      {
        "name": "Dr. K. Padma Priya",
        "designation": "AP/ECE"
      }
    ],
    "coordinators": [
      {
        "name": "Balamurugan R",
        "department": "CSE IV Year",
        "phone": "9597810859"
      },
      {
        "name": "Amutha",
        "department": "CIVIL IV Year",
        "phone": "7339077216"
      },
      {
        "name": "Prathap",
        "department": "CSE",
        "phone": "7094234189"
      },
      {
        "name": "Deva",
        "department": "MECH",
        "phone": "6379843913"
      },
      {
        "name": "Fathima",
        "department": "ECE-A",
        "phone": "8825753153"
      },
      {
        "name": "Jotheeshwari",
        "department": "CIVIL",
        "phone": "7845293989"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "group-dance",
    "slug": "group-dance",
    "title": "Group Dance",
    "category": "Dance & Choreography",
    "participation_type": "team",
    "team_size_min": 2,
    "team_size_max": 8,
    "event_date": "2025-04-30",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Auditorium / Stage",
    "registration_deadline": "2025-04-22T23:59:59",
    "description": "High-octane group dance performance with synchronized choreographies, formations, and themes.",
    "rules": [
      "Preliminary round will be conducted based on the number of participants.",
      "Duration: Maximum 6 to 7 minutes.",
      "Maximum number of people allowed: 8.",
      "Dance audio must be submitted on or before 22/04/2025.",
      "Dance costume must be decent and informed to event coordinators on 22/04/2025.",
      "Boys and Girls combined performance is NOT allowed."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. P. Subha Karuvelam",
        "designation": "PROF/EEE"
      },
      {
        "name": "Dr. M. Gnana Sundari",
        "designation": "PROF/EEE"
      }
    ],
    "coordinators": [
      {
        "name": "Balamurugan R",
        "department": "CSE IV Year",
        "phone": "9597810859"
      },
      {
        "name": "Amutha",
        "department": "CIVIL IV Year",
        "phone": "7339077216"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "instrument-playing",
    "slug": "instrument-playing",
    "title": "Instrument Playing",
    "category": "Music & Vocal",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 4,
    "event_date": "2025-04-29",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Exam Hall",
    "registration_deadline": "2025-04-27T23:59:59",
    "description": "Live musical instrument performance displaying melody, technique, chords, or percussion rhythms.",
    "rules": [
      "Preliminary round will be conducted based on the number of participants.",
      "Duration: Maximum 4 minutes.",
      "Any instrument is allowed (Keyboard, Guitar, Violin, Drums, Flute, Mridangam, etc.).",
      "Boys and Girls combined performance allowed.",
      "Usage of any recorded audios is strictly not allowed."
    ],
    "faculty_incharge": [
      {
        "name": "Dr. J. John",
        "designation": "AsP/MATHS"
      },
      {
        "name": "Dr. S. Sophie Beulah",
        "designation": "AsP/CHEMISTRY"
      }
    ],
    "coordinators": [
      {
        "name": "Nesan Paul",
        "department": "ECE IV Year",
        "phone": "7092481555"
      },
      {
        "name": "Kulasekara Lakshmi",
        "department": "CIVIL IV Year",
        "phone": "9344575074"
      },
      {
        "name": "Seshu Ganesh",
        "department": "ECE-B",
        "phone": "9629956042"
      },
      {
        "name": "Kannan S P",
        "department": "CSE",
        "phone": "9344889051"
      },
      {
        "name": "Aathi Kesavan",
        "department": "CIVIL",
        "phone": "9342456754"
      },
      {
        "name": "Maridhas",
        "department": "ECE-A",
        "phone": "7305798505"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "fireless-cooking",
    "slug": "fireless-cooking",
    "title": "Fireless Cooking",
    "category": "Culinary & Lifestyle",
    "participation_type": "team",
    "team_size_min": 1,
    "team_size_max": 2,
    "event_date": "2025-05-02",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block",
    "registration_deadline": "2025-05-01T23:59:59",
    "description": "Prepare delicious, nutritious, and innovative culinary dishes without any thermal heating or flame.",
    "rules": [
      "No electric appliances or stove flames allowed.",
      "Ingredients must be brought by the participants.",
      "Cleanliness and presentation will be judged.",
      "Time limit: 45 minutes."
    ],
    "faculty_incharge": [
      {
        "name": "Faculty Incharge",
        "designation": "Fine Arts Association"
      }
    ],
    "coordinators": [
      {
        "name": "Veera Bharathi",
        "department": "EEE",
        "phone": "6385657637"
      },
      {
        "name": "Jenowin",
        "department": "CIVIL",
        "phone": "9042514044"
      },
      {
        "name": "Akshya",
        "department": "CSE",
        "phone": "6379548209"
      },
      {
        "name": "Pavithra",
        "department": "ECE-B",
        "phone": "9360783773"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "quiz",
    "slug": "quiz",
    "title": "General & Cultural Quiz",
    "category": "Literary & Arts",
    "participation_type": "team",
    "team_size_min": 2,
    "team_size_max": 2,
    "event_date": "2025-04-26",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "Exam Hall",
    "registration_deadline": "2025-04-25T23:59:59",
    "description": "Test your intellect, pop culture, Tamil heritage, art, history, and current affairs knowledge.",
    "rules": [
      "Team of 2 members.",
      "Preliminary written round followed by buzzer finals.",
      "Mobile phones strictly prohibited during the quiz."
    ],
    "faculty_incharge": [
      {
        "name": "Faculty Incharge",
        "designation": "Fine Arts Association"
      }
    ],
    "coordinators": [
      {
        "name": "Aravind",
        "department": "CIVIL",
        "phone": "9442981307"
      },
      {
        "name": "Mohammed",
        "department": "MECH",
        "phone": "9952507669"
      },
      {
        "name": "Santhiya",
        "department": "CSE",
        "phone": "6381764603"
      },
      {
        "name": "Akshaya",
        "department": "EEE",
        "phone": "7904632928"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "treasure-hunt",
    "slug": "treasure-hunt",
    "title": "Treasure Hunt",
    "category": "Adventure & Fun",
    "participation_type": "team",
    "team_size_min": 3,
    "team_size_max": 4,
    "event_date": "2025-05-03",
    "start_time": "14:30",
    "end_time": "17:00",
    "venue": "Campus Grounds",
    "registration_deadline": "2025-05-02T23:59:59",
    "description": "Decipher cryptic clues, solve riddles, and navigate across campus grounds to uncover the final prize.",
    "rules": [
      "Team size: 3-4 members.",
      "All clues must be retrieved in sequential order.",
      "Disruption to classes or campus property leads to instant disqualification."
    ],
    "faculty_incharge": [
      {
        "name": "Faculty Incharge",
        "designation": "Fine Arts Association"
      }
    ],
    "coordinators": [
      {
        "name": "Siva Sankar",
        "department": "CSE",
        "phone": "7010328022"
      },
      {
        "name": "Hari Pranav",
        "department": "CIVIL",
        "phone": "9384455155"
      },
      {
        "name": "Beautlin",
        "department": "EEE",
        "phone": "8883260365"
      },
      {
        "name": "Pavithra",
        "department": "CSE",
        "phone": "9597910333"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "mehendi",
    "slug": "mehendi",
    "title": "Mehendi Designing",
    "category": "Craft & Design",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 2,
    "event_date": "2025-05-06",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Showcase intricate henna body art, Arabic patterns, and traditional Indian bridal designs.",
    "rules": [
      "Participant may bring one model on whose hand henna is applied.",
      "Mehendi cones must be brought by the participants.",
      "Pre-drawn patterns or stencils are strictly prohibited.",
      "Time duration: 1 hour."
    ],
    "faculty_incharge": [
      {
        "name": "Faculty Incharge",
        "designation": "Fine Arts Association"
      }
    ],
    "coordinators": [
      {
        "name": "Nandhini",
        "department": "CSE",
        "phone": "9894179538"
      },
      {
        "name": "Sumu Priya",
        "department": "MECH",
        "phone": "9361191642"
      },
      {
        "name": "Thilai Bala",
        "department": "CIVIL",
        "phone": "8610123913"
      },
      {
        "name": "Rasinath Jamroon",
        "department": "ECE-B",
        "phone": "7418002264"
      }
    ],
    "status": "registration_open",
    "featured": false
  },
  {
    "id": "fashion-show",
    "slug": "fashion-show",
    "title": "Fashion Show / Traditional Walk",
    "category": "Theatre & Performance",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 1,
    "event_date": "2025-05-08",
    "start_time": "15:00",
    "end_time": "17:30",
    "venue": "College Auditorium",
    "registration_deadline": "2025-05-06T23:59:59",
    "description": "Celebrate Indian cultural diversity, ethnic elegance, and thematic runway walks.",
    "rules": [
      "Team size: 4 - 10 members.",
      "Strict adherence to college dress code: vulgarity or indecent costumes will result in immediate disqualification.",
      "Soundtrack must be submitted 2 days in advance.",
      "Performance duration: 7 minutes."
    ],
    "faculty_incharge": [
      {
        "name": "Faculty Incharge",
        "designation": "Fine Arts Association"
      }
    ],
    "coordinators": [
      {
        "name": "Shrivarsan",
        "department": "ECE-B",
        "phone": "9360998412"
      },
      {
        "name": "Durgesh Ramkumar",
        "department": "ECE-A",
        "phone": "9025565520"
      },
      {
        "name": "Dhanush",
        "department": "MECH",
        "phone": "9025385431"
      },
      {
        "name": "Jeswn",
        "department": "EEE",
        "phone": "9385716377"
      }
    ],
    "status": "registration_open",
    "featured": true
  },
  {
    "id": "talent-hunt",
    "slug": "talent-hunt",
    "title": "Talent Hunt",
    "category": "Theatre & Performance",
    "participation_type": "individual",
    "team_size_min": 1,
    "team_size_max": 2,
    "event_date": "2025-05-07",
    "start_time": "15:00",
    "end_time": "17:00",
    "venue": "SSS Block / Auditorium",
    "registration_deadline": "2025-05-05T23:59:59",
    "description": "Any unique, extraordinary skill—beatboxing, magic, juggling, stand-up, speed art, or unique instrument.",
    "rules": [
      "Performance time: 3-5 minutes.",
      "Props must be brought by the participant.",
      "Hazardous materials or fire are strictly banned."
    ],
    "faculty_incharge": [
      {
        "name": "Faculty Incharge",
        "designation": "Fine Arts Association"
      }
    ],
    "coordinators": [
      {
        "name": "Maheshwaran",
        "department": "CIVIL",
        "phone": "7904288968"
      },
      {
        "name": "Shyam Roshan",
        "department": "ECE-B",
        "phone": "7010971796"
      },
      {
        "name": "Absal",
        "department": "CSE",
        "phone": "8838669760"
      },
      {
        "name": "Swetha",
        "department": "CIVIL",
        "phone": "8248814895"
      }
    ],
    "status": "registration_open",
    "featured": false
  }
];

export const OVERALL_COORDINATORS: Coordinator[] = [
  {
    "name": "Nakul",
    "department": "MECH-A",
    "phone": "7530042159",
    "role": "Overall Coordinator"
  },
  {
    "name": "Hari Sankar",
    "department": "ECE-A",
    "phone": "9360807695",
    "role": "Overall Coordinator"
  },
  {
    "name": "Sanil Kumar",
    "department": "ECE-B",
    "phone": "9042544654",
    "role": "Overall Coordinator"
  },
  {
    "name": "Pavinthiran",
    "department": "CSE",
    "phone": "9655374901",
    "role": "Overall Coordinator"
  },
  {
    "name": "Pawan Kumar",
    "department": "EEE",
    "phone": "9361485724",
    "role": "Overall Coordinator"
  },
  {
    "name": "Shasidharan",
    "department": "MECH-B",
    "phone": "9361794341",
    "role": "Overall Coordinator"
  },
  {
    "name": "Loga Dhanush",
    "department": "CIVIL",
    "phone": "9344796313",
    "role": "Overall Coordinator"
  }
];

export const COMMITTEES: Committee[] = [
  {
    "name": "Invitation preparation and Distribution Committee",
    "members": [
      {
        "name": "Vishva",
        "department": "CIVIL",
        "phone": "8610425526"
      },
      {
        "name": "Kiran Jothi",
        "department": "EEE",
        "phone": "6374842921"
      },
      {
        "name": "Deva",
        "department": "MECH",
        "phone": "6379843913"
      },
      {
        "name": "Suganthi",
        "department": "CIVIL",
        "phone": "9488044575"
      },
      {
        "name": "Mamathi Dhas",
        "department": "CIVIL",
        "phone": "6383960164"
      }
    ]
  },
  {
    "name": "Banner and Certificate Printing Committee",
    "members": [
      {
        "name": "Kedhar",
        "department": "CSE",
        "phone": "9597799546"
      },
      {
        "name": "Iyappan",
        "department": "ECE-A",
        "phone": "7538814967"
      },
      {
        "name": "Mussamil",
        "department": "CIVIL",
        "phone": "8838299107"
      }
    ]
  },
  {
    "name": "Reception Committee",
    "members": [
      {
        "name": "Monika",
        "department": "ECE",
        "phone": "6383509437"
      },
      {
        "name": "Sankari",
        "department": "ECE",
        "phone": "9443531529"
      },
      {
        "name": "Barani N",
        "department": "EEE",
        "phone": "7339555384"
      },
      {
        "name": "Swetha Lakshmi",
        "department": "EEE",
        "phone": "8825543878"
      },
      {
        "name": "Akshaya",
        "department": "EEE",
        "phone": "7904632928"
      }
    ]
  },
  {
    "name": "Auditorium Hall and Arrangement Committee",
    "members": [
      {
        "name": "Jotheeswari",
        "department": "CIVIL",
        "phone": "7845293989"
      },
      {
        "name": "Abdulla",
        "department": "MECH",
        "phone": "7871574585"
      },
      {
        "name": "Amala Akash",
        "department": "EEE",
        "phone": "8015318251"
      },
      {
        "name": "Kishore",
        "department": "CSE",
        "phone": "6380658348"
      },
      {
        "name": "Remi Edwin",
        "department": "CIVIL",
        "phone": "9677221177"
      }
    ]
  },
  {
    "name": "Power Supply Arrangement Committee",
    "members": [
      {
        "name": "Pawan",
        "department": "EEE",
        "phone": "9361485724"
      },
      {
        "name": "Mugesh Kumar",
        "department": "EEE",
        "phone": "9345992247"
      },
      {
        "name": "Vinothini",
        "department": "EEE",
        "phone": "9786356135"
      }
    ]
  },
  {
    "name": "Chief Arrangement Committee",
    "members": [
      {
        "name": "Ganthan",
        "department": "CSE",
        "phone": "8190804948"
      },
      {
        "name": "Sanil",
        "department": "ECE",
        "phone": "9042544654"
      },
      {
        "name": "Thillai Bala",
        "department": "CIVIL",
        "phone": "8610123913"
      },
      {
        "name": "Swetha",
        "department": "CIVIL",
        "phone": "8248814895"
      },
      {
        "name": "Kiran Jothi",
        "department": "EEE",
        "phone": "6374842921"
      }
    ]
  },
  {
    "name": "Refreshment Arrangement Committee",
    "members": [
      {
        "name": "Mari Eshwar",
        "department": "ECE-A",
        "phone": "9092825147"
      },
      {
        "name": "Kabilan R",
        "department": "EEE",
        "phone": "6382376593"
      },
      {
        "name": "Thiyaga Thilipan",
        "department": "ECE-B",
        "phone": "9566733853"
      },
      {
        "name": "Loga Dhanush S",
        "department": "CIVIL",
        "phone": "9344796313"
      }
    ]
  },
  {
    "name": "Photography and Video Arrangement Committee",
    "members": [
      {
        "name": "Esaki Shanmugam",
        "department": "CSE",
        "phone": "9442706048"
      },
      {
        "name": "Maheshwaran",
        "department": "CIVIL",
        "phone": "7904288968"
      },
      {
        "name": "Jonathan",
        "department": "MECH",
        "phone": "7598150117"
      },
      {
        "name": "Sam",
        "department": "CSE",
        "phone": "80724066992"
      }
    ]
  },
  {
    "name": "Student Discipline and Crowd management Committee",
    "members": [
      {
        "name": "Kanisk",
        "department": "CSE",
        "phone": "9487169629"
      },
      {
        "name": "Manoj",
        "department": "ECE-A",
        "phone": "7871179650"
      },
      {
        "name": "Dino",
        "department": "EEE",
        "phone": "7708489488"
      },
      {
        "name": "Subash",
        "department": "CIVIL",
        "phone": "8489638803"
      },
      {
        "name": "Murugan",
        "department": "MECH",
        "phone": "9629769575"
      }
    ]
  },
  {
    "name": "Certificate and Prize Distribution Committee",
    "members": [
      {
        "name": "Kaviya",
        "department": "ECE-A",
        "phone": "9487194686"
      },
      {
        "name": "Jerona",
        "department": "ECE-A",
        "phone": "9384980739"
      },
      {
        "name": "Santhya",
        "department": "CSE",
        "phone": "6381764603"
      },
      {
        "name": "Nanthini",
        "department": "CSE",
        "phone": "9894179538"
      }
    ]
  },
  {
    "name": "Cultural Events and Program Coordination Committee",
    "members": [
      {
        "name": "Harsha Varthini",
        "department": "ECE-A",
        "phone": "6383370780"
      },
      {
        "name": "Munawara",
        "department": "CSE",
        "phone": "9042029866"
      },
      {
        "name": "Ramsan Safrin",
        "department": "CSE",
        "phone": "9790870905"
      },
      {
        "name": "Gomathi Ambika",
        "department": "CSE",
        "phone": "7826075758"
      },
      {
        "name": "Femi",
        "department": "CIVIL",
        "phone": "7708879903"
      }
    ]
  },
  {
    "name": "Media and News report Committee",
    "members": [
      {
        "name": "Ariprasath",
        "department": "ECE-A",
        "phone": "9994353825"
      },
      {
        "name": "Rakesh Sharma",
        "department": "ECE-B",
        "phone": "9585207691"
      },
      {
        "name": "Aabith",
        "department": "CSE",
        "phone": "6382550569"
      }
    ]
  }
];

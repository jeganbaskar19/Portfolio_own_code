// ============================================================
// MASTER DATA CONFIGURATION
// Every string, number and list rendered on the site comes from
// this file. Edit freely — no component contains hardcoded copy.
// ============================================================

export const personal = {
  name: 'Jegan Baskar',
  firstName: 'Jegan',
  role: 'Associate Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'Ruby on Rails Developer',
    'Java & Spring Boot Developer',
    'React.js Developer'
  ],
  tagline: 'I fix what\'s broken and build what\'s missing — one clean commit at a time.',
  greeting: "Hi, I'm",
  shortDescription:
    "Associate Full Stack Developer with hands-on experience across Ruby on Rails, JavaScript, Python, Java, Spring Boot and React.js. I diagnose and fix production bugs, build responsive screens end-to-end, and write internal tooling that makes teams faster — still early in my career, but I show up and figure things out.",
  availability: {
    status: 'available',
    label: 'Open to new opportunities & Freelance Projects'
  },
  location: 'Coimbatore, Tamil Nadu, India',
  resumeUrl: '/resume.pdf',
  profileImage: '/profile.jpg',
  quote: {
    text: "Great software isn't written.\nIt's debugged, refined, and shipped.",
    author: 'Jegan Baskar'
  }
};

export const hero = {
  eyebrow: 'Full Stack · Early Career, Fast Learner',
  headline: personal.name,
  subheadline: personal.role,
  description: personal.shortDescription,
  ctaPrimary: { label: 'Download Resume', href: personal.resumeUrl, type: 'resume' },
  ctaSecondary: { label: 'Get in Touch', href: '#contact', type: 'scroll' },
  stats: [
    { id: 'experience', label: 'Months Experience', value: 8, suffix: '+' },
    { id: 'projects', label: 'Projects Built', value: 8, suffix: '' },
    { id: 'certifications', label: 'Certifications', value: 3, suffix: '' },
    { id: 'companies', label: 'Companies Worked', value: 2, suffix: '' }
  ]
};

export const about = {
  eyebrow: 'About Me',
  title: 'The person behind the pull requests',
  intro:
    "I'm an early-career full stack developer working across Ruby on Rails, JavaScript, Java and Spring Boot — currently focused on production bug fixes and new feature screens at a healthcare analytics company.",
  story: [
    "My day-to-day is spent inside a Ruby on Rails codebase, tracking down production bugs, updating controller logic to match changing business requirements, and handling the JavaScript-side validations and UI interactions that go with them. I've also built new application screens from scratch using JavaScript, HTML5 and CSS3 — with no one holding my hand through it.",
    "Before this, I interned as a Java Full Stack Developer, where I built application modules with Spring Boot and React.js, designed MySQL schemas, and wired up REST APIs between frontend and backend. That's where I first got comfortable working across the whole stack instead of just one layer.",
    "I'm still early in my career — 8 months of hands-on professional experience — and I'm upfront about that. What I bring is a fast learning curve, a habit of actually reading the error before guessing at a fix, and a track record of picking up production issues and getting them resolved."
  ],
  highlights: [
    { id: 'h1', label: 'Current focus', value: 'Ruby on Rails + JavaScript' },
    { id: 'h2', label: 'Also comfortable in', value: 'Java, Spring Boot, React.js' },
    { id: 'h3', label: 'Database work', value: 'MySQL schema design & query optimisation' },
    { id: 'h4', label: 'Working style', value: 'Debug first, then build' }
  ],
  technologies: {
    frontend: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
    backend: ['Ruby on Rails', 'Java', 'Spring Boot', 'Python'],
    database: ['MySQL', 'MongoDB', 'Relational Database Design', 'Query Optimisation'],
    devops: ['Git', 'GitHub'],
    cloud: [],
    tools: ['Postman', 'VS Code', 'REST API Testing']
  }
};

export const experience = {
  eyebrow: 'Work Experience',
  title: 'Where the work has happened',
  items: [
    {
      id: 'exp-baltimore',
      company: 'Baltimore Health Analytics',
      logo: null,
      role: 'Associate Full Stack Developer',
      duration: 'Oct 2025 — Present',
      location: 'Coimbatore, India',
      description:
        'Working across a Ruby on Rails backend and JavaScript frontend, fixing production bugs, updating business logic, and building new UI screens.',
      responsibilities: [
        'Diagnose and resolve production-level bugs across the Ruby on Rails backend and JavaScript frontend',
        'Implement controller-level changes and update business logic in Rails to meet evolving requirements',
        'Handle JavaScript frontend validations and dynamic UI interactions tied to those changes',
        'Independently design and build new application screens using JavaScript, HTML5 and CSS3',
        'Write Python scripts and internal tools to streamline team workflows',
        'Integrate REST APIs between frontend and backend, with consistent error handling',
        'Participate in sprint planning, daily standups and code reviews in an agile team'
      ],
      achievements: [],
      technologies: ['Ruby on Rails', 'JavaScript', 'Python', 'HTML5', 'CSS3', 'REST APIs']
    }
  ]
};

export const internships = {
  eyebrow: 'Internships',
  title: 'Early hands-on experience',
  items: [
    {
      id: 'int-1',
      company: 'Xplore IT Corp',
      logo: null,
      role: 'Java Full Stack Developer Intern',
      duration: 'Mar 2025 — Jul 2025',
      certificateUrl: null,
      description:
        'Built and maintained full stack modules using Java, Spring Boot and React.js, designed MySQL schemas, and integrated REST APIs — my first real exposure to working the full stack in a team setting.',
      skills: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'HTML5', 'CSS3', 'JavaScript']
    }
  ]
};

export const academics = {
  eyebrow: 'Academics',
  title: 'Education Timeline',
  items: [
    {
      id: 'acad-1',
      degree: 'B.E. Computer Science and Engineering',
      college: 'Arjun College of Technology, Coimbatore',
      duration: '2021 — 2025',
      cgpa: '70% (CGPA 7.0)',
      achievements: [],
      subjects: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'Database Management Systems',
        'Computer Networks'
      ],
      awards: []
    },
    {
      id: 'acad-2',
      degree: 'Higher Secondary (XII) – Bio-Maths',
      college: 'AKT Academy Matric Higher Secondary School, Kallakurichi',
      duration: '2020 — 2021',
      cgpa: '90%',
      achievements: [
        'Secured 90% in Higher Secondary Examination'
      ],
      subjects: [
        'Mathematics',
        'Biology',
        'Physics',
        'Chemistry'
      ],
      awards: []
    },
    {
      id: 'acad-3',
      degree: 'Secondary School (X)',
      college: 'AKT Memorial High School, Kallakurichi',
      duration: '2018 — 2019',
      cgpa: '92%',
      achievements: [
        'Secured 92% in Secondary School Examination'
      ],
      subjects: [
        'Mathematics',
        'Science',
        'English',
        'Social Science'
      ],
      awards: []
    }
  ]
};

export const skillsSection = {
  eyebrow: 'Skills & Tech',
  title: 'Technical Skills',
  description:
    'Technologies and tools I use to build scalable, responsive and modern applications.'
};

export const technicalSkills = [
  // Programming Languages
  { name: 'Java', icon: 'FaJava', category: 'Programming Languages', color: '#ED8B00' },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'Programming Languages', color: '#F7DF1E' },
  { name: 'Python', icon: 'SiPython', category: 'Programming Languages', color: '#3776AB' },
  { name: 'Ruby', icon: 'SiRuby', category: 'Programming Languages', color: '#CC342D' },
  { name: 'HTML5', icon: 'SiHtml5', category: 'Programming Languages', color: '#E34F26' },
  { name: 'CSS3', icon: 'FaCss3Alt', category: 'Programming Languages', color: '#1572B6' },

  // Frontend
  { name: 'React.js', icon: 'SiReact', category: 'Frontend', color: '#61DAFB' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'Frontend', color: '#06B6D4' },
  { name: 'Bootstrap', icon: 'SiBootstrap', category: 'Frontend', color: '#7952B3' },
  { name: 'Responsive Design', icon: 'FaMobileAlt', category: 'Frontend', color: '#00BCD4' },

  // Backend
  { name: 'Ruby on Rails', icon: 'SiRubyonrails', category: 'Backend', color: '#CC0000' },
  { name: 'Spring Boot', icon: 'SiSpringboot', category: 'Backend', color: '#6DB33F' },
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'Backend', color: '#5FA04E' },
  { name: 'REST API', icon: 'FaServer', category: 'Backend', color: '#009688' },
  { name: 'Servlets & JSP', icon: 'FaServer', category: 'Backend', color: '#FF9800' },

  // Database
  { name: 'MySQL', icon: 'SiMysql', category: 'Database', color: '#4479A1' },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'Database', color: '#47A248' },
  { name: 'JDBC', icon: 'FaDatabase', category: 'Database', color: '#F29111' },
  { name: 'Relational DB / SQL', icon: 'FaDatabase', category: 'Database', color: '#336791' },

  // Tools
  { name: 'Git', icon: 'SiGit', category: 'Tools', color: '#F05032' },
  { name: 'GitHub', icon: 'SiGithub', category: 'Tools', color: '#6e5494' },
  { name: 'Postman', icon: 'SiPostman', category: 'Tools', color: '#FF6C37' },
  { name: 'VS Code', icon: 'VscVscode', category: 'Tools', color: '#007ACC' },
  { name: 'IntelliJ IDEA', icon: 'SiIntellijidea', category: 'Tools', color: '#FE315D' },
  { name: 'Eclipse', icon: 'SiEclipseide', category: 'Tools', color: '#2C2255' },

  // Concepts
  { name: 'OOP', icon: 'FaCube', category: 'Concepts', color: '#9C27B0' },
  { name: 'MVC Architecture', icon: 'FaLayerGroup', category: 'Concepts', color: '#E0A458' },
  { name: 'Authentication', icon: 'FaLock', category: 'Concepts', color: '#E91E63' },
  { name: 'Algorithms & DS', icon: 'FaCode', category: 'Concepts', color: '#3F51B5' }
];

export const projects = {
  eyebrow: 'Projects',
  title: 'Things I have built',
  filters: ['All', 'React', 'Spring Boot', 'Full Stack'],
  items: [
    {
      id: 'proj-1',
      title: 'Hotel Room Booking System',
      image: '/portfolio-previpng',
      images: ['/Hotel.png'],
      category: ['Spring Boot', 'Full Stack'],
      description:
        'A full-stack hotel booking application covering the complete booking lifecycle — room browsing, booking creation, cancellation, and real-time availability tracking.',
      stack: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
      features: [
        'REST APIs for booking creation, cancellation and availability tracking',
        'Real-time room status management',
        'Responsive booking interface with optimised database queries'
      ],
      githubUrl: "https://github.com/jeganbaskar19/HotelRoomFullStack-Frontend-Backend-",
      liveUrl: null
    },
    {
      id: 'proj-2',
      title: 'My Task Manager Application',
      image: '/portfolio-preview.png',
      images: ['/Task.png'],
      category: ['Spring Boot', 'Full Stack'],
      description:
        'A task management system with complete CRUD functionality — task creation, editing, status updates and completion tracking.',
      stack: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
      features: [
        'REST APIs for task creation, editing and status updates',
        'Structured data flow between frontend and backend',
        'Clean, responsive UI with optimised query performance'
      ],
      githubUrl: "https://github.com/jeganbaskar19/MyTaskManager",
      liveUrl: null
    },
    {
      id: 'proj-3',
      title: 'This Portfolio',
      image: '/portfolio-preview.png',
      images: ['/portfolio-preview.png'],
      category: ['React'],
      description:
        'A from-scratch React + Vite portfolio, built with every section driven entirely by configuration files.',
      stack: ['React', 'Vite', 'JavaScript'],
      features: [
        'Fully config-driven content — zero hardcoded copy in components',
        'Light/dark theme system',
        'Responsive layout across devices'
      ],
      githubUrl:'https://github.com/jeganbaskar19/Portfolio_own_code',
      liveUrl: 'https://www.jeganbaskar.in/'
    },
    {
      id: 'proj-4',
      title: 'Real-Time Chat Application',
      image: '/github-preview.png',
      images: ['/chat.png'],
      category: ['Spring Boot', 'Full Stack'],
      description:
        'A full-stack real-time chat app with JWT authentication, live messaging, typing indicators and online presence — built with Spring Boot, React and Socket.IO.',
      stack: ['Java', 'Spring Boot', 'React.js', 'Node.js', 'Socket.IO', 'MySQL'],
      features: [
        'JWT-based authentication and role-based access',
        'Real-time messaging with typing indicators and online presence via Socket.IO',
        'Persistent chat history stored in MySQL'
      ],
      githubUrl: 'https://github.com/jeganbaskar19/ChatApp-RealTime-',
      liveUrl: null
    },
    {
      id: 'proj-5',
      title: 'Tech Skill Visualizer',
      image: '/github-preview.png',
      images: ['/Skill.png'],
      category: ['React'],
      description:
        'An interactive React app that visualizes technical skills through filterable Bar, Doughnut and Radar charts, with a full skill editor and JSON import/export.',
      stack: ['React', 'Vite', 'Chart.js', 'JavaScript'],
      features: [
        'Switchable Bar / Doughnut / Radar chart views with category filtering',
        'Skill editor with proficiency sliders and category tagging',
        'JSON export/import for backing up and restoring skill data'
      ],
      githubUrl: 'https://github.com/jeganbaskar19/SkillVisualizer-React-',
      liveUrl: "https://skillvisualizer.netlify.app/"
    },
    {
      id: 'proj-6',
      title: 'Quiz Application',
      image: '/github-preview.png',
      images: ['/Quiz.png'],
      category: ['Spring Boot', 'Full Stack'],
      description:
        'A full-stack quiz platform where users log in to attempt quizzes and view their scores, while admins manage the question bank with full CRUD control.',
      stack: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
      features: [
        'User login, quiz attempts and score tracking',
        'Admin panel to add and update quiz questions',
        'Full CRUD operations across the question bank'
      ],
      githubUrl: 'https://github.com/jeganbaskar19/QuizApp-Frontend-Backend-',
      liveUrl: null
    },
    {
      id: 'proj-7',
      title: 'Library Management System',
      image: '/github-preview.png',
      images: ['/Librarry.png'],
      category: ['Spring Boot', 'Full Stack'],
      description:
        'A full-stack library management application for handling the complete book lifecycle — adding, updating, listing and removing books from the catalog.',
      stack: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
      features: [
        'Full CRUD operations for the book catalog',
        'REST API communication between frontend and backend',
        'Clean interface for managing inventory at scale'
      ],
      githubUrl: 'https://github.com/jeganbaskar19/LibraryManagement-frontend-Backend-',
      liveUrl: null
    },
    {
      id: 'proj-8',
      title: 'Balaji PG — Hostel Booking Website',
      image: '/instagram-preview.png',
      images: ['/Task.png'],
      category: ['React'],
      description:
        'A client-commissioned frontend website for a paying-guest accommodation in Coimbatore, built to give the property an online presence for prospective tenants.',
      stack: ['React', 'Vite', 'JavaScript', 'CSS3'],
      features: [
        'Property showcase with room details and contact info',
        'Responsive, modern client-facing design',
        'Delivered as a freelance/client project'
      ],
      githubUrl: 'https://github.com/jeganbaskar19/balaji-pg',
      liveUrl: null
    }
  ]
};

export const certifications = {
  eyebrow: 'Certifications',
  title: 'Continuous learning',
  items: [
    { id: 'cert-1', title: 'Fundamentals of Generative AI', issuer: 'Microsoft', year: '2025', url: null },
    { id: 'cert-2', title: 'AI Tools Workshop', issuer: 'BE10X', year: '2025', url: null },
    { id: 'cert-3', title: 'Build Your Own Generative AI App', issuer: 'NxtWave', year: '2025', url: null }
  ]
};

export const socials = [
  { id: 'github', label: 'GitHub', icon: 'github', 
    url: 'https://github.com/jeganbaskar19',
    previewImage: '/github-preview.png'
  },
  {
    id: 'linkedin', label: 'LinkedIn', icon: 'linkedin',
    url: 'https://www.linkedin.com/in/jegan2705/',
    previewImage: '/linked-in-preview.png'
  },
  {
    id: 'portfolio', label: 'Live Portfolio', icon: 'globe',
    url: 'https://www.jeganbaskar.in/#home',
    previewImage: '/portfolio-preview.png'
  },
  {
    id: 'instagram', label: 'Instagram', icon: 'instagram',
    url: 'https://www.instagram.com/jegan.__.stark/',
    previewImage: '/instagram-preview.png'
  },
];

export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something reliable",
  description:
    "Whether it's a bug that needs fixing, a screen that needs building, or a small full-stack project — I'd like to hear about it.",
  email: 'hello@jeganbaskar.in',
  phone: '+91 78450 09566',
  location: personal.location,
  availability: personal.availability.label,
  formLabels: {
    name: 'Your Name',
    email: 'Your Email',
    subject: 'Subject',
    message: 'Message',
    submit: 'Send Message',
    sending: 'Sending…',
    success: 'Message sent — thank you! I will get back to you soon.',
    error: 'Something went wrong. Please try again or email me directly.'
  }
};

export const footer = {
  logoText: personal.name,
  copyright: `© ${new Date().getFullYear()} ${personal.name}. All rights reserved.`,
  backToTopLabel: 'Back to top'
};

export const quotes = [
  { id: 'q1', text: "Great software isn't written.\nIt's debugged, refined, and shipped.", author: 'Jegan Baskar' },
  { id: 'q2', text: 'A clean diff is a form of respect for the next reader.', author: 'Jegan Baskar' }
];

export const seo = {
  title: `${personal.name} — ${personal.role}`,
  description: personal.shortDescription,
  keywords: ['Full Stack Developer', 'Ruby on Rails', 'Java', 'Spring Boot', 'React.js', 'JavaScript'],
  ogImage: '/og-cover.png'
};

export const animations = {
  pageTransitionDuration: 0.6,
  sectionRevealDuration: 0.8,
  staggerChildren: 0.08,
  counterDuration: 1.8,
  reduceMotionRespected: true
};

export const navigation = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'internships', label: 'Internships', href: '#internships' },
  { id: 'academics', label: 'Academics', href: '#academics' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

export default {
  personal,
  hero,
  about,
  experience,
  internships,
  academics,
  skillsSection,
  technicalSkills,
  projects,
  certifications,
  socials,
  contact,
  footer,
  quotes,
  seo,
  animations,
  navigation
};
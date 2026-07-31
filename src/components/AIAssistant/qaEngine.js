// ============================================================
// Q&A ENGINE
// A small keyword-matching engine that answers visitor questions
// using only src/data.js. No API key, no server, no cost —
// safe to leave running on a public domain forever.
// ============================================================
import {
  personal,
  about,
  experience,
  internships,
  academics,
  projects,
  certifications,
  contact,
  socials
} from '../../data';

const list = (arr) => arr.join(', ');

const topics = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon'],
    answer: () =>
      `Hey! I'm ${personal.firstName}'s AI. Ask me about his skills, work experience, projects, education or how to reach him.`
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thx', 'appreciate'],
    answer: () => "You're welcome! Anything else you'd like to know?"
  },
  {
    id: 'skills-frontend',
    keywords: ['frontend', 'front-end', 'front end', 'ui skill', 'react'],
    answer: () => `Frontend: ${list(about.technologies.frontend)}.`
  },
  {
    id: 'skills-backend',
    keywords: ['backend', 'back-end', 'back end', 'server side', 'rails', 'ruby', 'spring', 'java'],
    answer: () => `Backend: ${list(about.technologies.backend)}.`
  },
  {
    id: 'skills-database',
    keywords: ['database', 'sql', 'mysql', 'mongo', 'db'],
    answer: () => `Database: ${list(about.technologies.database)}.`
  },
  {
    id: 'skills',
    keywords: ['skill', 'tech', 'stack', 'language', 'technolog', 'know', 'proficient', 'tools', 'expert'],
    answer: () =>
      `Core stack — Frontend: ${list(about.technologies.frontend)}. Backend: ${list(
        about.technologies.backend
      )}. Database: ${list(about.technologies.database)}. Tools: ${list(about.technologies.tools)}.`
  },
  {
    id: 'years-experience',
    keywords: ['how many year', 'years of experience', 'how long', 'how much experience'],
    answer: () =>
      `${personal.firstName} has 8+ months of hands-on professional experience, plus a prior full-stack internship.`
  },
  {
    id: 'experience',
    keywords: ['experience', 'current job', 'current role', 'company', 'employ', 'where do you work', 'where does he work'],
    answer: () => {
      const e = experience.items[0];
      return `Currently a ${e.role} at ${e.company} (${e.duration}). ${e.description}`;
    }
  },
  {
    id: 'responsibilities',
    keywords: ['responsibilit', 'day to day', 'what do you do', 'what does he do', 'daily task'],
    answer: () => {
      const e = experience.items[0];
      return `Day to day: ${list(e.responsibilities.slice(0, 4))}.`;
    }
  },
  {
    id: 'internship',
    keywords: ['intern', 'xplore'],
    answer: () => {
      const i = internships.items[0];
      return `Interned as a ${i.role} at ${i.company} (${i.duration}). ${i.description}`;
    }
  },
  {
    id: 'education',
    keywords: ['education', 'college', 'degree', 'academic', 'study', 'university', 'cgpa', 'graduat'],
    answer: () => {
      const a = academics.items[0];
      return `${a.degree} from ${a.college} (${a.duration}), score: ${a.cgpa}.`;
    }
  },
  {
    id: 'projects',
    keywords: ['project', 'built', 'build', 'portfolio site', 'app', 'application', 'work on'],
    answer: () =>
      `A few things built so far: ${projects.items
        .map((p) => p.title)
        .join('; ')}. Ask me about any one by name for more detail.`
  },
  {
    id: 'project-detail',
    keywords: projects.items.map((p) => p.title.toLowerCase()),
    answer: (msg) => {
      const match = projects.items.find((p) => msg.includes(p.title.toLowerCase()));
      if (!match) return null;
      return `${match.title}: ${match.description} Stack: ${list(match.stack)}.`;
    }
  },
  {
    id: 'certifications',
    keywords: ['certificat', 'course', 'learn', 'training'],
    answer: () =>
      `Certifications: ${certifications.items.map((c) => `${c.title} (${c.issuer}, ${c.year})`).join('; ')}.`
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'get in touch'],
    answer: () => `You can reach ${personal.firstName} at ${contact.email} or ${contact.phone}. ${contact.availability}.`
  },
  {
    id: 'social',
    keywords: ['github', 'linkedin', 'social', 'behance', 'follow'],
    answer: () => `Find ${personal.firstName} here: ${socials.map((s) => `${s.label} (${s.url})`).join(', ')}.`
  },
  {
    id: 'location',
    keywords: ['location', 'based', 'live', 'city', 'where are you', 'where is he', 'from'],
    answer: () => `${personal.firstName} is based in ${personal.location}.`
  },
  {
    id: 'availability',
    keywords: ['available', 'freelance', 'open to', 'hiring', 'looking for job', 'notice period'],
    answer: () => personal.availability.label
  },
  {
    id: 'about',
    keywords: ['who are you', 'about you', 'about him', 'yourself', 'intro', 'tell me about'],
    answer: () => personal.shortDescription
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv'],
    answer: () => `You can grab the resume here: ${personal.resumeUrl}`
  },
  {
    id: 'help',
    keywords: ['help', 'what can you', 'what do you know', 'what can i ask'],
    answer: () =>
      `I can tell you about ${personal.firstName}'s skills, current job, past internship, education, projects, certifications, socials, or how to contact him. Just ask naturally.`
  },
  {
    id: 'farewell',
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    answer: () => `Bye! Feel free to reach out to ${personal.firstName} directly at ${contact.email}.`
  },
  {
    id: 'working-style',
    keywords: ['working style', 'debug', 'approach', 'how does he work', 'strength', 'why hire'],
    answer: () =>
      `${personal.firstName}'s approach: debug first, then build — reads the actual error before guessing at a fix, and has a track record of picking up production issues and resolving them.`
  }
];

const fallback =
  "I'm not sure about that one — try asking about skills, experience, projects, education, certifications, or how to get in touch.";

export function askAssistant(rawMessage) {
  const msg = rawMessage.toLowerCase();

  for (const topic of topics) {
    if (topic.keywords.some((kw) => msg.includes(kw))) {
      const result = topic.answer(msg);
      if (result) return result;
    }
  }

  return fallback;
}

export const suggestedQuestions = [
  'What are your skills?',
  'Tell me about your current job',
  'What projects have you built?',
  'How can I contact you?'
];

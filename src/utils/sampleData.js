export const sampleResumeData = {
  personalInfo: {
    fullName: 'Alexander Mitchell',
    email: 'alex.mitchell@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmitchell',
    portfolio: 'alexmitchell.dev',
  },
  summary: 'Results-driven Full Stack Engineer with 5+ years of experience building scalable web applications and leading cross-functional teams. Proven track record of delivering high-impact products that serve millions of users. Passionate about clean architecture, performance optimization, and mentoring junior developers.',
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2016',
      endDate: '2018',
      gpa: '3.9/4.0',
      details: 'Specialization in Distributed Systems. Teaching Assistant for CS 144: Introduction to Computer Networking.',
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science in Computer Engineering',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2012',
      endDate: '2016',
      gpa: '3.7/4.0',
      details: 'Dean\'s List all semesters. President of ACM Student Chapter.',
    },
  ],
  skills: [
    { id: 'skill-1', category: 'Languages', items: 'JavaScript, TypeScript, Python, Go, SQL' },
    { id: 'skill-2', category: 'Frontend', items: 'React, Next.js, Vue.js, HTML5, CSS3, Tailwind' },
    { id: 'skill-3', category: 'Backend', items: 'Node.js, Express, Django, GraphQL, REST APIs' },
    { id: 'skill-4', category: 'Cloud & DevOps', items: 'AWS, Docker, Kubernetes, CI/CD, Terraform' },
    { id: 'skill-5', category: 'Databases', items: 'PostgreSQL, MongoDB, Redis, Elasticsearch' },
  ],
  experience: [
    {
      id: 'exp-1',
      title: 'Senior Full Stack Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      bullets: [
        'Architected and led development of a real-time analytics dashboard serving 2M+ daily active users, reducing page load time by 60%',
        'Mentored a team of 5 junior engineers, conducting weekly code reviews and establishing best practices that reduced bug rate by 40%',
        'Designed and implemented a microservices migration strategy, decomposing a monolithic application into 12 independent services',
        'Optimized database queries and implemented caching strategies, resulting in a 75% reduction in API response times',
      ],
    },
    {
      id: 'exp-2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      bullets: [
        'Built the core product from scratch using React and Node.js, growing the user base from 0 to 500K in 18 months',
        'Implemented a real-time collaboration feature using WebSockets, enabling 50+ concurrent users per session',
        'Developed a CI/CD pipeline using GitHub Actions and AWS, reducing deployment time from 2 hours to 15 minutes',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenSource Analytics Platform',
      technologies: 'React, D3.js, Node.js, PostgreSQL',
      description: 'Created an open-source analytics platform with 2K+ GitHub stars. Features real-time data visualization, custom dashboards, and automated reporting.',
      link: 'github.com/alexm/analytics-platform',
    },
    {
      id: 'proj-2',
      name: 'AI-Powered Code Review Tool',
      technologies: 'Python, GPT-4 API, FastAPI, React',
      description: 'Built an AI assistant that automatically reviews pull requests, suggests improvements, and catches potential bugs before merge.',
      link: 'github.com/alexm/ai-reviewer',
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2023' },
    { id: 'cert-2', name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2022' },
  ],
  achievements: [
    { id: 'ach-1', description: 'Winner, TechCrunch Disrupt Hackathon 2022 — Built an AI-powered accessibility tool in 24 hours' },
    { id: 'ach-2', description: 'Published research paper on "Scalable Real-Time Systems" in IEEE Conference 2019' },
    { id: 'ach-3', description: 'Speaker at ReactConf 2023 — "Building Performant Data Visualizations at Scale"' },
  ],
};

export const emptyResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  education: [],
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
};

export const generateId = (prefix = 'item') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

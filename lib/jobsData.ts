export interface Job {
  id: number;
  title: string;
  slug: string;
  description: string;
  requirements: string[];
  experience: string;
  location: string;
  type: string; // full-time, part-time, etc.
  salary?: string;
  qualifications: string[];
  softSkills: string[];
  whatWeOffer: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    slug: 'front-end-engineer',
    title: 'Front-End Engineer',
    location: 'Remote / On-site',
    type: 'Full-time',
    salary: '$80,000 - $120,000',
    description: 'We are seeking a skilled Front-End Engineer to join our development team. You will be responsible for creating responsive, user-friendly web interfaces using modern technologies. This role involves collaborating with designers and back-end developers to deliver exceptional user experiences.',
    requirements: [
      '3+ years of experience in front-end development',
      'Proficiency in HTML, CSS, and JavaScript',
      'Experience with React, Vue.js, or Angular',
      'Knowledge of responsive design principles',
      'Understanding of web performance optimization'
    ],
    experience: '3+ years',
    qualifications: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong portfolio demonstrating front-end projects',
      'Experience with version control systems (Git)',
      'Knowledge of testing frameworks (Jest, Cypress)',
      'Familiarity with build tools (Webpack, Vite)'
    ],
    softSkills: [
      'Strong problem-solving abilities',
      'Excellent communication skills',
      'Ability to work in a team environment',
      'Attention to detail',
      'Continuous learning mindset'
    ],
    whatWeOffer: [
      'Competitive salary and benefits package',
      'Flexible work arrangements (remote/hybrid options)',
      'Professional development opportunities',
      'Modern tech stack and tools',
      'Collaborative and innovative work environment'
    ]
  },
  {
    id: 2,
    slug: 'back-end-engineer',
    title: 'Back-End Engineer',
    location: 'Remote / On-site',
    type: 'Full-time',
    salary: '$90,000 - $130,000',
    description: 'Join our back-end development team to build robust, scalable server-side applications. You will design and implement APIs, databases, and server logic that power our platform. This role offers the opportunity to work with cutting-edge technologies and solve complex technical challenges.',
    requirements: [
      '4+ years of experience in back-end development',
      'Proficiency in server-side languages (Node.js, Python, Java)',
      'Experience with databases (SQL and NoSQL)',
      'Knowledge of RESTful API design',
      'Understanding of cloud platforms (AWS, Azure, GCP)'
    ],
    experience: '4+ years',
    qualifications: [
      'Bachelor\'s degree in Computer Science or related field',
      'Experience with containerization (Docker, Kubernetes)',
      'Knowledge of message queues and caching systems',
      'Understanding of security best practices',
      'Experience with CI/CD pipelines'
    ],
    softSkills: [
      'Analytical thinking',
      'Problem-solving skills',
      'Team collaboration',
      'Mentoring abilities',
      'Adaptability to new technologies'
    ],
    whatWeOffer: [
      'Competitive salary with performance bonuses',
      'Flexible remote work options',
      'Comprehensive health and retirement benefits',
      'Continuous learning and certification support',
      'Opportunity to work on cutting-edge technologies'
    ]
  },
  {
    id: 3,
    slug: 'software-architect',
    title: 'Software Architect',
    location: 'Remote / On-site',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'We are looking for an experienced Software Architect to design and oversee the technical architecture of our applications. You will work closely with development teams to ensure scalable, maintainable, and high-performance solutions. This leadership role involves making strategic technical decisions and mentoring junior developers.',
    requirements: [
      '7+ years of software development experience',
      '5+ years in software architecture or senior development roles',
      'Deep knowledge of system design and architecture patterns',
      'Experience with multiple programming languages and frameworks',
      'Strong understanding of cloud architecture'
    ],
    experience: '7+ years of software development experience with at least 5 years in architecture or senior technical roles.',
    qualifications: [
      'Master\'s degree in Computer Science or related field preferred',
      'Experience with enterprise-scale applications',
      'Knowledge of design patterns and best practices',
      'Familiarity with DevOps practices',
      'Leadership and mentoring experience'
    ],
    softSkills: [
      'Strategic thinking',
      'Leadership skills',
      'Communication and presentation abilities',
      'Problem-solving expertise',
      'Vision and planning capabilities'
    ],
    whatWeOffer: [
      'Highly competitive compensation package',
      'Equity participation opportunities',
      'Flexible work schedule and location',
      'Executive-level benefits and perks',
      'Leadership development programs'
    ]
  },
  {
    id: 4,
    slug: 'project-manager',
    title: 'Project Manager',
    location: 'Remote / On-site',
    type: 'Full-time',
    salary: '$85,000 - $115,000',
    description: 'Lead cross-functional teams in delivering complex software projects on time and within budget. As a Project Manager, you will coordinate between stakeholders, developers, and designers to ensure successful project outcomes. This role requires strong organizational skills and the ability to manage multiple priorities.',
    requirements: [
      '5+ years of project management experience',
      'Experience in software development projects',
      'Knowledge of project management methodologies (Agile, Scrum, Kanban)',
      'Proficiency with project management tools',
      'Strong stakeholder management skills'
    ],
    experience: '5+ years ',
    qualifications: [
      'PMP or similar certification preferred',
      'Experience with Agile methodologies',
      'Knowledge of risk management and mitigation',
      'Understanding of software development lifecycle',
      'Budget and resource management experience'
    ],
    softSkills: [
      'Leadership and team management',
      'Communication skills',
      'Problem-solving abilities',
      'Time management',
      'Conflict resolution'
    ],
    whatWeOffer: [
      'Competitive salary and bonus structure',
      'Professional certification reimbursement',
      'Flexible work arrangements',
      'Comprehensive benefits package',
      'Career advancement opportunities'
    ]
  },
  {
    id: 5,
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    location: 'Remote / On-site',
    type: 'Full-time',
    salary: '$70,000 - $100,000',
    description: 'Create intuitive and visually appealing user interfaces that provide exceptional user experiences. You will work closely with product managers and developers to design user-centered solutions. This role involves user research, prototyping, and collaborating on design systems.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in design tools (Figma, Sketch, Adobe XD)',
      'Strong portfolio demonstrating design skills',
      'Understanding of user-centered design principles',
      'Knowledge of design systems and component libraries'
    ],
    experience: '3+ years of professional UI/UX design experience with a strong portfolio of work.',
    qualifications: [
      'Degree in Design, HCI, or related field',
      'Experience with user research and usability testing',
      'Knowledge of accessibility standards',
      'Understanding of front-end development basics',
      'Experience with prototyping tools'
    ],
    softSkills: [
      'Creative thinking',
      'Attention to detail',
      'Communication skills',
      'Empathy for users',
      'Collaborative mindset'
    ],
    whatWeOffer: [
      'Creative and collaborative work environment',
      'Latest design tools and software',
      'Professional development budget',
      'Flexible work hours',
      'Portfolio development support'
    ]
  },
  {
    id: 6,
    slug: 'qa-engineer',
    title: 'QA Engineer',
    location: 'Remote / On-site',
    type: 'Full-time',
    salary: '$75,000 - $105,000',
    description: 'Ensure the quality and reliability of our software products through comprehensive testing strategies. You will develop and execute test plans, identify bugs, and work with development teams to resolve issues. This role involves both manual and automated testing approaches.',
    requirements: [
      '3+ years of QA or software testing experience',
      'Experience with manual and automated testing',
      'Knowledge of testing methodologies and best practices',
      'Familiarity with testing tools and frameworks',
      'Understanding of software development lifecycle'
    ],
    experience: '3+ years of quality assurance or software testing experience.',
    qualifications: [
      'ISTQB or similar certification preferred',
      'Experience with test automation tools (Selenium, Cypress)',
      'Knowledge of API testing',
      'Understanding of performance testing',
      'Experience with bug tracking systems'
    ],
    softSkills: [
      'Analytical thinking',
      'Attention to detail',
      'Problem-solving skills',
      'Communication abilities',
      'Quality-focused mindset'
    ],
    whatWeOffer: [
      'Competitive salary and benefits',
      'Certification and training opportunities',
      'Flexible work environment',
      'Modern testing tools and technologies',
      'Career growth in quality assurance'
    ]
  },
  {
    id: 7,
    slug: 'front-desk-representative',
    title: 'Front Desk Representative',
    location: 'On-site',
    type: 'Full-time',
    salary: '$35,000 - $45,000',
    description: 'Provide excellent customer service as the first point of contact for our clients. You will greet visitors, manage appointments, handle phone calls, and assist with administrative tasks. This role requires strong interpersonal skills and attention to detail.',
    requirements: [
      'High school diploma or equivalent',
      '1+ years of customer service experience',
      'Excellent communication and interpersonal skills',
      'Proficiency with office software and phone systems',
      'Professional appearance and demeanor'
    ],
    experience: '1+ years of customer service or administrative experience preferred.',
    qualifications: [
      'Associate degree in business or related field preferred',
      'Experience with customer relationship management systems',
      'Multilingual abilities a plus',
      'Knowledge of basic office procedures',
      'Typing speed of 50+ WPM'
    ],
    softSkills: [
      'Customer service orientation',
      'Professional communication',
      'Organizational skills',
      'Multitasking abilities',
      'Problem-solving skills'
    ],
    whatWeOffer: [
      'Competitive hourly wage and benefits',
      'Stable work environment',
      'Training and development opportunities',
      'Team-oriented workplace',
      'Work-life balance'
    ]
  },
  {
    id: 8,
    slug: 'sales-agent',
    title: 'Sales Agent',
    location: 'Remote / On-site',
    type: 'Full-time',
    salary: '$50,000 - $80,000 + Commission',
    description: 'Drive business growth by identifying and pursuing sales opportunities. You will prospect new clients, build relationships, and close deals. This commission-based role offers unlimited earning potential and the opportunity to work with a variety of products and services.',
    requirements: [
      '2+ years of sales experience',
      'Strong communication and persuasion skills',
      'Self-motivated and goal-oriented',
      'Experience with CRM software',
      'Track record of meeting or exceeding sales targets'
    ],
    experience: '2+ years of sales experience, preferably in a commission-based environment.',
    qualifications: [
      'Bachelor\'s degree in Business or related field preferred',
      'Experience in real estate or financial services sales',
      'Knowledge of sales methodologies and techniques',
      'Understanding of customer relationship management',
      'Licensing in relevant areas (if applicable)'
    ],
    softSkills: [
      'Persuasive communication',
      'Relationship building',
      'Resilience and determination',
      'Time management',
      'Negotiation skills'
    ],
    whatWeOffer: [
      'Uncapped commission potential',
      'Base salary plus performance bonuses',
      'Comprehensive sales training',
      'Lead generation and marketing support',
      'Career advancement opportunities'
    ]
  }
];


export type JobListing = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Freelance';
  category: string;
  tags: string[];
  postedAt: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  featured: boolean;
  recommended?: boolean;
  views?: number;
  contactsViewed?: number;
  companyInfo: {
    name: string;
    website: string;
    description: string;
    employees: string;
    headquarters: string;
    founded: string;
  }
};

export const jobs: JobListing[] = [
  {
    id: '1',
    title: 'Senior UI/UX Designer',
    company: 'Dribbble',
    logo: 'https://assets.stickpng.com/images/5842a622a6515b1e0ad75ade.png',
    location: 'San Francisco, CA (Remote)',
    salary: '$90,000 - $110,000',
    type: 'Full-time',
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Adobe XD', 'Product Design'],
    postedAt: '2 days ago',
    featured: true,
    recommended: true,
    views: 124,
    contactsViewed: 45,
    description: 'We are looking for an experienced UI/UX Designer to join our product team. You will be responsible for creating beautiful, intuitive interfaces that help our users achieve their goals.',
    requirements: [
      '5+ years of experience in UI/UX design',
      'Proficiency in Figma, Sketch, or similar tools',
      'Experience with design systems',
      'Strong portfolio showing your design process',
      'Excellent communication skills'
    ],
    responsibilities: [
      'Design beautiful and intuitive user interfaces',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Collaborate with product managers and engineers',
      'Conduct user research and usability testing',
      'Contribute to our design system'
    ],
    companyInfo: {
      name: 'Dribbble',
      website: 'https://dribbble.com',
      description: 'Dribbble is the leading destination to find & showcase creative work and home to the world\'s best design professionals.',
      employees: '50-100',
      headquarters: 'San Francisco, CA',
      founded: '2009'
    }
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png',
    location: 'Stockholm, Sweden',
    salary: '$85,000 - $105,000',
    type: 'Full-time',
    category: 'Development',
    tags: ['React', 'TypeScript', 'CSS', 'Frontend'],
    postedAt: '3 days ago',
    featured: false,
    recommended: true,
    views: 98,
    contactsViewed: 32,
    description: 'Join our frontend team to build engaging user experiences for millions of music lovers around the world. You\'ll work on our web application using modern technologies.',
    requirements: [
      '3+ years of experience with React',
      'Strong knowledge of TypeScript',
      'Experience with modern CSS techniques',
      'Understanding of web performance optimization',
      'Familiarity with agile development processes'
    ],
    responsibilities: [
      'Develop new features for our web application',
      'Collaborate with designers to implement UI components',
      'Write clean, maintainable, and well-tested code',
      'Optimize application for performance',
      'Participate in code reviews and technical discussions'
    ],
    companyInfo: {
      name: 'Spotify',
      website: 'https://spotify.com',
      description: 'Spotify is a digital music service that gives you access to millions of songs.',
      employees: '5000+',
      headquarters: 'Stockholm, Sweden',
      founded: '2006'
    }
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'Slack',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png',
    location: 'Remote (US)',
    salary: '$120,000 - $140,000',
    type: 'Full-time',
    category: 'Product',
    tags: ['Product Management', 'Agile', 'B2B', 'SaaS'],
    postedAt: '1 week ago',
    featured: false,
    recommended: true,
    views: 76,
    contactsViewed: 23,
    description: 'We\'re looking for a talented Product Manager to help us define and execute our product vision. You\'ll work closely with engineering, design, and other stakeholders to build products that users love.',
    requirements: [
      '4+ years of product management experience',
      'Experience with B2B SaaS products',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
      'Technical background is a plus'
    ],
    responsibilities: [
      'Define product strategy and roadmap',
      'Gather and prioritize product requirements',
      'Work closely with engineering and design teams',
      'Analyze market trends and competitor offerings',
      'Ensure successful product launches'
    ],
    companyInfo: {
      name: 'Slack',
      website: 'https://slack.com',
      description: 'Slack is a messaging app for business that connects people to the information they need.',
      employees: '1000+',
      headquarters: 'San Francisco, CA',
      founded: '2013'
    }
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Netflix',
    logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
    location: 'Los Gatos, CA',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    category: 'Data Science',
    tags: ['Python', 'Machine Learning', 'SQL', 'Data Analysis'],
    postedAt: '2 weeks ago',
    featured: false,
    recommended: true,
    views: 67,
    contactsViewed: 15,
    description: 'Join our data science team to help us understand user behavior and improve our recommendation algorithms. You\'ll analyze large datasets and build models to enhance the Netflix experience.',
    requirements: [
      'MS or PhD in Computer Science, Statistics, or related field',
      'Strong programming skills in Python',
      'Experience with machine learning frameworks',
      'Proficiency in SQL and data analysis',
      'Good communication skills'
    ],
    responsibilities: [
      'Build and improve recommendation algorithms',
      'Analyze user behavior data',
      'Develop machine learning models',
      'Collaborate with engineering and product teams',
      'Present findings to stakeholders'
    ],
    companyInfo: {
      name: 'Netflix',
      website: 'https://netflix.com',
      description: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.',
      employees: '10,000+',
      headquarters: 'Los Gatos, CA',
      founded: '1997'
    }
  },
  {
    id: '5',
    title: 'Backend Engineer',
    company: 'Airbnb',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-airbnb-1869035-1583156.png',
    location: 'San Francisco, CA',
    salary: '$130,000 - $150,000',
    type: 'Full-time',
    category: 'Development',
    tags: ['Node.js', 'Python', 'AWS', 'Backend'],
    postedAt: '3 weeks ago',
    featured: false,
    recommended: true,
    views: 54,
    contactsViewed: 12,
    description: 'We are seeking a Backend Engineer to join our team and help build scalable systems that power the Airbnb platform. You\'ll work on high-performance APIs and services that millions of users rely on.',
    requirements: [
      '5+ years of backend development experience',
      'Proficiency in Node.js, Python, or Ruby',
      'Experience with cloud services (AWS, GCP)',
      'Knowledge of database systems and optimization',
      'Understanding of system design principles'
    ],
    responsibilities: [
      'Design and develop backend services and APIs',
      'Ensure high performance and reliability',
      'Implement security and data protection measures',
      'Collaborate with frontend engineers',
      'Participate in on-call rotations'
    ],
    companyInfo: {
      name: 'Airbnb',
      website: 'https://airbnb.com',
      description: 'Airbnb is an online marketplace that connects people who want to rent out their homes with people looking for accommodations in specific locales.',
      employees: '5000+',
      headquarters: 'San Francisco, CA',
      founded: '2008'
    }
  },
  {
    id: '6',
    title: 'Marketing Manager',
    company: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/1200px-Adobe_Corporate_Logo.png',
    location: 'Remote',
    salary: '$90,000 - $110,000',
    type: 'Full-time',
    category: 'Marketing',
    tags: ['Digital Marketing', 'Content Strategy', 'SEO', 'Analytics'],
    postedAt: '1 month ago',
    featured: false,
    recommended: true,
    views: 43,
    contactsViewed: 8,
    description: 'We\'re looking for a Marketing Manager to lead our digital marketing efforts. You\'ll develop and execute marketing strategies to drive awareness and adoption of our creative products.',
    requirements: [
      '5+ years of experience in digital marketing',
      'Strong analytical skills and experience with marketing metrics',
      'Experience with SEO, SEM, and content marketing',
      'Excellent project management and communication skills',
      'B2B SaaS marketing experience preferred'
    ],
    responsibilities: [
      'Develop and execute marketing campaigns',
      'Manage digital marketing channels',
      'Analyze marketing metrics and adjust strategies',
      'Collaborate with content and design teams',
      'Manage marketing budget and resources'
    ],
    companyInfo: {
      name: 'Adobe',
      website: 'https://adobe.com',
      description: 'Adobe is changing the world through digital experiences, helping customers create, deliver, and optimize content and applications.',
      employees: '20,000+',
      headquarters: 'San Jose, CA',
      founded: '1982'
    }
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'GitHub',
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    location: 'Remote (US)',
    salary: '$120,000 - $140,000',
    type: 'Full-time',
    category: 'DevOps',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Infrastructure'],
    postedAt: '2 days ago',
    featured: true,
    recommended: true,
    views: 32,
    contactsViewed: 10,
    description: 'Join our infrastructure team to help scale and maintain our cloud-based systems. You\'ll work on automation, monitoring, and improving our deployment pipelines.',
    requirements: [
      '4+ years of DevOps or SRE experience',
      'Experience with containerization and orchestration',
      'Knowledge of CI/CD principles and tools',
      'Strong scripting skills (Python, Bash)',
      'Experience with cloud platforms (AWS, GCP)'
    ],
    responsibilities: [
      'Design and implement infrastructure as code',
      'Manage and optimize CI/CD pipelines',
      'Improve system reliability and performance',
      'Implement monitoring and alerting solutions',
      'Collaborate with development teams'
    ],
    companyInfo: {
      name: 'GitHub',
      website: 'https://github.com',
      description: 'GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software.',
      employees: '2000+',
      headquarters: 'San Francisco, CA',
      founded: '2008'
    }
  },
  {
    id: '8',
    title: 'Mobile Developer',
    company: 'Twitter',
    logo: 'https://freelogopng.com/images/all_img/1690643640twitter-x-logo-png.png',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    category: 'Development',
    tags: ['iOS', 'Swift', 'Android', 'Kotlin', 'Mobile'],
    postedAt: '4 days ago',
    featured: false,
    recommended: true,
    views: 21,
    contactsViewed: 5,
    description: 'We\'re looking for a talented Mobile Developer to join our team and help build our next-generation mobile applications. You\'ll work on feature development and performance optimization.',
    requirements: [
      '4+ years of mobile development experience',
      'Proficiency in Swift/iOS or Kotlin/Android',
      'Understanding of mobile UI/UX principles',
      'Experience with RESTful APIs and JSON',
      'Knowledge of mobile app architecture'
    ],
    responsibilities: [
      'Develop new features for our mobile applications',
      'Ensure high performance and reliability',
      'Write clean, maintainable code',
      'Collaborate with design and backend teams',
      'Participate in code reviews and technical discussions'
    ],
    companyInfo: {
      name: 'Twitter',
      website: 'https://twitter.com',
      description: 'Twitter is a social networking platform where users post and interact with short messages called "tweets".',
      employees: '5000+',
      headquarters: 'San Francisco, CA',
      founded: '2006'
    }
  }
];

export const jobCategories = [
  'All Categories',
  'Design',
  'Development',
  'Product',
  'Marketing',
  'Data Science',
  'DevOps',
];

export const jobTypes = [
  'All Types',
  'Full-time',
  'Part-time',
  'Contract',
  'Remote',
  'Freelance',
];

export const locations = [
  'All Locations',
  'Remote',
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Seattle, WA',
  'London, UK',
  'Berlin, Germany',
  'Stockholm, Sweden',
];

export const salaryRanges = [
  'All Salaries',
  'Under $50,000',
  '$50,000 - $80,000',
  '$80,000 - $100,000',
  '$100,000 - $130,000',
  'Over $130,000',
];


export const searchJobs = (query: string, filters: any = {}) => {
  let filtered = [...jobs];
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filtered = filtered.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery) ||
      job.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  if (filters.category && filters.category !== 'All Categories') {
    filtered = filtered.filter(job => job.category === filters.category);
  }
  
  if (filters.type && filters.type !== 'All Types') {
    filtered = filtered.filter(job => job.type === filters.type);
  }
  
  if (filters.location && filters.location !== 'All Locations') {
    filtered = filtered.filter(job => job.location.includes(filters.location));
  }
  
  if (filters.salary && filters.salary !== 'All Salaries') {
    // This is a simple implementation - in a real app, you'd parse the salary ranges better
    if (filters.salary === 'Under $50,000') {
      filtered = filtered.filter(job => {
        const max = parseInt(job.salary.split('-')[1]?.replace(/\D/g, '') || '0');
        return max < 50000;
      });
    } else if (filters.salary === '$50,000 - $80,000') {
      filtered = filtered.filter(job => {
        const min = parseInt(job.salary.split('-')[0].replace(/\D/g, '') || '0');
        const max = parseInt(job.salary.split('-')[1]?.replace(/\D/g, '') || '200000');
        return min >= 50000 && max <= 80000;
      });
    } else if (filters.salary === '$80,000 - $100,000') {
      filtered = filtered.filter(job => {
        const min = parseInt(job.salary.split('-')[0].replace(/\D/g, '') || '0');
        const max = parseInt(job.salary.split('-')[1]?.replace(/\D/g, '') || '200000');
        return min >= 80000 && max <= 100000;
      });
    } else if (filters.salary === '$100,000 - $130,000') {
      filtered = filtered.filter(job => {
        const min = parseInt(job.salary.split('-')[0].replace(/\D/g, '') || '0');
        const max = parseInt(job.salary.split('-')[1]?.replace(/\D/g, '') || '200000');
        return min >= 100000 && max <= 130000;
      });
    } else if (filters.salary === 'Over $130,000') {
      filtered = filtered.filter(job => {
        const min = parseInt(job.salary.split('-')[0].replace(/\D/g, '') || '0');
        return min > 130000;
      });
    }
  }
  
  return filtered;
};

export const getJobById = (id: string) => {
  return jobs.find(job => job.id === id);
};

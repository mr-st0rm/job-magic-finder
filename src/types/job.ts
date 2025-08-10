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

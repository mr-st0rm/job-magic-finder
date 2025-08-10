
import { Vacancy } from '@/types/vacancy';
import { JobListing } from '@/types/job';

export const mapVacancyToJobListing = (vacancy: Vacancy): JobListing => {
  const formatSalary = () => {
    if (vacancy.salary_min && vacancy.salary_max) {
      const currency = vacancy.salary_currency || '$';
      return `${currency}${vacancy.salary_min.toLocaleString()} - ${currency}${vacancy.salary_max.toLocaleString()}`;
    }
    if (vacancy.salary_min) {
      const currency = vacancy.salary_currency || '$';
      return `From ${currency}${vacancy.salary_min.toLocaleString()}`;
    }
    if (vacancy.salary_max) {
      const currency = vacancy.salary_currency || '$';
      return `Up to ${currency}${vacancy.salary_max.toLocaleString()}`;
    }
    return 'Negotiable';
  };

  const mapWorkType = (workType: string) => {
    switch (workType) {
      case 'FULL_TIME': return 'Full-time';
      case 'PART_TIME': return 'Part-time';
      case 'CONTRACT': return 'Contract';
      case 'REMOTE': return 'Remote';
      case 'FREELANCE': return 'Freelance';
      default: return 'Full-time';
    }
  };

  return {
    id: vacancy.id.toString(),
    title: vacancy.title,
    company: vacancy.category.name, // Using category name as placeholder
    logo: '', // No logo available from Vacancy
    location: vacancy.location || 'Remote',
    salary: formatSalary(),
    type: mapWorkType(vacancy.work_type) as JobListing['type'],
    category: vacancy.category.name,
    tags: vacancy.skills.map(skill => skill.skill.name),
    postedAt: 'Recently', // Placeholder since we don't have created_at
    description: vacancy.description,
    requirements: vacancy.requirements.split('\n').filter(req => req.trim()),
    responsibilities: vacancy.responsibilities.split('\n').filter(resp => resp.trim()),
    featured: vacancy.is_featured,
    recommended: vacancy.is_recommended,
    views: vacancy.job_views_count,
    contactsViewed: vacancy.job_contact_views_count,
    companyInfo: {
      name: vacancy.category.name,
      website: '',
      description: '',
      employees: '',
      headquarters: '',
      founded: ''
    }
  };
};

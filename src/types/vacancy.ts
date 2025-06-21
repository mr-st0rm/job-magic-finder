
export interface Vacancy {
  id: number;
  title: string;
  company_id: string;
  company_name?: string;
  location: string;
  type: 'Полная занятость' | 'Частичная занятость' | 'Проектная работа' | 'Стажировка';
  salary: string;
  description: string;
  requirements: string;
  responsibilities: string;
  contact_name: string;
  contact_phone?: string;
  contact_email?: string;
  contact_telegram?: string;
  isPremium: boolean;
  isFeatured: boolean;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  skills?: string[];
  category_id?: string;
}


import { createApiClient } from './baseApi';

const apiClient = createApiClient();

export interface CompanyCreateSchema {
  name: string;
  description?: string;
  website?: string;
  avatar?: string;
  location?: string;
  employees_count?: number;
  founded_year?: number;
}

export interface Company extends CompanyCreateSchema {
  id: string;
  created_at: string;
  updated_at: string;
}

export const companiesApi = {
  // Получить список компаний пользователя
  getMyCompanies: () => apiClient.get<Company[]>('/api/v1/vacancy/companies/'),
  
  // Создать компанию
  createCompany: (data: CompanyCreateSchema) => apiClient.post<Company>('/companies', data),
  
  // Обновить компанию
  updateCompany: (id: string, data: Partial<CompanyCreateSchema>) => 
    apiClient.patch<Company>(`/companies/${id}`, data),
  
  // Удалить компанию
  deleteCompany: (id: string) => apiClient.delete(`/companies/${id}`),
  
  // Получить компанию по ID
  getCompany: (id: string) => apiClient.get<Company>(`/companies/${id}`)
};

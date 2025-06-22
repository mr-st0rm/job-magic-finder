
import { createApiClient } from "@/utils/baseApi.ts";
import { User, UserSettingsUpdateSchema } from "@/types/user";
import { Vacancy, VacancyCreateSchema, VacancyUpdateSchema, VacancyFilterSchema, VacanciesPage } from "@/types/vacancy";
import { Skill } from "@/types/skill";
import { Category } from "@/types/category";
import { Company, CompanyCreateSchema, CompanyUpdateSchema } from "@/types/company";

const apiClient = createApiClient();

export const api = {
  // User endpoints
  getCurrentUser: (): Promise<User> => apiClient.get('/api/v1/user/me/'),
  updateCurrentUserSettings: (updateData: UserSettingsUpdateSchema) => 
    apiClient.patch('/api/v1/user/me/settings/', updateData),

  // Vacancy endpoints
  getVacanciesList: (
    filters: VacancyFilterSchema,
    page: number = 1,
    size: number = 50
  ): Promise<VacanciesPage> => 
    apiClient.post(`/api/v1/vacancy/list/?page=${page}&size=${size}`, filters),
  
  getVacancyById: (vacancyId: number): Promise<Vacancy> => 
    apiClient.get(`/api/v1/vacancy/${vacancyId}/`),
  
  createVacancy: (vacancyData: VacancyCreateSchema): Promise<Vacancy> => 
    apiClient.post('/api/v1/vacancy/', vacancyData),
  
  updateVacancy: (vacancyId: number, vacancyData: VacancyUpdateSchema): Promise<Vacancy> => 
    apiClient.patch(`/api/v1/vacancy/${vacancyId}/`, vacancyData),

  // Reference data endpoints
  getSkills: (): Promise<Skill[]> => apiClient.get('/api/v1/vacancy/skills/'),
  getCategories: (): Promise<Category[]> => apiClient.get('/api/v1/vacancy/categories/'),
  getCompanies: (): Promise<Company[]> => apiClient.get('/api/v1/vacancy/companies/'),

  // Company endpoints
  createCompany: (companyData: CompanyCreateSchema): Promise<Company> => 
    apiClient.post('/api/v1/company/', companyData),
  
  updateCompany: (companyId: number, companyData: CompanyUpdateSchema): Promise<Company> => 
    apiClient.patch(`/api/v1/company/${companyId}/`, companyData),
};

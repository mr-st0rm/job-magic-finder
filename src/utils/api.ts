
import { createApiClient } from "@/utils/baseApi.ts";
import { User, UserSettingsUpdateSchema } from "@/types/user";
import { Vacancy, VacancyCreateSchema, VacancyUpdateSchema, VacancyFilterSchema, VacanciesPage } from "@/types/vacancy";
import { Skill } from "@/types/skill";
import { Category } from "@/types/category";
import { Company, CompanyCreateSchema, CompanyUpdateSchema } from "@/types/company";

const apiClient = createApiClient();

export const api = {
  // User endpoints
  // TODO: backend URL — get current user
  getCurrentUser: (): Promise<User> => apiClient.get('/api/v1/user/me/'),
  // TODO: backend URL — update current user settings
  updateCurrentUserSettings: (updateData: UserSettingsUpdateSchema) => 
    apiClient.patch('/api/v1/user/me/settings/', updateData),

  // Vacancy endpoints
  // TODO: backend URL — list vacancies (used by useVacancies)
  getVacanciesList: (
    filters: VacancyFilterSchema,
    page: number = 1,
    size: number = 50
  ): Promise<VacanciesPage> => 
    apiClient.post(`/api/v1/vacancy/list/?page=${page}&size=${size}`, filters),
  
  // TODO: backend URL — get vacancy by id (used by useVacancy)
  getVacancyById: (vacancyId: number): Promise<Vacancy> => 
    apiClient.get(`/api/v1/vacancy/${vacancyId}/`),
  
  // TODO: backend URL — create vacancy
  createVacancy: (vacancyData: VacancyCreateSchema): Promise<Vacancy> => 
    apiClient.post('/api/v1/vacancy/', vacancyData),
  
  // TODO: backend URL — update vacancy
  updateVacancy: (vacancyId: number, vacancyData: VacancyUpdateSchema): Promise<Vacancy> => 
    apiClient.patch(`/api/v1/vacancy/${vacancyId}/`, vacancyData),

  // TODO: backend URL — track vacancy view
  trackVacancyView: (vacancyId: number): Promise<{ success?: boolean }> =>
    apiClient.post(`/api/v1/vacancy/${vacancyId}/view/`, {}),

  // TODO: backend URL — toggle favorite for vacancy
  toggleVacancyFavorite: (vacancyId: number, favorite: boolean): Promise<{ success?: boolean }> =>
    favorite
      ? apiClient.post(`/api/v1/vacancy/${vacancyId}/favorite/`, {})
      : apiClient.delete(`/api/v1/vacancy/${vacancyId}/favorite/`),

  // TODO: backend URL — track contacts viewed
  trackVacancyContactsViewed: (vacancyId: number): Promise<{ success?: boolean }> =>
    apiClient.post(`/api/v1/vacancy/${vacancyId}/contacts-viewed/`, {}),

  // Reference data endpoints
  // TODO: backend URL — list skills
  getSkills: (): Promise<Skill[]> => apiClient.get('/api/v1/vacancy/skills/'),
  // TODO: backend URL — list categories
  getCategories: (): Promise<Category[]> => apiClient.get('/api/v1/vacancy/categories/'),
  // TODO: backend URL — list companies
  getCompanies: (): Promise<Company[]> => apiClient.get('/api/v1/vacancy/companies/'),

  // Company endpoints
  // TODO: backend URL — create company
  createCompany: (companyData: CompanyCreateSchema): Promise<Company> => 
    apiClient.post('/api/v1/company/', companyData),
  
  // TODO: backend URL — update company
  updateCompany: (companyId: number, companyData: CompanyUpdateSchema): Promise<Company> => 
    apiClient.patch(`/api/v1/company/${companyId}/`, companyData),
};

import {createApiClient} from "@/utils/baseApi.ts";

const apiClient = createApiClient();

export const api = {
  getCurrentUser: () => apiClient.get('/api/v1/user/me/'),
  getVacancyById: (vacancyId: number) => apiClient.get(`/api/v1/vacancy/${vacancyId}/`),

  getSkills: () => apiClient.get('/api/v1/vacancy/skills/'),
  getCategories: () => apiClient.get('/api/v1/vacancy/categories/'),
  getCompanies: () => apiClient.get('/api/v1/vacancy/companies/'),
};
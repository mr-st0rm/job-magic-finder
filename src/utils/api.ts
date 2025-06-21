import {createApiClient} from "@/utils/baseApi.ts";
import { User } from "@/types/user";
import { Vacancy } from "@/types/vacancy";
import { SkillsResponse } from "@/types/skill";
import { CategoriesResponse } from "@/types/category";
import { CompaniesResponse } from "@/types/company";

const apiClient = createApiClient();

type UserRole = 'applicant' | 'recruiter';

interface UserSettingsSchema {
  dark_mode?: boolean;
  language?: string;
  push_notifications?: boolean;
  email_notifications?: boolean;
}

interface UserSettingsUpdateSchema {
  role?: UserRole;
  settings?: UserSettingsSchema;
}

export const api = {
  // UserData
  getCurrentUser: (): Promise<User> => apiClient.get('/api/v1/user/me/'),
  updateCurrentUserSettings: (
      updateData: UserSettingsUpdateSchema
  ) => apiClient.patch('/api/v1/user/me/settings/', updateData),
  // VacanciesData
  getVacancyById: (vacancyId: number): Promise<Vacancy> => apiClient.get(`/api/v1/vacancy/${vacancyId}/`),
  // AdditionalData
  getSkills: (): Promise<SkillsResponse> => apiClient.get('/api/v1/vacancy/skills/'),
  getCategories: (): Promise<CategoriesResponse> => apiClient.get('/api/v1/vacancy/categories/'),
  getCompanies: (): Promise<CompaniesResponse> => apiClient.get('/api/v1/vacancy/companies/'),
};

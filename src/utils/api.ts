
import {createApiClient} from "@/utils/baseApi.ts";
import { User } from "@/types/user";

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
  getVacancyById: (vacancyId: number) => apiClient.get(`/api/v1/vacancy/${vacancyId}/`),
  // AdditionalData
  getSkills: () => apiClient.get('/api/v1/vacancy/skills/'),
  getCategories: () => apiClient.get('/api/v1/vacancy/categories/'),
  getCompanies: () => apiClient.get('/api/v1/vacancy/companies/'),
};


export type UserRole = 'applicant' | 'recruiter';

export interface UserSettings {
  dark_mode: boolean;
  language: string;
  push_notifications: boolean;
  email_notifications: boolean;
}

export interface User {
  tg_id: number;
  first_name: string;
  last_name?: string | null;
  username?: string | null;
  about?: string | null;
  role: string;
  is_active: boolean;
  settings: UserSettings;
}

export interface UserSettingsUpdateSchema {
  role?: UserRole | null;
  settings?: UserSettings | null;
}

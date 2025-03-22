
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'applicant' | 'recruiter';

interface UserContextType {
  role: UserRole;
  toggleRole: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('applicant');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Для тестирования сразу авторизованы

  const toggleRole = () => {
    setRole(prev => prev === 'applicant' ? 'recruiter' : 'applicant');
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <UserContext.Provider value={{ 
      role, 
      toggleRole, 
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

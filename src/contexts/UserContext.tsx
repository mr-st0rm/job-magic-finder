
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  // Get the initial role from localStorage or default to 'applicant'
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'applicant';
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Для тестирования сразу авторизованы

  const toggleRole = () => {
    const newRole = role === 'applicant' ? 'recruiter' : 'applicant';
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  // Save role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

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

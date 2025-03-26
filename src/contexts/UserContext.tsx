
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * User role types - applicant (job seeker) or recruiter
 */
export type UserRole = 'applicant' | 'recruiter';

/**
 * User context interface defining available properties and methods
 */
interface UserContextType {
  role: UserRole;                // Current user role
  toggleRole: () => void;        // Function to switch between roles
  isAuthenticated: boolean;      // Authentication state
  login: () => void;             // Login function
  logout: () => void;            // Logout function
}

// Create the context with undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provider component that wraps the app and makes user context available
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Get the initial role from localStorage or default to 'applicant'
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'applicant';
  });
  
  // TODO: Replace with actual auth logic - currently always authenticated for demo
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  /**
   * Toggle between applicant and recruiter roles
   */
  const toggleRole = () => {
    const newRole = role === 'applicant' ? 'recruiter' : 'applicant';
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    // TODO: Connect to API to update user role preference
    // Expected request: PUT /api/users/preferences { role: newRole }
    // Expected response: { success: boolean, user: { role: string, ... } }
  };

  // Save role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  /**
   * Log user in
   * TODO: Implement actual authentication with API
   * Expected request: POST /api/auth/login { email, password }
   * Expected response: { success: boolean, token: string, user: { id, email, role, ... } }
   */
  const login = () => {
    setIsAuthenticated(true);
  };

  /**
   * Log user out
   * TODO: Implement actual logout with API
   * Expected request: POST /api/auth/logout
   * Expected response: { success: boolean }
   */
  const logout = () => {
    setIsAuthenticated(false);
  };

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

/**
 * Custom hook to use the user context
 * Throws an error if used outside of UserProvider
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

/**
 * User role types - defines the possible roles a user can have
 */
export type UserRole = 'applicant' | 'recruiter';

/**
 * User authentication result interface
 * Used for typing the response from authentication API calls
 */
interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role: UserRole;
    name?: string;
  };
  token?: string;
  error?: string;
}

/**
 * User context interface defining available properties and methods
 * This defines what components can access from the context
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
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to the context
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  // Get the initial role from localStorage or default to 'applicant'
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'applicant';
  });
  
  // TODO: Replace with actual auth logic - currently always authenticated for demo
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  /**
   * Toggle between applicant and recruiter roles
   * Updates local storage and could connect to an API
   */
  const toggleRole = () => {
    const newRole = role === 'applicant' ? 'recruiter' : 'applicant';
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    toast({
      title: "Режим изменен",
      description: `Вы переключились в режим ${newRole === 'applicant' ? 'соискателя' : 'рекрутера'}`,
    });
    
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
   * In a real implementation, this would make an API call with credentials
   */
  const login = () => {
    // TODO: Implement actual authentication with API
    // Expected request: POST /api/auth/login { email, password }
    // Expected response: { success: boolean, token: string, user: { id, email, role, ... } }
    
    setIsAuthenticated(true);
    toast({
      title: "Успешный вход",
      description: "Вы успешно вошли в систему",
    });
  };

  /**
   * Log user out
   * Clears authentication state and could call an API to invalidate the session
   */
  const logout = () => {
    // TODO: Implement actual logout with API
    // Expected request: POST /api/auth/logout
    // Expected response: { success: boolean }
    
    setIsAuthenticated(false);
    toast({
      title: "Выход из системы",
      description: "Вы вышли из системы",
    });
  };

  // Context value that will be provided to consumers
  const contextValue = {
    role,
    toggleRole,
    isAuthenticated,
    login,
    logout
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to use the user context
 * Provides an easy way for components to access user-related functionality
 * @returns The user context object with all properties and methods
 * @throws Error if used outside of UserProvider
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

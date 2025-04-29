import { createContext } from '@lit/context';

export interface AuthContextData {
    isLoggedIn: boolean;
    username: string | null;
    avatarUrl: string | null;

    login: (userData: { username: string; avatarUrl?: string }) => void;
    logout: () => void;
  }
export const authContext = createContext<AuthContextData>('auth-context');
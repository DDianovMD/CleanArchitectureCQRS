import type { CustomJwtPayload } from "./CustomJwtPayload";

export interface AuthContextType {
  token: string | null;
  user: CustomJwtPayload | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken?: string) => void;
  logout: () => void;
}
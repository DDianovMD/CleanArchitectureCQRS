import AuthService from '../services/AuthService';
import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType } from '../interfaces/AuthContext';
import type { CustomJwtPayload } from '../interfaces/CustomJwtPayload';

export const AuthContext: React.Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return AuthService.getAccessToken();
  });

  const [user, setUser] = useState<CustomJwtPayload | null>(() => {
    return AuthService.getAccessTokenPayload();
  });

  const login = (accessToken: string, refreshToken?: string): void => {
    AuthService.saveAccessToken(accessToken);
    if (refreshToken) {
      AuthService.saveRefreshToken(refreshToken);
    }

    setToken(accessToken);
    const user: CustomJwtPayload | null = AuthService.getAccessTokenPayload();
    setUser(() => {
      return user
    });
  };

  const logout = (): void => {
    AuthService.deleteTokens();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


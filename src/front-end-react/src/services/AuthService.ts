import type { CustomJwtPayload } from '../interfaces/CustomJwtPayload';
import { jwtDecode } from 'jwt-decode';

export default abstract class AuthService {
  private static accessTokenKey: string = 'accessToken';
  private static refreshTokenKey: string = 'refreshToken';

  static getAccessTokenPayload(): CustomJwtPayload | null {
    const token: string | null = AuthService.getAccessToken();

    if (!token) {
      return null;
    }

    try {
      const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      return decoded;
    } catch (error) {
      console.error('Invalid token format:', error);
      return null;
    }
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  static saveAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  static saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  static deleteTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}


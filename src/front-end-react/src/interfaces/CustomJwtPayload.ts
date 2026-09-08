export interface CustomJwtPayload {
  sub?: string;                 // User ID
  email?: string;               // Email
  preferred_username?: string;  // Keycloak username
  realm_access?: {              // Keycloak Roles
    roles: string[];
  };
  exp?: number;                 // Expiration timestamp
}
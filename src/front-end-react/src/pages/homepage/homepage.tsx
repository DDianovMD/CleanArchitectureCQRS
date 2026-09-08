import "./homepage.css";
import type { JSX } from "react";
import useAuth from "../../hooks/useAuth";

export default function Homepage(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const username: string | undefined = isAuthenticated
    ? user?.preferred_username
    : 'Guest';

  return <div className="homepage-container">
    <h1>Welcome, {username}!</h1>
  </div>
}

import { useEffect, type JSX } from "react";
import useAuth from "../../hooks/useAuth";

export default function Logout(): JSX.Element {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <>
    <p>You have been logged out successfully. See you next time!</p>
  </>
}
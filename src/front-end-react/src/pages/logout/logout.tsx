import { useEffect, useState, type JSX } from "react";
import useAuth from "../../hooks/useAuth";
import NotFoundPage from "../not-found/not-found";

export default function Logout(): JSX.Element {
  const { user, isAuthenticated, logout } = useAuth();
  const [shouldLogOut, setShouldLogOut] = useState<boolean>(user !== null);

  useEffect(() => {
    if (user !== null) {
      logout();
    }
  }, []);

  return <>
    {
      shouldLogOut && !isAuthenticated && <div className="flex-column-center" style={{ minHeight: '70vh' }}>
        <p>You have been logged out successfully. See you next time!</p>
      </div >
    }
    {
      !shouldLogOut && <NotFoundPage />
    }
  </>
}
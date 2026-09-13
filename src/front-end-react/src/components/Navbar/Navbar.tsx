import { useEffect, useState, type JSX } from "react";
import type { MenuItem } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';
import useAuth from '../../hooks/useAuth';
import NavbarEnd from "../NavbarEnd/NavbarEnd";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default function Navbar(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const defaultItems: Array<MenuItem> = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'Employees',
      icon: 'pi pi-users',
      command: () => navigate('/employees'),
    }
  ];

  const [items, setItems] = useState<Array<MenuItem>>([...defaultItems]);

  useEffect(() => {
    if (!isAuthenticated) {
      setItems([...defaultItems, {
        label: 'Login',
        icon: 'pi pi-sign-in',
        command: () => navigate('/login'),
      }]);
    } else {
      const links = [{
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => navigate('/logout'),
      }]

      if (AuthService.isAdmin(user)) {
        links.unshift({
          label: 'Admin panel',
          icon: 'pi pi-sign-out',
          command: () => navigate('/admin'),
        });
      }

      setItems([...defaultItems, ...links]);
    }
  }, [isAuthenticated]);

  const end = <NavbarEnd />;

  return (
    <Menubar model={items} end={end} />
  );
}
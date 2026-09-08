import { useEffect, useState, type JSX } from "react";
import type { MenuItem } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';
import useAuth from '../../hooks/useAuth';
import NavbarEnd from "../NavbarEnd/NavbarEnd";
import { useNavigate, type NavigateFunction } from "react-router-dom";

export default function Navbar(): JSX.Element {
  const { isAuthenticated } = useAuth();
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
      setItems([...defaultItems, {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => navigate('/logout'),
      }]);
    }
  }, [isAuthenticated]);

  const end = <NavbarEnd />;

  return (
    <Menubar model={items} end={end} />
  );
}
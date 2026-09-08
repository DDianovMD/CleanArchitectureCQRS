import { useEffect, useState, type JSX } from "react";
import type { MenuItem } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';
import useAuth from '../../hooks/useAuth';

export default function Navbar(): JSX.Element {
  const { isAuthenticated } = useAuth();
  const defaultItems: Array<MenuItem> = [
    {
      url: '/',
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      url: '/employees',
      label: 'Employees',
      icon: 'pi pi-users',
    }
  ];

  const [items, setItems] = useState<Array<MenuItem>>([...defaultItems]);

  useEffect(() => {
    if (!isAuthenticated) {
      setItems([...defaultItems, {
        url: '/login',
        label: 'Login',
        icon: 'pi pi-sign-in',
      }]);
    } else {
      setItems([...defaultItems, {
        url: '/logout',
        label: 'Logout',
        icon: 'pi pi-sign-out',
      }]);
    }
  }, [isAuthenticated]);

  return (
    <Menubar model={items} />
  );
}
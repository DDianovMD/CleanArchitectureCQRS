import type { JSX } from "react";
import type { MenuItem } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';

export default function Navbar(): JSX.Element {
  const items: Array<MenuItem> = [
    {
      url: '/',
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      url: '/employees',
      label: 'Employees',
      icon: 'pi pi-users',
    },
    {
      url: '/login',
      label: 'Login',
      icon: 'pi pi-sign-in', // TODO: Make this a logout button when the user is logged in
    },
  ]

  return (
    <Menubar model={items} />
  );
}
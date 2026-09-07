import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import type { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

export default function App(): JSX.Element {
  const location = useLocation();

  return (
    <>
      <PrimeReactProvider>
        <nav></nav>
        <main>
          {
            location && location.pathname === '/'
              ? <div>Simple front end application for demo purposes.</div>
              : <Outlet />
          }
        </main>
        <footer></footer>
      </PrimeReactProvider>
    </>
  )
}

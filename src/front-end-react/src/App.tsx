import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import type { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/homepage/homepage';

export default function App(): JSX.Element {
  const location = useLocation();

  return (
    <>
      <PrimeReactProvider>
        <AuthProvider>
          <Navbar />
          <main>
            {
              location && location.pathname === '/'
                ? <Homepage />
                : <Outlet />
            }
          </main>
          <footer></footer>
        </AuthProvider>
      </PrimeReactProvider>
    </>
  )
}

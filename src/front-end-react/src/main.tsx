import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './pages/not-found/not-found.tsx';
import EmployeesPage from './pages/employees/employees.tsx';
import Login from './pages/login/login.tsx';
import Logout from './pages/logout/logout.tsx';
import EditEmployee from './pages/edit-employee/edit-employee.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "admin/edit-employee",
        element: <EditEmployee />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

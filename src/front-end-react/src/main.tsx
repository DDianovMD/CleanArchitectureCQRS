import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './pages/not-found/not-found.tsx';
import EmployeesPage from './pages/employees/employees.tsx';
import Login from './pages/login/login.tsx';
import Logout from './pages/logout/logout.tsx';
import AdminPanel from './pages/admin/admin-panel.tsx';
import AddEditEmployee from './pages/add-edit-employee/add-edit-employee.tsx';
import RestoreEmployee from './pages/restore-employee/restore-employee.tsx';

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
        path: "admin/",
        element: <AdminPanel />,
      },
      {
        path: "admin/add-employee",
        element: <AddEditEmployee />,
      },
      {
        path: "admin/edit-employee",
        element: <AddEditEmployee />,
      },
      {
        path: "admin/restore-employee",
        element: <RestoreEmployee />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

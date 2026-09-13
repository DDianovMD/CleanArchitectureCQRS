import './restore-employee.css';
import type { Employee } from '../../interfaces/Employee';
import axiosInstance from '../../services/ApiService';
import { useEffect, useRef, useState, type JSX } from "react";
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import AuthService from '../../services/AuthService';
import { Button } from 'primereact/button';
import useAuth from '../../hooks/useAuth';
import { Toast } from 'primereact/toast';

export default function RestoreEmployee(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const toast = useRef<Toast>(null);

  if (!user && isAuthenticated == false || !AuthService.isAdmin(user!)) {
    return <>Access denied!</>
  }

  const [deletedEmployees, setDeletedEmployees] = useState<Array<Employee>>([]);

  async function fetchDeletedEmployees(): Promise<void> {
    let employees: Array<Employee> = [];

    try {
      const response = await axiosInstance.get<Array<Employee>>('/employee/deleted');
      if (response.status === 200) {
        employees = response.data;
        setDeletedEmployees((_: Array<Employee>) => {
          return employees;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function restoreDeletedEmployee(userId: string): Promise<void> {
    try {
      const response = await axiosInstance.put('/employee/restore', {
        id: userId
      });

      if (response.status === 200) {
        const deletedEmployee = deletedEmployees.find(employee => employee.id === userId);
        setDeletedEmployees(deletedEmployees.filter(employee => employee.id !== deletedEmployee?.id));
        toast?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: `Employee ${deletedEmployee?.firstName} ${deletedEmployee?.lastName} restored successfully.`,
          life: 3000,
        });
      }
    } catch (error) {
      toast?.current?.show({
        severity: 'error',
        summary: 'Error!',
        detail: `Unexpected error occurred. Please try again later.`,
        life: 3000,
      });
    }
  }

  const confirmRestore = (userId: string) => {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => restoreDeletedEmployee(userId),
      reject: () => { }
    });
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchDeletedEmployees();
    }

    loadInitialData();
  }, []);

  return <>
    <div className='restore-employee-container flex-column-center'>
      <Toast ref={toast} />
      <ConfirmDialog />
      {
        deletedEmployees.map((employee: Employee, index: number) => {
          return <div key={index} className='flex-row-center deleted-user'>
            <span className='name-container'>{employee.firstName} {employee.lastName}</span>
            <Button label='Restore' onClick={() => confirmRestore(employee.id)} severity='success' icon='pi pi-sync' />
          </div>
        })
      }
      {
        deletedEmployees.length === 0 && <div className='flex-column-center'>
          <p>Currently there aren't deleted employees.</p>
        </div>
      }
      <Button label='Go back' onClick={() => navigate('/admin')} className='go-back-btn' />
    </div>
  </>
}
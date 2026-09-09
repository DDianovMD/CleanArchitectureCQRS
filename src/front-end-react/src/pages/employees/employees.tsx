import "./employees.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState, type JSX } from "react";
import axiosInstance from "../../services/ApiService";
import type { Employee } from "../../interfaces/Employee";
import { Skeleton } from "primereact/skeleton";
import { ContextMenu } from "primereact/contextmenu";
import { Toast } from "primereact/toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate, type NavigateFunction } from "react-router-dom";

export default function EmployeesPage(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const contextMenu = useRef<ContextMenu>(null);
  const toast = useRef<Toast>(null);
  const menuModel = [
    { label: 'Edit', icon: 'pi pi-fw pi-user-edit', command: () => editEmployee(selectedEmployee) },
    { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => deleteEmployee(selectedEmployee) }
  ];

  function isAdminUser(): boolean {
    return isAuthenticated && user?.preferred_username === 'admin';
  }

  function editEmployee(employee: Employee | null): void {
    if (!isAdminUser()) {
      toast?.current?.show({
        severity: 'warn',
        summary: 'Access denied!',
        detail: `You do not have permissions to edit records. 
        Please contact your system administrator for assistance.`,
        life: 3000,
      });

      return;
    }

    navigate({
      pathname: "/admin/edit-employee",
      search: `?id=${employee?.id}`,
      hash: "",
    }, {
      state: { employee },
    },
    );
  };

  async function deleteEmployee(employee: Employee | null): Promise<void> {
    if (!isAdminUser()) {
      toast?.current?.show({
        severity: 'error',
        summary: 'Access denied!',
        detail: `You do not have permissions to delete records. 
        Please contact your system administrator for assistance.`,
        life: 3000,
      });

      return;
    }

    try {
      const deleteResponse = await axiosInstance.delete(`/employee/${employee?.id}`);

      if (deleteResponse.status === 204) { // No content
        setEmployees((previous: Array<Employee>) => {
          return previous.filter(entity => entity.id !== employee?.id);
        });

        toast?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: `User ${employee?.firstName} ${employee?.lastName} deleted successfully.`,
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
  };

  async function fetchEmployees(): Promise<void> {
    setLoading(true);
    const response = await axiosInstance.get<Array<Employee>>('/employee');
    setEmployees(response.data);

    setTimeout(() => {
      setLoading(false);
    }, 2500); // Simulate a delay for loading state
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchEmployees();
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchInitialData();
  }, []);

  const skeletonTableStyle: { width: string } = { width: '25%' };

  return <div className="employees-page-container">
    {
      loading && <DataTable value={employees} stripedRows>
        <Column field="id" header="Id" style={skeletonTableStyle} body={<Skeleton />}></Column>
        <Column field="firstName" header="First name" style={skeletonTableStyle} body={<Skeleton />}></Column>
        <Column field="lastName" header="Last name" style={skeletonTableStyle} body={<Skeleton />}></Column>
        <Column field="address" header="Address" style={skeletonTableStyle} body={<Skeleton />}></Column>
      </DataTable>
    }
    {
      !loading && <>
        <Toast ref={toast} />
        <ContextMenu model={menuModel} ref={contextMenu} onHide={() => setSelectedEmployee(null)} />
        <DataTable value={employees} stripedRows tableStyle={{ minWidth: '50rem' }}
          onContextMenu={(e) => contextMenu.current?.show(e.originalEvent)}
          contextMenuSelection={selectedEmployee!}
          onContextMenuSelectionChange={(e) => setSelectedEmployee(e.value)}
        >
          <Column field="id" header="Id"></Column>
          <Column field="firstName" header="First name"></Column>
          <Column field="lastName" header="Last name"></Column>
          <Column field="address" header="Address"></Column>
        </DataTable>
      </>
    }
  </div>
}
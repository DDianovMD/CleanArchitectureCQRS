import "./employees.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState, type JSX } from "react";
import axiosInstance from "../../services/ApiService";
import type { Employee } from "../../interfaces/Employee";
import { Skeleton } from "primereact/skeleton";

export default function EmployeesPage(): JSX.Element {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchEmployees() {
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

  return <div className="employees-page-container">
    {
      loading && <DataTable value={employees} stripedRows>
        <Column field="id" header="Id" style={{ width: '25%' }} body={<Skeleton />}></Column>
        <Column field="firstName" header="First name" style={{ width: '25%' }} body={<Skeleton />}></Column>
        <Column field="lastName" header="Last name" style={{ width: '25%' }} body={<Skeleton />}></Column>
        <Column field="address" header="Address" style={{ width: '25%' }} body={<Skeleton />}></Column>
      </DataTable>
    }
    {
      !loading && <DataTable value={employees} stripedRows tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id"></Column>
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        <Column field="address" header="Address"></Column>
      </DataTable>
    }
  </div>
}
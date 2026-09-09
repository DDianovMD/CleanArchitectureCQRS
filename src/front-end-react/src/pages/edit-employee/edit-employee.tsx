import { type JSX } from 'react'
import { useLocation } from 'react-router-dom'
import type { Employee } from '../../interfaces/Employee';

export default function EditEmployee(): JSX.Element {
  const location = useLocation();
  const employee: Employee = (location as any).state.employee;
  console.log(employee);

  return (
    <div>TODO</div>
  )
}

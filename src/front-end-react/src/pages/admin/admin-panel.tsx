import './admin-panel.css';
import type { JSX } from "react";
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { Card } from 'primereact/card';
import useAuth from '../../hooks/useAuth';
import AuthService from '../../services/AuthService';

export default function AdminPanel(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  if (!user && isAuthenticated == false || !AuthService.isAdmin(user!)) {
    return <>Access denied!</>
  }

  const addUser: JSX.Element = <p>Add user</p>;
  const restoreUser: JSX.Element = <p>Restore user</p>;
  const plusIcon: string = 'pi pi-user-plus';
  const restoreIcon: string = 'pi pi-sync';

  return <>
    <div className="admin-panel-container flex-row-center">
      {Array.from([1, 2]).map((_: number, i: number) => {
        return <Card key={i}
          header={i == 0 ? addUser : restoreUser}
          className='card'
          onClick={(e) => {
            if (i === 0) {
              navigate('/admin/add-employee');
            } else {
              navigate('/admin/restore-employee');
            }
          }}
        >
          <div className='flex-row-center'>
            <i
              className={`${i == 0 ? plusIcon : restoreIcon} card-icon`}>
            </i>
          </div>
        </Card>
      })}
    </div >
  </>
}
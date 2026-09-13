import './access-denied.css';
import accessDenied from '../../assets/access-denied.png';
import type { JSX } from "react";
import { Avatar } from "primereact/avatar";

export default function AccessDenied(): JSX.Element {
  return <div className="flex-column-center">
    <Avatar image={accessDenied} imageAlt='Access denied!' className='access-denied' />
  </div>
}
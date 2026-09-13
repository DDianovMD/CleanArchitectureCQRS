import './navbar-end.css';
import { type JSX } from 'react';
import hackerImage from '../../assets/hacker.png';
import guestUserImage from '../../assets/guestUser.png';
import regularUserImage from '../../assets/regularUser.png';
import { Avatar } from 'primereact/avatar';
import useAuth from '../../hooks/useAuth';

export default function NavbarEnd(): JSX.Element {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="avatar-container">
      <Avatar
        image={!isAuthenticated || !user
          ? guestUserImage
          : user.preferred_username === 'admin'
            ? hackerImage
            : regularUserImage} shape="circle" />
      <div>
        {user?.preferred_username ?? 'Guest'}
      </div>
    </div>
  )
}
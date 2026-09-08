import './login.css';
import React, { useState, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import axiosInstance from '../../services/ApiService';
import { FloatLabel } from 'primereact/floatlabel';
import useAuth from '../../hooks/useAuth';

interface LoginResponse {
  "access_token": string;
  "refresh_token": string;
}

export default function Login(): JSX.Element {
  const { user, isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <>
      <p>You are already logged in as {user?.preferred_username}. Please log out first to log in with a different account.</p>
    </>
  }

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        username,
        password,
      });

      const { access_token, refresh_token } = response.data;
      login(access_token, refresh_token);

      // Redirect to dashboard or home page
      navigate('/');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Invalid username or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Card title="Sign In" className="card">
        <form className="login-form">
          {error && <Message severity="error" text={error} className="mb-3" />}

          <FloatLabel>
            <InputText
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
            <label htmlFor="username">Username</label>
          </FloatLabel>

          <FloatLabel>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
              required
              className="input-field"
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>
        </form>

        <Button
          type="button"
          label="Log In"
          icon="pi pi-sign-in"
          loading={loading}
          onClick={async (e) => { await handleLogin(e) }}
          className="login-btn"
        />
      </Card>
    </div>
  );
}
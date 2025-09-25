import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import api from './api.js';
import './App.css'

export default function App() {
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);
  const [authError,setAuthError] = useState('');
  const [authMode,setAuthMode] = useState('login');
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  },[]);

  const loginHandler = async(email,password) => {
    setAuthError('');
    try {
      const data = await api.login(email,password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('authToken',data.token);
      localStorage.setItem('authUser',JSON.stringify(data.user));
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const registerHandler = async(name,email,password,role) => {
    setAuthError('');
    try {
      const data = await api.register(name, email, password, role);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 text-xl">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
        {user ? (
            <Dashboard user={user} token={token} onLogout={logoutHandler} />
        ) : authMode === 'login' ? (
            <LoginPage onLogin={loginHandler} error={authError} onSwitchMode={() => setAuthMode('signup')} />
        ) : (
            <SignupPage onRegister={registerHandler} error={authError} onSwitchMode={() => setAuthMode('login')} />
        )}
    </div>
  );
}
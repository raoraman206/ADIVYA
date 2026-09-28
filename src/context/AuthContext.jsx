import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('tribal_auth_user_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [activeRole, setActiveRole] = useState(() => {
    return currentUser?.role || 'applicant';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tribal_auth_user_v2', JSON.stringify(currentUser));
      setActiveRole(currentUser.role);
    } else {
      localStorage.removeItem('tribal_auth_user_v2');
    }
  }, [currentUser]);

  const loginApplicant = (identifier = '') => {
    let user;
    if (typeof identifier === 'object' && identifier !== null) {
      user = {
        id: identifier.id || identifier.email || 'APPLICANT-SESSION',
        name: identifier.name || 'Applicant',
        email: identifier.email || '',
        phone: identifier.phone || '',
        role: 'applicant',
        hasDeficiency: false
      };
    } else {
      user = {
        id: identifier || 'APPLICANT-SESSION',
        name: identifier ? identifier.split('@')[0] : 'Applicant',
        role: 'applicant',
        hasDeficiency: false
      };
    }
    setCurrentUser(user);
    setActiveRole('applicant');
  };

  const loginAdmin = (officerId = '') => {
    const user = {
      id: officerId || 'OFFICER-SSO',
      name: 'Scrutiny Officer',
      role: 'admin',
      designation: 'Scrutiny Officer',
      department: 'Adivya Administration',
      email: officerId ? `${officerId}@adivya.gov.in` : 'admin@adivya.gov.in'
    };
    setCurrentUser(user);
    setActiveRole('admin');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetAllDemoData = async () => {
    await api.resetToDefaultData();
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole,
        loginApplicant,
        loginAdmin,
        logout,
        resetAllDemoData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

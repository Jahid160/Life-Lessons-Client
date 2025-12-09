import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
  const authInfo = {
    name: 'Jahid'
  }
  return (
    <AuthContext value={authInfo}>
            {children}
        </AuthContext>
  );
};

export default AuthProvider;
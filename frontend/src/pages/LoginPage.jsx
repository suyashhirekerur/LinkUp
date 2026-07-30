import React from 'react';
import useAuthStore from '../store/useAuthStore.js';

function LoginPage() {
  const { authUser, isCheckingAuth } = useAuthStore();

  return (
    <div>Login Page</div>
  );
}

export default LoginPage
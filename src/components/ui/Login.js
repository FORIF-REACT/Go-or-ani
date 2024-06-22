import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebase';

function Login() {
  const { user, signIn, signOutUser } = useAuth();

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center">
          <span className="text-primary-green-300 mr-2">
            {user.displayName}
          </span>
          <button
            onClick={signOutUser}
            className="text-primary-green-300 hover:text-green-500 text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={signIn}
          className="text-primary-green-300 hover:text-green-500 text-sm font-medium"
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default Login;
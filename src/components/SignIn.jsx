import React from 'react';
import { signInWithGoogle } from '../firebase';

const SignIn = () => (
  <form className="SignIn">
    <h2>Sign In</h2>

    <button
      onClick={e => {
        e.preventDefault();
        signInWithGoogle();
      }}
    >
      Sign In With Google
    </button>
  </form>
);

export default SignIn;

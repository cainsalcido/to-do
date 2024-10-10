// src/auth.js
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Auth = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser (user);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } else {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return (
      <div>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
        <p>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <a href="#" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Register'}
          </a>
        </p>
      </div>
    );
  }

  return children;
};

export default Auth;
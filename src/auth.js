import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#" onClick={() => alert('Register feature not implemented yet!')}>Register</a></p>
      </div>
    );
  }

  return children;
};

export default Auth;
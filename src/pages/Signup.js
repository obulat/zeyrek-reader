import React, { useRef } from "react";
import { useAuth } from '../use-auth';
import { Redirect } from 'react-router-dom';

const Signup = () => {
  const auth = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function submitSignupForm(e) {
    e.preventDefault();
    const email = emailRef.current;
    const password = passwordRef.current;
    const em = email.value;
    const p = password.value;
    auth.signup(em,p);
  }

    return auth.user ? <Redirect to='/' /> : (
    <div className="auth-container">
      <p> Please signup </p>
      <form className="auth-form" onSubmit={submitSignupForm}>
        <label>
          <span>Email:</span>
          <input type="email" placeholder="user@email.com" ref={emailRef} required />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" ref={passwordRef} required/>
        </label>
        <button className="button" type="submit">Signup</button>
      </form>
      <p className="sep"><span className="sep-text">or </span></p>
      <button className="button" type="button" onClick={auth.loginG}>Sign up with Google</button>
    </div>
    )
};
export default Signup;

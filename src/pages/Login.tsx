import React, { useRef } from "react";
import { useAuth } from '../use-auth';
import {Redirect} from "react-router-dom";

function Login(): JSX.Element {

  const {user, login, loginG} = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  function submitLoginForm(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = emailRef.current;
    const password = passwordRef.current;
    if (email && password) {
      const em = (email as HTMLInputElement).value;
      const p = (password as HTMLInputElement).value;
      login?.(em,p);
    }

  }
  return user ? <Redirect to='/' /> : (
    <div className="auth-container">
      <p> Please login </p>
      <form className="auth-form" onSubmit={submitLoginForm}>
        <label>
          <span>Email:</span>
          <input type="email" placeholder="user@email.com" ref={emailRef} required/>
        </label>
        <label>
          <span>Password:</span>
          <input type="password" ref={passwordRef} required/>
        </label>
        <button className="button" type="submit">Login</button>
      </form>
      <p className="sep"><span className="sep-text">or </span></p>
      <button className="button" onClick={loginG}>Login with Google</button>
    </div>
  );
}
export default Login;

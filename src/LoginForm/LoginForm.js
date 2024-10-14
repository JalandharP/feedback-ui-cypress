import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../apiCalls';
import './LoginForm.css';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    return !!(email.trim() && password.trim());
  }

  const signInUser = async e => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const user = await login({ email, password });
        props.updateUser(user);
        navigate('/dashboard')
      } catch ({ message }) {
        setEmail('')
        setPassword('')
        setErrorMsg(message)
      }
    } else {
      setErrorMsg('Please fill out both inputs.')
    }
  }

  return (
    <form>
      <h2>Please Sign In</h2>
      <label>
        Email
      <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password
      <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {errorMsg && <p>{errorMsg}</p>}
      <button onClick={(event) => signInUser(event)}>
        Login
      </button>
    </form>
  )
}

export default LoginForm;
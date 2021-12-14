import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import { login } from '../../store/session';
import DemoButton from './DemoButton';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='loginFormWrapper'>
      <div className='loginFormLeft' style={{backgroundImage: 'url(https://wyl-greenarrow.s3.us-west-1.amazonaws.com/LoginForm.jpeg)'}}></div>
      <div className='loginFormRight'>
        <div className='loginFormWelcome'>Welcome to GreenArrow</div>
        <form className='loginFormForm' onSubmit={onLogin}>
          <div className='loginFormEmailSection'>
            <label className='loginFormLabel' htmlFor='email'>Email</label>
            <input
              className='loginFormInput'
              name='email'
              type='text'
              // placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='loginFormPasswordSection'>
            <label className='loginFormLabel' htmlFor='password'>Password</label>
            <input
              className='loginFormInput'
              name='password'
              type='password'
              // placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='loginFormForgot' >Forgot your password?</div>
          <div className='loginFormErrorContainer'>
            {errors.map((error, ind) => (
              <div className='loginFormError' key={ind}>{error}</div>
            ))}
          </div>
          <div className='loginFormButtonContainer'>
            <button className='loginFormButton' type='submit'>Sign In</button>
          </div>
          <div className='loginFormCreateAccount'>
            Not on GreenArrow?
            <NavLink className='loginFormCreateAccountLink' to='/sign-up' exact={true} activeClassName='active'> Create an account</NavLink>
          </div>
        </form>
        <DemoButton />
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';

import { signUp, login } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const buying_power = 1000000;
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, buying_power));
      if (data) {
        setErrors(data)
      }
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('warrenbuffett@aa.io', 'password'));
    if (data) {
      setErrors(data)
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signUpFormWrapper'>
      <div className='signUpFormLeft'>
        <div className='signUpFormLeftContainer'>
          <div className='signUpFormLogoContainer'>
            <img className='signUpFormLogoImage' src={'/images/logo.png'} alt='GreenArrow Logo'></img>
            <div className='signUpFormLogoText'>GreenArrow</div>
          </div>
          <div className='signUpFormHeaderContainer'>
            <div className='signUpFormHeader'>Get Your Million Dollars</div>
            <div className='signUpFormHeaderText'>GreenArrow lets you invest in companies you love, risk-free.</div>
          </div>
          <form className='signUpFormForm' onSubmit={onSignUp}>
            <div className='signUpFormFormDes'>Please enter your full legal name. Your legal name doesn't really have to match any form of goverment ID.</div>
            <div>
              <input
                className='signUpFormInput'
                type='text'
                name='username'
                placeholder='Full Name'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                className='signUpFormInput'
                type='text'
                name='email'
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                className='signUpFormInput'
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                className='signUpFormInput'
                type='password'
                name='repeat_password'
                placeholder='Reapeat Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className='signUpFormSubmitButton' type='submit'>Continue</button>
            <div className='signUpFormAlreadyStarted'>
              Already have an account?
              <NavLink className='signUpFormAlreadyStartedLink' to='/login' exact={true} activeClassName='active'> Log in here</NavLink>
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
          </form>
          <form onSubmit={handleDemoSubmit}>
            <button className='signUpFormDemoButton' type="submit">Demo</button>
          </form>
          <div className='signUpFormDisclosure'>
            <div className='signUpFormDisclosureDetail'>All investments involve risk, including the possible loss of principal. Investors should consider their investment objectives and risks carefully before investing.</div>
            <div className='signUpFormDisclosureDetail'>Commission-free trading means $0 commission trading on self-directed individual cash or margin brokerage accounts that trade U.S. listed securities via mobile devices or web. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see GreenArrow Financial’s fee schedule to learn more.</div>
            <div className='signUpFormDisclosureDetail'>Securities trading offered through GreenArrow Financial LLC. Brokerage clearing services offered through GreenArrow Securities, LLC. Both are subsidiaries of GreenArrow Markets, Inc.</div>
            <div className='signUpFormDisclosureDetail'>Check the background of GreenArrow Financial LLC and GreenArrow Securities, LLC on FINRA’s BrokerCheck.</div>
            <div className='signUpFormDisclosureDetail'>GreenArrow Terms & Conditions Disclosure Library Contact Us FAQ</div>
            <div className='signUpFormDisclosureDetail'>© 2021 GreenArrow. No rights reserved.</div>
          </div>
        </div>
      </div>
      <div className='signUpFormRight'>
        <div className='SignUpFormRightWrapper'>
          <div className='signUpformRightContainer'>
            <div className='signUpFormRightHeader'>Commission-free trading</div>
            <div className='signUpFormRightBody'>Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply. View our fee schedule to learn more.</div>
          </div>
          <div className='signUpformRightContainer'>
            <div className='signUpFormRightHeader'>Account Protection</div>
            <div className='signUpFormRightBody'>Robinhood Financial is a member of SIPC. Securities in your account protected up to $500,000. For details, please see www.sipc.org.</div>
          </div>
          <div className='signUpformRightContainer'>
            <div className='signUpFormRightHeader'>Stay on top of your portfolio</div>
            <div className='signUpFormRightBody'>Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default SignUpForm;

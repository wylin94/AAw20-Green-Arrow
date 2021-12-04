import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import { login } from '../../store/session';
import { Modal } from '../../context/Modal';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemoModal, setDemoModal] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  // const handleDemoSubmit = async (e) => {
  //   e.preventDefault();
  //   const demoEmail = ['jordanbelfort@wolfofwallstreet.com', 'warrenbuffett@birkshire.com', 'bernieMadoff@berniemadoffinvestmentsecurities.com'];
  //   const randomDemoEmail = demoEmail[Math.floor(Math.random() * demoEmail.length)];
  //   const data = await dispatch(login(randomDemoEmail, 'password'));
  //   if (data) {
  //     setErrors(data)
  //   }
  // }

  const handleDemoBernieSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('bernieMadoff@berniemadoffinvestmentsecurities.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

  const handleDemoElonSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('elonmusk@tesla.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

  const handleDemoJordanSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('jordanbelfort@wolfofwallstreet.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

  const handleDemoWarrenSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('warrenbuffett@berkshirehathaway.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

  const handleDemoWallStreetBetsSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('WallStreetBets@reddit.com', 'password'));
    if (data) {
      setErrors(data)
    };
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
          {/* <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> */}
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
          <button className='loginFormButton' type='submit'>Sign In</button>
          <div className='loginFormCreateAccount'>
            Not on GreenArrow?
            <NavLink className='loginFormCreateAccountLink' to='/sign-up' exact={true} activeClassName='active'> Create an account</NavLink>
          </div>
        </form>

        <button className='loginFormDemoButton' onClick={() => setDemoModal(true)}>Demo</button>
        {showDemoModal && (
          <Modal onClose={() => setDemoModal(false)}>
            <div className='signUpDemoModalContainer'>
              <div className='signUpDemoModalHeader'>Choose Your Demo Login</div>

              <div className='signUpDemoModalItem' onClick={handleDemoBernieSubmit}>
                <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-BernieMadoff.jpeg' alt='Warren Buffett'></img>
                <div className='signUpDemoModalBody'>
                  <div className='signUpDemoModalName'>Bernie Madoff</div>
                  <div className='signUpDemoModalMotto'>The whole government is a Ponzi scheme!</div>
                </div>
              </div>

              <div className='signUpDemoModalItem' onClick={handleDemoElonSubmit}>
                <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-ElonMusk.jpg' alt='Bernie Madoff'></img>
                <div className='signUpDemoModalBody'>
                  <div className='signUpDemoModalName'>Elon Musk</div>
                  <div className='signUpDemoModalMotto'>Am considering taking Tesla private at $420. Funding secured.</div>
                </div>
              </div>

              <div className='signUpDemoModalItem' onClick={handleDemoJordanSubmit}>
                <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-JordanBelfort.jpeg' alt='Warren Buffett'></img>
                <div className='signUpDemoModalBody'>
                  <div className='signUpDemoModalName'>Jordan Belfort</div>
                  <div className='signUpDemoModalMotto'>Sell me this pen.</div>
                </div>
              </div>

              <div className='signUpDemoModalItem' onClick={handleDemoWarrenSubmit}>
                <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-WarrenBuffett.jpeg' alt='Warren Buffett'></img>
                <div className='signUpDemoModalBody'>
                  <div className='signUpDemoModalName'>Warren Buffett</div>
                  <div className='signUpDemoModalMotto'>It’s far better to buy a wonderful company at a fair price, than a fair company at a wonderful price.</div>
                </div>
              </div>

              <div className='signUpDemoModalItem' onClick={handleDemoWallStreetBetsSubmit}>
                <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-WallStreetBets.jpg' alt='WallStreetBets'></img>
                <div className='signUpDemoModalBody'>
                  <div className='signUpDemoModalName'>WallStreetBets</div>
                  <div className='signUpDemoModalMotto'>Send Robinhood to the ground and GME to the moon!!! Oh wait... this is GreenArrow.</div>
                </div>
              </div>

              <button className='signUpDemoModalCloseButton' onClick={() => {setDemoModal(false)}}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LoginForm;

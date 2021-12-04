import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import { signUp, login } from '../../store/session';
import { Modal } from '../../context/Modal';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [showDemoModal, setDemoModal] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const buying_power = 1000000;
    const profile_image = 'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/Avatar.png';
    if (password === repeatPassword) {
      setPasswordNotMatch(false);
      const data = await dispatch(signUp(username, email, password, buying_power, profile_image));
      if (data) {
        setErrors(data)
      };
    } else {
      setPasswordNotMatch(true);
    };
  };

  // const handleDemoSubmit = async (e) => {
  //   e.preventDefault();
  //   const demoEmail = ['jordanbelfort@wolfofwallstreet.com', 'warrenbuffett@birkshire.com', 'bernieMadoff@berniemadoffinvestmentsecurities.com'];
  //   const randomDemoEmail = demoEmail[Math.floor(Math.random() * demoEmail.length)];
  //   const data = await dispatch(login(randomDemoEmail, 'password'));
  //   if (data) {
  //     setErrors(data)
  //   };
  // };

  const handleDemoJordanSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('jordanbelfort@wolfofwallstreet.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

  const handleDemoWarrenSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('warrenbuffett@birkshire.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

  const handleDemoBernieSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('bernieMadoff@berniemadoffinvestmentsecurities.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

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
  };

  return (
    <div className='signUpFormWrapper'>
      <div className='signUpFormLeft'>
        <div className='signUpFormLeftContainer'>
          <div className='signUpFormLogoContainer'>
            <img className='signUpFormLogoImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/logo.png'} alt='GreenArrow Logo'></img>
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
            <div className='signUpFormErrorContainer'>
              {errors.map((error, ind) => (
                <div className='signUpFormError' key={ind}>{error}</div>
              ))}
              {passwordNotMatch && <div className='signUpFormError'>password: Password do not match</div>}
            </div>
            <button className='signUpFormSubmitButton' type='submit'>Continue</button>
            <div className='signUpFormAlreadyStarted'>
              Already have an account?
              <NavLink className='signUpFormAlreadyStartedLink' to='/login' exact={true} activeClassName='active'> Log in here</NavLink>
            </div>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
          </form>
          <button className='signUpFormDemoButton' onClick={() => setDemoModal(true)}>Demo</button>
          {showDemoModal && (
            <Modal onClose={() => setDemoModal(false)}>
              <div className='signUpDemoModalContainer'>
                <div className='signUpDemoModalHeader'>Choose Your Demo Login</div>
                <div className='signUpDemoModalItem' onClick={handleDemoJordanSubmit}>
                  <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-JordanBelfort.jpeg' alt='Warren Buffett'></img>
                  <div className='signUpDemoModalBody'>
                    <div className='signUpDemoModalName'>Jordan Belfort</div>
                    <div className='signUpDemoModalMotto'>Sell me this pen</div>
                  </div>
                </div>
                <div className='signUpDemoModalItem' onClick={handleDemoWarrenSubmit}>
                  <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-WarrenBuffett.jpeg' alt='Warren Buffett'></img>
                  <div className='signUpDemoModalBody'>
                    <div className='signUpDemoModalName'>Warren Buffett</div>
                    <div className='signUpDemoModalMotto'>It’s far better to buy a wonderful company at a fair price, than a fair company at a wonderful price.</div>
                  </div>
                </div>
                <div className='signUpDemoModalItem' onClick={handleDemoBernieSubmit}>
                  <img className='signUpDemoModalImage' src='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-BernieMadoff.jpeg' alt='Warren Buffett'></img>
                  <div className='signUpDemoModalBody'>
                    <div className='signUpDemoModalName'>Bernie Madoff</div>
                    <div className='signUpDemoModalMotto'>The whole government is a Ponzi scheme!</div>
                  </div>
                </div>
                <button className='signUpDemoModalCloseButton' onClick={() => {setDemoModal(false)}}>Cancel</button>
              </div>
            </Modal>
          )}
          <div className='signUpFormDisclosure'>
            <div className='signUpFormDisclosureDetail'>Q: How do you thank Green Arrow for saving your life? A: With greenbacks! Q: How does Green Arrow know he's been cuckolded by Batman? A: When Canarys hatch a few Robins Q: What's the difference between Green Arrow and a unicorn? A: Nothing, they're both fictional characters Q: What did Catwoman say to Green Arrow? A: "You make me quiver." Q: What did Green Arrow say to Spider Man? A: "Don't bug me." Q: Why did Green Arrow flush the toilet? A: Because it was his duty! Q: What did Green Arrow say when he hit a bull? A: I got a bullseye. Q: What does Green Arrow wear with his suit? A: A bow tie. Q: What does Green Arrow put in his beverages? A: Just ice.</div>
            <div className='signUpFormDisclosureDetail'>© 2021 GreenArrow. All rights reserved.</div>
          </div>
        </div>
      </div>
      <div className='signUpFormRight'>
        <div className='SignUpFormRightWrapper'>
          <div className='signUpformRightContainer'>
            <div className='signUpFormRightHeader'>Risk-free trading</div>
            <div className='signUpFormRightBody'>Break free from risks and make unlimited risk-free trades in stocks with GreenArrow Financial. No fees may apply. View our splash page to learn more.</div>
          </div>
          <div className='signUpformRightContainer'>
            <div className='signUpFormRightHeader'>Account Protection</div>
            <div className='signUpFormRightBody'>GreenArrow Financial is not a member of SIPC. Securities in your account is not real so there is no need for SIPC. If you played the game Monopoly before, you know what it means. For details, please see <a href='https://en.wikipedia.org/wiki/Monopoly_money'>Monopoly money</a>.</div>
          </div>
          <div className='signUpformRightContainer'>
            <div className='signUpFormRightHeader'>Stay on top of your portfolio</div>
            <div className='signUpFormRightBody'>Set up customized watchlist  to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

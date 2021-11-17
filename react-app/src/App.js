import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User/User';
import Portfolio from './components/Portfolio';
import Splash from './components/Splash';
import StockDetail from './components/StockDetail';
import { authenticate } from './store/session';
// import { getPortfolios } from './store/portfolio';
// import { getWatchlists } from './store/watchlist';

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      // await dispatch(getPortfolios());
      // await dispatch(getWatchlists());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/stocks/:ticker' exact={true} >
          <StockDetail/>
        </ProtectedRoute>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          {sessionUser? (<Portfolio/>) : (<Splash/>)}
        </Route>

        <Route>
					<div>Page not found</div>
				</Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;

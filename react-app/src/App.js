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
import PageNotFound from './components/PageNotFound';
import { authenticate } from './store/session';
import { getAllStock } from './store/stock';
import { getPortfolios } from './store/portfolio';
import { getWatchlists } from './store/watchlist';

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/stocks/:ticker' exact={true} >
          <NavBar />
          <StockDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <NavBar />
          {sessionUser ? (<Portfolio />):(<Splash />)}
        </Route>
        <Route>
          <NavBar />
					<PageNotFound />
				</Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;

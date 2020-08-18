import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from './contexts/auth0-context';

function App() {
  const { getToken } = useAuth0();
  //console.log(auth0);

  useEffect(() => {
    getUserData()
  }, []);

  //We might need it for backend (to get user data)

  async function getUserData() {

    const token = await getToken();

    console.log(token);

    const response = await fetch(`http://example.com/api?api_token=${token}`);
    const data = await response.json();

    //We have data

  }
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

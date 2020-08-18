import React, { useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth0Context } from './contexts/auth0-context';

function App() {
  const auth0 = useContext(Auth0Context);
  console.log(auth0);
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

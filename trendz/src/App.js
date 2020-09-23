import React from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './Pages/Home'
import ReactGA from 'react-ga';
function initializeReactGA() {
  ReactGA.initialize('UA-178885917-1');
  ReactGA.pageview('/Home');
}
function App() {
  return (
    <div >
      <Router>
        <Route exact path="/" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;

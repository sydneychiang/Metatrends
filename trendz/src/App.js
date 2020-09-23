import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './Pages/Home'
import ReactGA from 'react-ga';

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-178885917-1')
    ReactGA.pageview('/')
  }, [])
  return (
    <div >
      <Router>
        <Route exact path="/" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;

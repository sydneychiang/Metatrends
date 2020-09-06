import React from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './Components/Home'

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

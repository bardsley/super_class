import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'

import './index.css';
import Header from './Header'
import Menu from './Menu'
import App from './App';
import Login from './Login';


import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
  <Router>
    <div className="mdl-layout mdl-js-layout">
      <Route path="/" component={Header} />
      <Route path="/" component={Menu}/>
      <Route path="/" exact component={App} />
      <Route path="/login" exact component={Login} />
    </div>
  </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

let deferredPrompt;



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register({'serviceWorkerInDev': true});
serviceWorker.register();

let btnAdd = document.getElementById('install')

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    btnAdd.style.display = "block"
  });

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });

  window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs', 'installed');
  });
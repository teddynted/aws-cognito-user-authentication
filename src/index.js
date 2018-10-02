import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import Amplify from "aws-amplify";
import cognito from "./cognito";
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
const history = createBrowserHistory();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: cognito.cognito.REGION,
    userPoolId: cognito.cognito.USER_POOL_ID,
    identityPoolId: cognito.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: cognito.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
  </Provider>, document.querySelector('.container'));
serviceWorker.unregister();

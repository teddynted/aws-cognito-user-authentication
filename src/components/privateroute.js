import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { loggedIn, component: Component, ...rest } = this.props;
    if( loggedIn ) {
      return <Route {...rest} render={ (props) => 
        <Component {...props } />
      } />
    } else {
      return <Route {...rest} render={ (props) => 
        <Redirect to={{ pathname: '/login', state: { from: props.location }} } /> 
      } />
    }
  }
}

export default PrivateRoute;
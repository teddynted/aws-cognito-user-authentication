import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutRequest, requestSession } from '../actions/index';
import NotFound from "../components/notfound";
import Login from './login';
import Home from '../components/home';
import Signup from "./signup";

class Header extends Component {
    handleLogout = async event => {
        this.props.logoutRequest();
        this.props.history.push('/login');
    }
    render(){
        return(
           <div>
                <div className="col-lg-12">
                   <nav className="navbar navbar-light bg-light">
                      <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand bold color" to="/">Kitabu</Link>
                      </div>
                      <div id="navbar" className="navbar-collapse collapse">
                        {
                            this.props.session ?
                            <ul className="nav navbar-nav navbar-right main-nav">
                                <li><a href="/" className="link active color logout" onClick={this.handleLogout}>Logout</a></li>
                            </ul> :
                            <ul className="nav navbar-nav navbar-right main-nav">
                                <li><Link className="link active color" to="/login">Login</Link></li>
                                <li><Link className="link color" to="/signup">Sign Up</Link></li>
                            </ul>
                        }
                      </div>
                    </nav>
                </div>
                <div className="col-lg-12">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    { /* Catch all unmatched routes */ }
                    <Route component={NotFound} />
                  </Switch>
                </div>
           </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( { logoutRequest, requestSession }, dispatch);
const mapStateToProps = ({ session }) => ({ session });

export default withRouter(
    connect(mapStateToProps,mapDispatchToProps)(Header)
);
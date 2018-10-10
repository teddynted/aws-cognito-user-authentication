import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutRequest, requestSession } from '../actions/index';
import NotFound from "../components/notfound";
import Login from './login';
import Home from '../components/home';
import Signup from "./signup";
import "./header.css";

class Header extends Component {
    handleLogout = async event => {
        this.props.logoutRequest();
        this.props.history.push('/login');
    }
    render(){
        console.log(this.props.session);
        return(
           <div className="col-lg-12">
                <div className="row">
                   <div className="col-lg-12 bg-light border-bottom">
                    <div className="row">
                       <div className="col-md-6">
                         <Link className="identity" to="/">AWS Authentication</Link>
                       </div>
                       <div className="col-md-6 text-right">
                        { this.props.session === true ?
                         <ul className="main-nav">
                             <li><a href="/" className="link active color logout" onClick=   {this.handleLogout}>Logout</a></li>
                             <div className="clearfix"></div>
                         </ul> :
                         <ul className="main-nav">
                             <li><Link className="link active color"    to="/login">Login</Link></li>
                             <li><Link className="link color" to="/signup">Sign    Up</Link></li>
                             <div className="clearfix"></div>
                         </ul>}
                       </div>
                    </div>
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
                
           </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( { logoutRequest, requestSession }, dispatch);
const mapStateToProps = ({ session }) => ({ session });

export default withRouter(
    connect(mapStateToProps,mapDispatchToProps)(Header)
);
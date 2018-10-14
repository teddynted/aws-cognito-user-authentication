import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutRequest, requestSession } from '../actions/index';
import PrivateRoute from "../components/privateroute";
import NotFound from "../components/notfound";
import Login from './login';
import Home from './home';
import Signup from "./signup";
import "./header.css";

class Header extends Component {
    constructor(props){
       super(props);
       this.state = { session: false };
    }
    componentWillMount(){
        this.props.requestSession();
    }
    handleLogout = async event => {
        this.props.logoutRequest();
    }
    componentDidUpdate(prevProps, prevState) {
        if( prevProps.session !== this.props.session ){
            this.setState({ session: this.props.session });
        }
    }
    render(){
        return(
           <div className="col-lg-12">
                <div className="row">
                   <div className="col-lg-12 bg-light border-bottom">
                    <div className="row">
                       <div className="col-md-6">
                         <Link className="identity" to="/">AWS Authentication</Link>
                       </div>
                       <div className="col-md-6 text-right">
                        { this.state.session ?
                         <ul className="main-nav">
                             <li><a href="/" className="link active color logout" onClick={this.handleLogout}>Logout</a></li>
                             <div className="clearfix"></div>
                         </ul> :
                         <ul className="main-nav">
                             <li><Link className="link active color" to="/login">Login</Link></li>
                             <li><Link className="link color" to="/signup">Sign Up</Link></li>
                             <div className="clearfix"></div>
                         </ul>}
                       </div>
                    </div>
                   </div>
                   <div className="col-lg-12">
                        <Switch>
                          <PrivateRoute exact path="/" loggedIn={this.state.session} component={Home} />
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
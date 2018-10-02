import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginRequest, requestSession, logoutRequest } from '../actions/index';
import "./login.css";
import LoaderButton from "./loaderbutton";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          email: "",
          password: ""
        };
    }
    componentWillMount(){
        this.props.logoutRequest();
    }
    validateForm() {
       return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ isLoading: true });
        this.props.loginRequest({ "username": this.state.email, "password": this.state.password });
    }
    componentDidUpdate(){
        this.props.requestSession();
    }
    render(){
        if( this.props.session ) {
            return <Redirect to='/' /> 
        } 
        return (
            <div className="col-md-12 Login">
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="Email">Email address</label>
                <input type="text" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input type="text" onChange={this.handleChange} className="form-control" value={this.state.password} id="password" />
              </div>
              <LoaderButton disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Login" loadingText="Logging in..." />
              </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( { loginRequest, requestSession, logoutRequest }, dispatch);
const mapStateToProps = ({ session }) => ({ session });

export default connect( mapStateToProps, mapDispatchToProps)(Login)
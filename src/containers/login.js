import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { loginRequest, requestSession } from '../actions/index';
import "./login.css";
import LoaderButton from "../components/loaderbutton";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          email: "",
          password: "",
          flash: "",
          session: false
        };
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
        this.props.loginRequest({ "email": this.state.email, "password": this.state.password });
    }
    componentDidUpdate(prevProps, prevState) {
        if( prevProps.flash !== this.props.flash ){
            this.setState({ flash: this.props.flash, isLoading: false });
        }
        if( prevProps.session !== this.props.session ){
            this.setState({ session: this.props.session });
            this.props.history.push('/');
        }
    }
    render(){
        let alert = { margin: '10px 0' }
        return (
            <div className="col-md-12 Login">
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="Email">Email address</label>
                <input type="text" value={this.state.email} onChange={this.handleChange}     className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input type="text" onChange={this.handleChange} className="form-control" value=    {this.state.password} id="password" />
              </div>
              <LoaderButton disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Login" loadingText="Logging in..." />
              { this.state.flash !== '' ? 
                <div style={alert} className="alert alert-danger">
                    {this.state.flash}
                </div> : null }
              </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( { loginRequest, requestSession }, dispatch);
const mapStateToProps = ({ flash, session }) => ({ flash, session });

export default withRouter(
    connect( mapStateToProps, mapDispatchToProps)(Login)
);
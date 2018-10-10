import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginRequest, signupRequest, requestSession, logoutRequest } from '../actions/index';
import LoaderButton from "../components/loaderbutton";
import "./signup.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null
        };   
    }
    componentWillMount(){
        this.props.logoutRequest();
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
    }
    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }    
    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ isLoading: true });
        try {
            const newUser = { username: this.state.email, password: this.state.password };
            this.props.signupRequest(newUser);
            this.setState({ newUser });
        } catch (e) {
          console.log(e.message);
        }
        this.setState({ isLoading: false });
    }
    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            this.props.loginRequest(this.state.email, this.state.password);
            this.props.history.push("/");
        } catch (e) {
            console.log(e.message);
            this.setState({ isLoading: false });
        }
    }
    renderConfirmationForm() {
        return (
          <form onSubmit={this.handleConfirmationSubmit}>
            <div className="form-group">
                <label htmlFor="confirmation-code">Confirmation Code</label>
                <input type="tel" value={this.state.confirmationCode} onChange={this.handleChange} className="form-control" id="tel" />
                <p class="help-block">Please check your email for the code.</p>
              </div>
            <LoaderButton
              block
              bsSize="large"
              disabled={!this.validateConfirmationForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Verify"
              loadingText="Verifying..."
            />
          </form>
        );
    }
    
    render(){
        return(
            <div className="col-md-12 Signup">
               <form onSubmit={this.handleSubmit}>
                 <div className="form-group">
                   <label htmlFor="Email">Email address</label>
                   <input type="text" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" />
                 </div>
                 <div className="form-group">
                   <label htmlFor="Password">Password</label>
                   <input type="text" onChange={this.handleChange} className="form-control" value={this.state.password} id="password" />
                 </div>
                 <LoaderButton disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Sign Up" loadingText="Signing up..." />
               </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( { loginRequest, signupRequest, requestSession, logoutRequest }, dispatch);
const mapStateToProps = ({ session }) => ({ session });

export default connect( mapStateToProps, mapDispatchToProps)(SignUp)
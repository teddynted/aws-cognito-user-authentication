import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signupRequest, requestSession, confirmSignupRequest, loginRequest } from '../actions/index';
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
            newUser: null,
            flash: ""
        };   
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
            const newUser = { email: this.state.email, password: this.state.password };
            this.props.signupRequest(newUser);
        } catch (e) {
          console.log(e.message);
        }
    }
    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
           this.props.confirmSignupRequest( { "email": this.state.email, "confirmationCode": this.state.confirmationCode, "password": this.state.password });
        } catch (e) {
            console.log(e.message);
            this.setState({ isLoading: false });
        }
    }
    renderConfirmationForm() {
        let alert = { margin: '10px 0' }
        return (
          <form onSubmit={this.handleConfirmationSubmit}>
            <div className="form-group">
                <label htmlFor="confirmation-code">Confirmation Code</label>
                <input type="text" value={this.state.confirmationCode} onChange={this.handleChange} className="form-control" id="confirmationCode" />
                <p className="help-block">Please check your email for the code.</p>
            </div>
            <LoaderButton disabled={!this.validateConfirmationForm()} type="submit" isLoading={this.state.isLoading} text="Verify" loadingText="Verifying..."
            />
            { this.state.flash !== '' ? 
                    <div style={alert} className="alert alert-danger">
                        {this.state.flash}
                    </div> : null }
          </form>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if( prevProps.flash !== this.props.flash ){
            this.setState({ isLoading: false, flash: this.props.flash });
            if( this.props.flash === 'signup success' ) {
               this.setState({ newUser: { email: this.state.email, password: this.state.password }, flash: '' });
            }
            if( this.props.flash === 'confirm success' ) {
                this.props.history.push("/");
            }
        }
    }
    renderForm(){
        let alert = { margin: '10px 0' }
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
                 <div className="form-group">
                   <label htmlFor="confirmPassword">Confirm Password</label>
                   <input type="text" onChange={this.handleChange} className="form-control" value={this.state.confirmPassword} id="confirmPassword" />
                 </div>
                 <LoaderButton disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Signup" loadingText="Signing up..." />
                 { this.state.flash !== '' ? 
                    <div style={alert} className="alert alert-danger">
                        {this.state.flash}
                    </div> : null }
               </form>
            </div>
        );
    }
    render(){
       return(
            <div className="col-md-12 Signup">
                { this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm() }
            </div>
       );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( { signupRequest, requestSession, confirmSignupRequest, loginRequest }, dispatch);
const mapStateToProps = ({ session, flash }) => ({ session, flash });

export default connect( mapStateToProps, mapDispatchToProps)(SignUp)
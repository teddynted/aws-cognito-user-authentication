import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestSession } from '../actions/index';
import './home.css';

class Home extends Component {
  render(){
    if(!this.props.session){
       return <Redirect to="/login" />
    } else {
       return(
         <div className="col-md-12">
           <div className="home">
             <h2>Welcome Back!</h2>
             <p>User details goes here!</p>
           </div>
         </div>  
       );
    }
  }
}

const mapDispatchToProps = dispatch => bindActionCreators( { requestSession }, dispatch);
const mapStateToProps = ({ session }) => ({ session });
export default connect( mapStateToProps, mapDispatchToProps)(Home)
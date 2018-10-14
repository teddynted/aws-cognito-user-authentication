import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestSession, requestCurrentUser } from '../actions/index';
import './home.css';

class Home extends Component {
  componentDidMount(){
    this.props.requestSession();
    this.props.requestCurrentUser();
  }
  render(){
    let style = { color: '#d24d57' };
    if(!this.props.session){
        return <Redirect to="/login" />
    } else {
      return(
        <div className="col-md-12">
          <div className="home">
            <h2>Welcome Back!</h2>
            <p style={style}>{this.props.user}</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ session, user }) => ({ session, user });
const mapDispatchToProps = dispatch => bindActionCreators( { requestSession, requestCurrentUser }, dispatch);
export default connect( mapStateToProps, mapDispatchToProps)(Home)
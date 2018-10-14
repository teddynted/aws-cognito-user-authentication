import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestCurrentUser } from '../actions/index';
import './home.css';

class Home extends Component {
  componentDidMount(){
    this.props.requestCurrentUser();
  }
  render(){
    let style = { color: '#d24d57' };
    return(
      <div className="col-md-12">
        <div className="home">
          <h2>Welcome Back!</h2>
          <p style={style}>{this.props.user}</p>
          <p>This app deploys Amazon Cognito to control access to backend resources.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => bindActionCreators( { requestCurrentUser }, dispatch);
export default connect( mapStateToProps, mapDispatchToProps)(Home)
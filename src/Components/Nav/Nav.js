import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getUser, logout, login} from '../../Redux/reducer';
import './Nav.css';
import Axios from 'axios';

class Nav extends Component {
  constructor(){
    super()
    this.state={
      user: {},
      email: '',
      password: ''
    }
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    console.log('mounted')
    this.props.getUser()
  }
  login(){
    let {email, password} = this.state;
    console.log(this.state.user)
    this.props.login(email, password)
  }
  logout(){
    this.props.logout();
    this.setState({user: {}, email: '', password: ''})
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  
  render(){
    console.log(this.props.state.user)
    let {email, password} = this.state;

    return (
      <main className="nav">
          {this.props.state.user.email ? (
            <section className='logged-in'>
              <Link to='/'><button onClick={this.logout}>Log Out</button></Link>
            </section>
          ) : (
            null
          )}
      </main>
    );
  }
}

const mapStateToProps = state =>{
  return{
    state
  }
}
export default connect(mapStateToProps, {getUser, logout, login})(Nav)
import React from 'react';
import Head from '../components/head';
import Nav from '../components/nav';
import LoginComponent from '../components/login';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Head title="Login" />
        <Nav />
        <LoginComponent />
      </div>
    );
  }
}

export default Login;

import React from 'react';
import Head from '../components/head';
import Nav from '../components/nav';
import SignupForm from '../components/signup';

class Signup extends React.Component {
  render() {
    return (
      <div>
        <Head title="Signup" />
        <Nav />
        <SignupForm />
      </div>
    );
  }
}

export default Signup;

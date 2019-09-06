import React from 'react';
import Layout from '../../components/layout';
import SignupForm from '../../components/signup';

class Signup extends React.Component {
  render() {
    let signUpLink = '/api/signup/stripe';

    return (
      <Layout
        width="full"
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Host signup"
      >
        <h1>Host signup</h1>
        <SignupForm />
      </Layout>
    );
  }
}

export default Signup;

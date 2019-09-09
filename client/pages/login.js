import React from 'react';
import Layout from '../components/layout';

import LoginComponent from '../components/login';

class Login extends React.Component {
  render() {
    return (
      <Layout
        width="full"
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <LoginComponent />
      </Layout>
    );
  }
}

export default Login;

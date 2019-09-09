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
        <div className="login-page">
          <LoginComponent />
        </div>
        <style jsx>{`
          .login-page {
            padding-top: 100px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Login;

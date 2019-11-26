import React from 'react';
import Layout from '../components/layout';

import LoginComponent from '../components/login';

class Login extends React.Component {
  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="login-page">
          <div className="wrapper">
            <LoginComponent />
          </div>
        </div>
        <style jsx>{`
          .login-page {
            padding-top: 100px;
          }

          .wrapper {
            width: 100%;
            height: 600px;

            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Login;

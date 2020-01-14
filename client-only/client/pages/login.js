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
          <div className="splash-image">
            <div className="container">
              <div className="box popover">
                <h1>Sign in</h1>
                <LoginComponent />
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .login-page {
            width: 100%;
            position: absolute;
            top: 110px;
            left: 0;
            right: 0;
            bottom: 0;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Login;

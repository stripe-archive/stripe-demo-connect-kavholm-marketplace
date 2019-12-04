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
            <div className="box">
              <h1>Login</h1>
              <LoginComponent />
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

          h1 {
            font-size: 27px;
            font-weight: 600;
            color: #202020;
            width: 70%;
            margin-bottom: 30px;
          }

          .splash-image {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: cover;
            vertical-align: bottom;

            display: flex;
            justify-content: center;
            align-items: center;

            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0) 50%,
                #ffffff 100%
              ),
              url(https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80)
                no-repeat; // Source: https://unsplash.com/photos/wh-7GeXxItI
            background-size: cover;
            background-position: center center;
          }

          .box {
            padding: 40px;
            margin-top: -100px;
            background: #ffffff;
            border: 0;
            box-shadow: 0 15px 35px 0 rgba(50, 50, 93, 0.1),
              0 5px 15px 0 rgba(0, 0, 0, 0.07);
            border-radius: 6px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Login;

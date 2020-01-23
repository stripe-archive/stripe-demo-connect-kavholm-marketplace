import React from 'react';
import Layout from '../components/layout';
import SignupForm from '../components/signupForm';

class Signup extends React.Component {
  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Signup"
      >
        <div className="page-signup">
          <div className="splash-image">
            <div className="container">
              <div className="box popover">
                <h1>Create an account</h1>
                <p className="supporting-text">
                  Create a new account, or sign in with one of{' '}
                  <a href="/login">our demo accounts on login</a>.
                </p>
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .page-signup {
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

export default Signup;

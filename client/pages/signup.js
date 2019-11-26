import React from 'react';
import Layout from '../components/layout';
import SignupForm from '../components/signupForm';

class Signup extends React.Component {
  render() {
    let signUpLink = '/api/signup/stripe';

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Signup"
      >
        <div className="page-signup">
          <div className="wrapper">
            <SignupForm />
          </div>
        </div>
        <style jsx>{`
          .page-signup {
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

export default Signup;

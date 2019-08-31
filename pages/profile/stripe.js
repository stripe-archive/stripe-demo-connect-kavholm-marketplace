import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import {withAuthSync} from '../../utils/auth';

class ProfileStripe extends React.Component {
  render() {
    let signUpLink = '/api/signup/stripe';

    return (
      <Layout width="full" isAuthenticated={this.props.isAuthenticated}>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="wrapper">
                <div className="text-center box">
                  <img src="/static/icon-bank.svg" className="icon" />
                  <h3>Set up your payouts with Stripe</h3>
                  <p>
                    Kavholm partners with Stripe to transfer earnings to your
                    bank account.
                  </p>

                  <a
                    className="btn btn-primary text-center"
                    href="/api/signup/stripe"
                  >
                    Set up payments
                  </a>

                  <p className="text-center notice">
                    You'll be redirected to Stripe to complete the onboarding
                    proces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .wrapper {
            width: 100%;
            height: 600px;

            display: flex;
            justify-content: center;
            align-items: center;
          }

          .icon {
            margin-bottom: 30px;
          }

          .box {
            max-width: 300px;
            max-height: 400px;
          }

          .box .btn {
            width: 100%;
            margin-bottom: 20px;
          }

          .box .notice {
            font-size: 12px;
            line-height: 1.5;
          }

          .box h3 {
            margin-bottom: 20px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default withAuthSync(ProfileStripe);

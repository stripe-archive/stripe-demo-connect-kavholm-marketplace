import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import {withAuthSync} from '../../utils/auth';

class ProfileStripe extends React.Component {
  constructor() {
    super();
    this.handleConnect = this.handleConnect.bind(this);
  }

  async getRedirectInfo() {
    try {
      const token = this.props.token;
      const apiUrl = '/api/stripe/connect';
      const response = await fetch(apiUrl, {
        credentials: 'include',
        headers: {
          Authorization: JSON.stringify({token}),
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.log('ProfileStripe.getRedirectInfo.error', response);
        return Promise.reject();
      }
    } catch (error) {
      console.log('ProfileStripe.getRedirectInfo.error', error);
      return Promise.reject();
    }
  }

  async handleConnect() {
    console.log('ProfileStripe.handleConnect');
    let response = await this.getRedirectInfo();
    let url = response.location;
    if (url) {
      window.location.href = url;
    }
  }

  render() {
    let signUpLink = '/api/stripe/connect';

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
                    onClick={this.handleConnect}
                    href="#"
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

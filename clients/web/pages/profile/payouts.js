import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import PayoutSetup from '../../components/payoutSetup';
import API from '../../helpers/api';

class ProfilePayouts extends React.Component {
  constructor() {
    super();
  }

  render() {
    let hasPayoutSetup =
      this.props.userProfile &&
      this.props.userProfile.stripe != null &&
      this.props.userProfile.stripe.stripeUserId;

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="wrapper">
                {hasPayoutSetup ? (
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={this.handleDashboardLink}
                  >
                    Go to Stripe Dashboard
                  </a>
                ) : (
                  <PayoutSetup />
                )}
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
        `}</style>
      </Layout>
    );
  }
}

export default ProfilePayouts;

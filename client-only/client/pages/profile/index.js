import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import DashboardHeader from '../../components/dashboardHeader';

class Profile extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    return {
      profile: await API.makeRequest('get', '/api/profile'),
      balance: await API.makeRequest('get', '/api/profile/balance'),
    };
  }

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  disconnectStripeAccount = async () => {
    let req = await API.makeRequest('post', '/api/profile/disconnect_stripe');
    redirect('/dashboard');
  };

  clearTransactions = async () => {
    let req = await API.makeRequest('post', '/api/profile/clear_transactions');
    redirect('/dashboard');
  };

  render() {
    let profile = this.props ? this.props.profile : {};
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Profile"
      >
        <div className="profile">
          <h4>Your profile details</h4>
          <pre className="profile-details bg-light">
            <code>{JSON.stringify(profile, null, 2)}</code>
          </pre>

          <h4>Admin</h4>
          <button
            className="btn btn-secondary"
            onClick={this.clearTransactions}
          >
            Clear trips
          </button>

          {profile.stripe && (
            <>
              <br />
              <br />
              <button
                className="btn btn-secondary"
                onClick={this.disconnectStripeAccount}
              >
                Disconnect Stripe account
              </button>
            </>
          )}
        </div>
        <style jsx>{`
          .profile h4 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
          }

          .profile-details {
            padding: 10px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Profile;

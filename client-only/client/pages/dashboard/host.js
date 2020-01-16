import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import ListingsList from '../../components/listingsList';
import DashboardHeader from '../../components/dashboardHeader';
import NewButton from '../../components/newButton';
import PayoutSetup from '../../components/payoutSetup';

class Dashboard extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    let userProfile = await API.makeRequest('get', '/api/profile');
    let userListings = await API.makeRequest('get', '/api/profile/listings');
    let userBalance = await API.makeRequest('get', '/api/profile/balance');

    return {
      profile: userProfile,
      userListings: userListings,
      userBalance: userBalance,
      dashboardType: 'host',
    };
  }

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  render() {
    let showListingTip =
      this.props.userListings && this.props.userListings.length === 0;

    let hasPayoutSetup =
      this.props.userProfile &&
      this.props.userProfile.stripe != null &&
      this.props.userProfile.stripe.stripeUserId;

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Dashboard"
      >
        <div className="dashboard ">
          <DashboardHeader
            profile={this.props.profile}
            balance={this.props.userBalance}
            dashboardType={this.props.dashboardType}
          />

          {hasPayoutSetup ? (
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-8">
                    <div className="clearfix">
                      <h4>Your listings</h4>
                    </div>
                  </div>
                  <div className="col-4">
                    <NewButton
                      showTip={showListingTip}
                      label="New listing"
                      link="/listings/new"
                      tipTitle="Time to create your first listing."
                      tipBody="You can now add your home to Kavholm"
                    />
                  </div>
                </div>

                {this.props.userListings && (
                  <ListingsList list={this.props.userListings} />
                )}
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="wrapper">
                <PayoutSetup />
              </div>
            </div>
          )}
        </div>
        <style jsx>{`
          .dashboard {
            padding-bottom: 100px;
          }
          .dashboard h4 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
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

export default Dashboard;

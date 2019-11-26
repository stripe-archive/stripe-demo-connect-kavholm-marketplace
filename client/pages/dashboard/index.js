import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import DashboardBookingsList from '../../components/dashboardBookingsList';
import DashboardHeader from '../../components/dashboardHeader';

class Dashboard extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    let userProfile = await API.makeRequest('get', '/api/profile');
    let userBookings = await API.makeRequest('get', '/api/bookings');

    if (userBookings && userBookings.length) {
      let expandedBookings = await userBookings.map(async (booking) => {
        let listing = await API.makeRequest(
          'get',
          `/api/listings/${booking.listingId}`,
        );

        return {
          ...booking,
          listing: listing,
        };
      });

      userBookings = await Promise.all(expandedBookings);
    }

    return {
      profile: userProfile,
      userBookings: userBookings,
      dashboardType: 'renter',
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

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Dashboard"
        hideBooking={true}
      >
        <div className="dashboard">
          <DashboardHeader
            profile={this.props.profile}
            dashboardType={this.props.dashboardType}
          />

          <div className="row">
            <div className="col-12">
              <h4>Your bookings</h4>
              <DashboardBookingsList list={this.props.userBookings} />
            </div>
          </div>
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
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;

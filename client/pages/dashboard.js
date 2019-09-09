import React from 'react';
import {redirect} from '../utils/redirect';

import Layout from '../components/layout';
import API from '../helpers/api';
import ListingsBookingsList from '../components/bookingList';
import DashboardListingsList from '../components/dashboardListingsList';
import DashboardHeader from '../components/dashboardHeader';
import NewListingButton from '../components/newListingButton';

class Dashboard extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    let userProfile = await API.makeRequest('get', '/api/profile');
    let userListings = await API.makeRequest('get', '/api/profile/listings');
    let userBookings = [];

    if (userListings.length) {
      let listingBookings = await userListings.map(async (listing) => {
        let bookings = await API.makeRequest(
          'get',
          `/api/bookings/listing?listingId=${listing.id}`,
        );

        let bookingsDetailsReqs = await bookings.map(async (booking) => {
          let user = await API.makeRequest(
            'get',
            `/api/users/userInfo?id=${booking.bookingUserId}`,
          );

          return {
            ...booking,
            user,
          };
        });

        let bookingDetails = await Promise.all(bookingsDetailsReqs);

        return {
          id: listing.id,
          title: listing.title,
          bookings: bookingDetails,
        };
      });

      userBookings = await Promise.all(listingBookings);
    }

    if (userProfile) {
      // Redirect to /profile/payouts to setup payouts.
      if (!userProfile.stripe) {
        return redirect('/profile/payouts', context);
      }
    }

    let userBalance = await API.makeRequest('get', '/api/profile/balance');

    return {
      profile: userProfile,
      userListings: userListings,
      userBookings: userBookings,
      userBalance: userBalance,
    };
  }

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  render() {
    let showListingTip = this.props.userListings.length === 0;

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
          />

          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-8">
                  <div className="clearfix">
                    <h4>Your listings</h4>
                  </div>
                </div>
                <div className="col-4">
                  <NewListingButton showTip={showListingTip} />
                </div>
              </div>

              <DashboardListingsList list={this.props.userListings} />
            </div>

            <div className="col-4">
              <h4>Recent bookings</h4>
              <ListingsBookingsList list={this.props.userBookings} />
            </div>
          </div>
        </div>
        <style jsx>{`
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

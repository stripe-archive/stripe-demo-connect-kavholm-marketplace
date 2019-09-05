import React from 'react';
import {redirect} from '../utils/redirect';

import Layout from '../components/layout';
import API from '../helpers/api';
import ListingsBookingsList from '../components/bookingList';
import DashboardListingsList from '../components/dashboardListingsList';
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
        redirect('/profile/payouts', context);
      }
    }

    return {
      profile: userProfile,
      userListings: userListings,
      userBookings: userBookings,
    };
  }

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  render() {
    let profile = this.props ? this.props.profile : {};
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';
    let showListingTip = !this.props.userListings;

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="dashboard ">
          <div className="row">
            <div className="col-12">
              <div className="media user-details">
                <img src={avatarUrl} height="66" className="mr-3 avatar" />
                <div className="media-body">
                  <div className="user-details-body align-middle">
                    <h5 className="mt-0">{profile && profile.fullName}</h5>
                    <p className="text-secondary">{profile && profile.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="bg-light" />

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
          .profile-details {
            padding: 20px;
            overflow: auto;
            max-height: 700px;
          }

          .user-details .avatar {
            border-radius: 66px;
          }

          .user-details {
            font-size; 14px;
          }

          .user-details-body {
            padding-top: 10px;
          }

          .user-details h5 {
            font-size: 16px;
            margin: 0;
          }

          .user-details p {
            font-size: 12px;
          }

          .dashboard hr {
            margin-bottom: 50px;
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

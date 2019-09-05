import React from 'react';
import {redirect} from '../utils/redirect';

import Layout from '../components/layout';
import API from '../helpers/api';
import ListingsBookingsList from '../components/bookingList';
import DashboardListingsList from '../components/dashboardListingsList';

function NewListingButton(props) {
  const target = React.createRef();

  return (
    <div className="listing-button">
      {props.showTip && (
        <div className="overlay">
          <span className="triangle">▲</span>
          <strong>Time to create your first listing.</strong>
          <br />
          Your account and payout infromation has been verfied, now add your
          home to Kavholm
        </div>
      )}
      <a
        ref={target}
        href="/listings/new"
        className="btn btn-primary btn-new-listing"
      >
        New
      </a>
      <style jsx>
        {`
          .listing-button {
            position: relative;
          }

          .overlay .triangle {
            position: absolute;
            top: -18px;
            right: 23px;
            color: #000;
          }

          .overlay {
            position: absolute;
            right: 0;
            top: 40px;
            background: #000;
            font-size: 14px;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
          }

          .btn-new-listing {
            float: right;
            margin-top: -8px;
          }
        `}
      </style>
    </div>
  );
}

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
            font-size: 18px;
            margin-bottom: 30px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;

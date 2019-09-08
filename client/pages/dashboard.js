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

  async handleDashboardLink() {
    let req = await API.makeRequest('get', '/api/payouts/link');
    window.open(req.url);
  }

  render() {
    let profile = this.props ? this.props.profile : {};
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';
    let showListingTip = !this.props.userListings;
    let formattedBalance = '';

    if (this.props.userBalance && this.props.userBalance) {
      const locale = new Intl.NumberFormat().resolvedOptions().locale;
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: this.props.userBalance.currency,
      });

      formattedBalance = formatter.format(this.props.userBalance.amount / 100);
    }

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Dashboard"
      >
        <div className="dashboard ">
          <div className="row">
            <div className="col-8">
              <div className="media user-details">
                <img src={avatarUrl} className="mr-3 avatar" />
                <div className="media-body">
                  <div className="user-details-body align-middle">
                    <h5 className="mt-0">{profile && profile.fullName}</h5>
                    <p className="text-secondary">{profile && profile.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="align-middle stripe-dashboard">
                <p className="label text-secondary">Balance</p>
                <p className="balance">
                  {formattedBalance}{' '}
                  <a href="#" onClick={this.handleDashboardLink}>
                    View in Stripe Dashboard ↗
                  </a>
                </p>
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
            height: 55px;
            border-radius: 55px;
            align-self: center;
          }

          .user-details {
            font-size: 14px;
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

          .stripe-dashboard {
            font-size: 12px;
            padding-top: 4px;
          }

          .stripe-dashboard .label {
            font-size: 16px;
            margin: 0;
            padding: 0;
          }

          .stripe-dashboard .balance {
            margin: 0;
            padding: 0;
            font-size: 16px;
            line-height: 1;
          }

          .stripe-dashboard a {
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

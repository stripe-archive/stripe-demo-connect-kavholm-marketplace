import React from 'react';
import getHost from '../utils/get-host';
import {redirect} from '../utils/redirect';

import Layout from '../components/layout';
import API from '../helpers/api';

async function getProfile(token) {
  console.log('Dashboard.getProfile');
  return API.makeRequest(token, 'get', '/api/profile');
}

async function getStripeAccountLink(token, context) {
  console.log('Dashboard.getStripeAccountLink');
  return API.makeRequest('get', this.props.token, '/api/payouts/link');
}

class Dashboard extends React.Component {
  constructor(props) {
    super();
    console.log('props', props);
  }

  // static async getInitialProps(context) {
  //   let token = '';

  //   console.log('Dashboard.context', context);
  //   // if (!token) {
  //   //   redirect('/login', context);
  //   // }

  //   // let stripeAccountLink = await getStripeAccountLink(token, context);

  //   return {
  //     profile: userProfile,
  //   };
  // }

  async componentWillMount() {
    let token = this.props.token;
    let userProfile = await getProfile(token);

    this.setState({
      profile: userProfile,
    });
  }

  render() {
    let profile = this.state ? this.state.profile : {};
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';

    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
        <div className="dashboard ">
          <div className="row">
            <div className="col-12">
              <div className="media user-details">
                <img src={avatarUrl} height="66" className="mr-3" />
                <div className="media-body">
                  <div className="user-details-body align-middle">
                    <h5 className="mt-0">
                      {this.props.token}
                      {profile && profile.email}
                    </h5>
                    <p className="text-secondary">
                      {profile && profile.country}
                    </p>
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
                  <a
                    href="/listings/new"
                    className="btn btn-primary btn-new-listing"
                  >
                    New
                  </a>
                </div>
              </div>

              <ul className="listings-list">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>

            <div className="col-4">
              <h4>Booking requests</h4>

              <ul className="booking-list">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>

          <hr className="bg-light" />

          <h5>Profile details:</h5>
          <pre className="profile-details bg-light">
            <code>{JSON.stringify(profile, null, 2)}</code>
          </pre>

          <h5>AccountLink details:</h5>
          <pre className="profile-details bg-light">
            <code>{JSON.stringify(this.props.stripeAccountLink, null, 2)}</code>
          </pre>
        </div>
        <style jsx>{`
          .profile-details {
            padding: 20px;
            overflow: auto;
            max-height: 700px;
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

          .booking-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .booking-list li {
            height: 30px;

            border: 0;
            margin-bottom: 30px;
            background: #f6f6f6;
          }

          .listings-list {
            list-style: none;
            padding: 0;
            margin: 0;

            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 30px;
            grid-auto-rows: minmax(100px, auto);
          }

          .listings-list li {
            height: 325px;

            border: 0;
            background: #f6f6f6;
          }

          .btn-new-listing {
            float: right;
            margin-top: -8px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;

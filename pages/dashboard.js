import React from 'react';
import Router from 'next/router';

import nextCookie from 'next-cookies';
import fetch from 'isomorphic-unfetch';
import {withAuthSync} from '../utils/auth';
import getHost from '../utils/get-host';
import {redirect} from '../utils/redirect';

import Layout from '../components/layout';

async function getProfile(token, context) {
  console.log('Dashboard.getProfile');

  try {
    const apiUrl = getHost(context.req) + '/api/profile';
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({token}),
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.log('Dashboard.getProfile.error', response);
    }
  } catch (error) {
    console.log('dashboard.getprofile.error', error);
  }
}

async function getStripeAccountLink(token, context) {
  console.log('Dashboard.getStripeAccountLink');

  try {
    const apiUrl = getHost(context.req) + '/api/payouts/link';
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({token}),
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.log('Dashboard.getStripeAccountLink.error', response);
    }
  } catch (error) {
    console.log('dashboard.getStripeAccountLink.error', error);
  }
}

class Dashboard extends React.Component {
  static async getInitialProps(context) {
    const {token} = nextCookie(context);

    if (!token) {
      redirect('/login', context);
    }

    let userProfile = await getProfile(token, context);
    let stripeAccountLink = await getStripeAccountLink(token, context);

    return {
      profile: userProfile,
      stripeAccountLink: stripeAccountLink,
    };
  }

  render() {
    let avatarUrl = this.props.profile
      ? this.props.profile.avatar
      : '/static/avatar.png';

    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
        <div className="dashboard ">
          <div className="row">
            <div className="col-12">
              <div className="media user-details">
                <img src={avatarUrl} height="66" className="mr-3" />
                <div className="media-body">
                  <div className="user-details-body align-middle">
                    <h5 className="mt-0">{this.props.profile.email}</h5>
                    <p className="text-secondary">
                      {this.props.profile.country}
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
            <code>{JSON.stringify(this.props.profile, null, 2)}</code>
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

export default withAuthSync(Dashboard);

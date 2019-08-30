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
    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
        <div className="dashboard ">
          <h2>Dashboard</h2>

          <div className="row">
            <div className="col-8">
              <p>Welcome, {this.props.profile.email}</p>
            </div>

            <div className="col-4 text-right">
              <a href="" className="btn btn-primary">
                See payouts on Stripe
              </a>
            </div>
          </div>

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
        `}</style>
      </Layout>
    );
  }
}

export default withAuthSync(Dashboard);

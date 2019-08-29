import React from 'react';
import Head from '../components/head';
import Nav from '../components/nav';
import Router from 'next/router';

import nextCookie from 'next-cookies';
import fetch from 'isomorphic-unfetch';
import {withAuthSync} from '../utils/auth';
import getHost from '../utils/get-host';
import {redirect} from '../utils/redirect';

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

class Dashboard extends React.Component {
  static async getInitialProps(context) {
    const {token} = nextCookie(context);

    if (!token) {
      redirect('/login', context);
    }

    let userProfile = await getProfile(token, context);

    return userProfile;
  }

  render() {
    return (
      <div>
        <Head title="Login" />
        <Nav isAuthenticated={this.props.isAuthenticated} />
        <div>
          <h2>Dashboard</h2>
          <p>Welcome, {this.props.email}</p>

          <h5>Profile details:</h5>
          <pre>
            <code>{JSON.stringify(this.props, null, 2)}</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default withAuthSync(Dashboard);

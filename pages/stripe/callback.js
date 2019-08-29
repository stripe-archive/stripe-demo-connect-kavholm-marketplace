import React from 'react';
import Head from '../../components/head';
import Nav from '../../components/nav';
import Router from 'next/router';

import fetch from 'isomorphic-unfetch';
import getHost from '../../utils/get-host';
import {handleLogin} from '../../utils/auth';

class AuthStripeCallback extends React.Component {
  componentDidMount() {
    console.log('AuthStripeCallback.props', this.props);
    if (this.props.token) {
      // 2. Call client-side login logic and store auth token
      handleLogin(this.props.token);
    }
  }
  render() {
    return (
      <div>
        <Head title="Login" />
        <div>
          <h2>Authenticating you with Stripe...</h2>
          {this.props.error}
        </div>
      </div>
    );
  }
}

AuthStripeCallback.getInitialProps = async (context) => {
  const apiUrl = getHost(context.req) + '/api/login/stripe';

  let code = context.query.code;

  // 1. Call API with auth Code to get auth token.
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code}),
    });
    if (response.ok) {
      const {token} = await response.json();
      console.log('AuthStripeCallback.token', token);
      return {token};
    } else {
      console.log('Login failed.');
      return {
        error: response.statusText,
      };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
};

export default AuthStripeCallback;

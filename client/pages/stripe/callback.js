import React from 'react';
import Router from 'next/router';

import {redirect} from '../../utils/redirect';
import API from '../../helpers/api';

class AuthStripeCallback extends React.Component {
  static async getInitialProps() {
    return {};
  }

  async finalize() {
    let code = Router.router.query.code;

    console.log('code', code);
    try {
      let req = await API.makeRequest('post', `/api/payouts/setup`, {
        code: code,
      });

      if (req && req.status === 'ok') {
        return redirect('/dashboard');
      } else {
        console.log('req', req);
      }
    } catch (err) {
      console.log('AuthStripeCallback.error', err);
    }
  }

  componentDidMount() {
    this.finalize();
  }

  render() {
    return <></>;
  }
}

export default AuthStripeCallback;

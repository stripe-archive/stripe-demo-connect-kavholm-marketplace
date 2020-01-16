import React from 'react';
import Router from 'next/router';

import {redirect} from '../../utils/redirect';
import API from '../../helpers/api';
import logger from '../../helpers/logger';

import Layout from '../../components/layout';

class AuthStripeCallback extends React.Component {
  static async getInitialProps() {
    return {};
  }

  async finalize() {
    let code = Router.router.query.code;

    logger.log('code', code);
    try {
      let req = await API.makeRequest('post', `/api/payouts/setup`, {
        code: code,
      });

      if (req && req.status === 'ok') {
        return redirect('/dashboard/host');
      } else {
        logger.log('req', req);
      }
    } catch (err) {
      logger.log('AuthStripeCallback.error', err);
    }
  }

  componentDidMount() {
    this.finalize();
  }

  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Dashboard"
      >
        <div className="">
          <img src="/static/loader.svg" className="loader" />
        </div>

        <style jsx>{`
          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -19px;
            margin-top: -19px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default AuthStripeCallback;

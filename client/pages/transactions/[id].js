import React from 'react';
import {redirect} from '../../utils/redirect';
import Link from 'next/link';

import Layout from '../../components/layout';
import API from '../../helpers/api';

class TransactionConfirmation extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    let id = context.query.id;

    return {
      transaction: await API.makeRequest('get', `/api/transactions/${id}`),
    };
  }

  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="listings">
          <hr className="bg-light" />

          <h2>Transaction Details</h2>

          <pre className="profile-details bg-light">
            <code>{JSON.stringify(this.props.transaction, null, 2)}</code>
          </pre>

          <style jsx>{`
            .listings {
              padding-bottom: 100px;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default TransactionConfirmation;

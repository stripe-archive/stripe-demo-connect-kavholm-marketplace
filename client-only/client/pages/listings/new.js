import React from 'react';
import {redirect} from '../../utils/redirect';
import Link from 'next/link';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import ListingForm from '../../components/listingForm';

class NewListing extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    return {};
  }

  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="listings">
          <hr className="bg-light" />

          <h3>Create new listing</h3>

          <ListingForm />

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

export default NewListing;

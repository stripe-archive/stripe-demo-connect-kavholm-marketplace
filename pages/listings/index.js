import React from 'react';
import ListingsList from '../../components/listingsList';

import Layout from '../../components/layout';
import API from '../../helpers/api';

class Listings extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    return {
      listings: await API.makeRequest('get', '/api/listings'),
    };
  }

  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Listings"
      >
        <div className="listings">
          <ListingsList list={this.props.listings} />

          <style jsx>{`
            .listings {
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Listings;

import React from 'react';
import {redirect} from '../../utils/redirect';
import Link from 'next/link';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import ListingForm from '../../components/listingForm';
import getConfig from 'next/config';

class NewListing extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    return {};
  }

  render() {
    let isTestMode = getConfig().publicRuntimeConfig.isTestMode;

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="listing-new-page">
          <div className="splash-image">
            <div className="container">
              <div className="box popover">
                <h3>Create new listing</h3>

                {isTestMode && (
                  <p>
                    Creating new listings have been disabled as Kavholm runs in
                    test-mode.
                  </p>
                )}
                {!isTestMode && <ListingForm />}
              </div>
            </div>
          </div>
          <style jsx>{`
            .listing-new-page {
              width: 100%;
              position: absolute;
              top: 110px;
              left: 0;
              right: 0;
              bottom: 0;
            }

            .splash-image {
              background: linear-gradient(
                  0deg,
                  rgba(255, 255, 255, 0) 50%,
                  #ffffff 100%
                ),
                url(https://images.unsplash.com/photo-1501004745788-4f4cb08ba8bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80)
                  no-repeat;
              background-size: cover;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default NewListing;

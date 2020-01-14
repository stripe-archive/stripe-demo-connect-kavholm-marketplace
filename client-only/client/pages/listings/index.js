import React from 'react';
import {redirect} from '../../utils/redirect';
import Link from 'next/link';

import Layout from '../../components/layout';
import API from '../../helpers/api';

function ListingsList(props) {
  const listings = props.listings;

  let listItems = [];

  if (listings) {
    listItems = listings.map((l) => (
      <li className="listing-item" key={l.id}>
        <Link href={`/listings/` + l.id}>
          <a>
            <div className="overlay"></div>

            <div className="text">
              <h3>{l.location}</h3>
              <h4>{l.title}</h4>
            </div>
            {<img src={l.image} />}
          </a>
        </Link>
        <style jsx>{`
          .listing-item {
            height: 233px;

            border: 0;
            background: #f6f6f6;
            position: relative;
          }

          .listing-item .text {
            position: absolute;
            left: 10px;
            right: 0;
            bottom: 10px;
            padding: 0 10px;
            color: #fff;
          }

          .listing-item h3 {
            font-size: 10px;
            text-transform: uppercase;
          }          

          .listing-item h4 {
            font-size: 14px;
          }

          .listing-item .overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background rgba(0, 0, 0, 0.3);
          }          

          .listing-item img {
            border-radius: 6px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: bottom;
          }
        `}</style>
      </li>
    ));
  }

  return (
    <ul className="listings-list">
      {listItems}

      <style jsx>{`
        .listings-list {
          list-style: none;
          padding: 0;
          margin: 0;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 30px;
          grid-auto-rows: minmax(100px, auto);
        }
      `}</style>
    </ul>
  );
}

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
          <ListingsList listings={this.props.listings} />

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

export default Listings;

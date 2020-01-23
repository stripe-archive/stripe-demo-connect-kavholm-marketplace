import React from 'react';
import Router from 'next/router';

import Layout from '../../components/layout';
import API from '../../helpers/api';

import BookingModalWrapper from '../../components/bookingModalWrapper';
import NumberFormat from 'react-number-format';
import BookingList from '../../components/bookingList';
import Link from 'next/link';

class Listing extends React.Component {
  constructor() {
    super();
    this.state = {
      isBooking: false,
      isBookingConfirmed: false,
      amount: 78600,
      transactionId: null,
    };
  }

  static async getInitialProps(context) {
    let id = context.query.id;
    let listing = await API.makeRequest('get', `/api/listings/${id}`);
    let bookings = await API.makeRequest(
      'get',
      `/api/transactions/listing?listingId=${listing.id}`,
    );

    return {
      listing: listing,
      bookings: bookings,
    };
  }

  handleBookingStartClick = () => {
    this.setState({
      isBooking: true,
    });
  };

  onBookingConfirmed = (transactionId) => {
    this.setState({
      transactionId: transactionId,
      isBookingConfirmed: true,
    });
  };

  render() {
    let listing = this.props.listing;
    let isListingOwner =
      this.props.listing.author &&
      this.props.listing.author.userId == this.props.userProfile.userId;

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title={this.props.listing.title}
      >
        <div className="listings">
          <BookingModalWrapper
            isShown={this.state.isBooking}
            onBookingConfirmed={this.onBookingConfirmed}
            isBookingConfirmed={this.state.isBookingConfirmed}
            transactionId={this.state.transactionId}
            listing={listing}
          />

          <div className="content">
            <div className="row">
              <div className="col-12 order-2 col-lg-6 order-lg-1 pane-images">
                <img src={this.props.listing.image} className="image-main" />

                <div className="row">
                  <div className="col-6">
                    <img
                      src={this.props.listing.image2}
                      className="image-small"
                    />
                  </div>
                  <div className="col-6">
                    <img
                      src={this.props.listing.image3}
                      className="image-small"
                    />
                  </div>
                </div>

                <div className="image-footer">
                  <div>See more photos</div>
                  <div className="widgets">
                    <div style={{marginRight: '12px'}}>
                      <img src="/static/share.svg" /> Share
                    </div>
                    <div>
                      <img src="/static/save.svg" /> Save
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 order-1 col-lg-6 order-lg-2 pane-info">
                <div className="booking-info">
                  <h1>{listing.title}</h1>

                  <div className="priceInfo">
                    <span className="price">
                      <NumberFormat
                        value={listing.totalAmount / 100}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={listing.price.currency + ''}
                      />
                    </span>
                    <img className="stars" src="/static/stars.svg" />
                  </div>
                  <p className="supporting-text">{listing.description}</p>

                  <hr />
                  <ul className="lineItems">
                    {listing.lineItems.map((item, index) => (
                      <li key={item.item}>
                        {item.item}
                        <span className="lineItemPrice">
                          <NumberFormat
                            value={item.amount / 100}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={listing.price.currency + ''}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <ul className="lineItems lineItemsTotal">
                    <li>
                      Total{' '}
                      <span className="lineItemPrice">
                        <NumberFormat
                          value={listing.totalAmount / 100}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={listing.price.currency + ''}
                        />
                      </span>
                    </li>
                  </ul>
                </div>
                {this.props.isAuthenticated && (
                  <button
                    className="btn btn-primary btn-book"
                    onClick={this.handleBookingStartClick}
                    disabled={!this.props.isAuthenticated}
                  >
                    Book now
                  </button>
                )}

                {!this.props.isAuthenticated && (
                  <Link href="/login">
                    <button className="btn btn-primary btn-book">
                      Sign in to book
                    </button>
                  </Link>
                )}

                {this.props.listing.author && (
                  <div className="media host">
                    <img
                      src={this.props.listing.author.avatar}
                      width="36"
                      className="mr-3"
                    />
                    <div className="media-body">
                      <p>
                        Listed by {this.props.listing.author.firstName}{' '}
                        {this.props.listing.author.lastName}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <style jsx>{`
            .image-footer {
              padding-top: 12px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: 14px;
            }
            .widgets {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-end;
              width: 50%;
            }
            .widgets div {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-end;
            }
            .widgets img {
              padding-right: 5px;
            }
            p:first-child {
              font-weight: bold;
              text-decoration: underline;
            }

            .pane-info {
              flex: 0 0 520px;
              justify-content: center;
              display: flex;
              flex-direction: column;
              padding-bottom: 60px;
            }

            @media (min-width: 768px) {
              .pane-info {
                padding-left: 60px;
              }
            }

            .priceInfo {
              display: flex;
              font-size: 14px;
              letter-spacing: -0.15px;
              margin: 24px 0;
            }
            .priceInfo .price {
              font-size: 20px;
              font-weight: 500;
              color: #202020;
              padding-right: 4px;
            }
            .priceInfo img {
              padding-left: 32px;
            }
            .lineItems {
              list-style-type: none;
              padding: 0;
              font-size: 14px;
              color: #676767;
              margin: 12px 0 20px;
            }
            .lineItemsTotal {
              color: #202020;
              font-size: 20px;
              font-weight: 500;
              margin: 16px 0 40px;
            }

            .lineItems li {
              padding-top: 4px;
              padding-bottom: 4px;
              display: flex;
              justify-content: space-between;
              height: 24px;
            }

            hr {
              border: 0;
              opacity: 0.8;
              border-top: 1px solid #dee2e6;
              margin-bottom: 0;
            }

            .host {
              margin-top: 40px;
            }

            .host img {
              margin-right: 8px;
              align-self: center;
              border-radius: 32px;
              width: 32px;
              object-fit: cover;
              height: 32px;
            }

            .host .media-body {
              font-size: 14px;
              color: #676767;
            }

            .host .media-body p {
              font-weight: normal;
              text-decoration: none;
              margin: 0;
              line-height: 18px;
              padding-top: 6px;
            }

            .content {
              color: #676767;
            }

            .image-main {
              width: 100%;
              margin-bottom: 30px;
              height: 50vh;
              object-fit: cover;
              object-position: bottom;

              max-height: 466px;
            }

            .image-small {
              width: 100%;
              height: 25vh;
              object-fit: cover;
              object-position: bottom;
            }

            .stars {
              align-self: center;
            }

            .pane-images {
              padding-bottom: 50px;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Listing;

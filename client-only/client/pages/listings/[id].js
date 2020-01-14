import React from 'react';
import Router from 'next/router';

import Layout from '../../components/layout';
import API from '../../helpers/api';

import BookingModalWrapper from '../../components/bookingModalWrapper';
import NumberFormat from 'react-number-format';

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
    let listingAuthor;

    if (listing.author) {
      listingAuthor = await API.makeRequest(
        'get',
        `/api/users/userInfo?id=${listing.author}`,
      );
    }

    return {
      listing: listing,
      listingAuthor: listingAuthor,
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
              <div className="col-6 pane-images">
                <img src={this.props.listing.image} className="image-main" />

                <div className="row">
                  <div className="col-6">
                    <img
                      src="https://placehold.jp/255x238.png"
                      className="image-small"
                    />
                  </div>
                  <div className="col-6">
                    <img
                      src="https://placehold.jp/255x238.png"
                      className="image-small"
                    />
                  </div>
                </div>

                <div className="image-footer">
                  <div>See more photos here</div>
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

              <div className="col-6 pane-info">
                <div className="booking-info">
                  <h1>{listing.title}</h1>
                  <p className="bookingInfo">{listing.description}</p>
                  <div className="priceInfo">
                    <span className="price">
                      <NumberFormat
                        value={listing.totalAmount / 100}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={listing.price.currency + ' '}
                      />
                    </span>
                    <img className="stars" src="/static/stars.svg" />
                  </div>

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
                            prefix={listing.price.currency + ' '}
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
                          prefix={listing.price.currency + ' '}
                        />
                      </span>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-primary btn-book"
                  onClick={this.handleBookingStartClick}
                  disabled={!this.props.isAuthenticated}
                >
                  {this.props.isAuthenticated
                    ? 'Book now'
                    : 'Please login before buying'}
                </button>

                {this.props.listingAuthor && (
                  <div className="media host">
                    <img
                      src={this.props.listingAuthor.avatar}
                      width="36"
                      className="mr-3 avatar"
                    />
                    <div className="media-body">
                      <p>
                        Listed by {this.props.listingAuthor.firstName}{' '}
                        {this.props.listingAuthor.lastName}.
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
            :global(button) {
              background-color: #0055ff;
              color: white;
              width: 100%;
              height: 44px;
              font-weight: 500;
              font-size: 17px;
              border-radius: 4px;
              border: 0;
            }

            :global(button:hover) {
              background-color: #0242c3;
              cursor: pointer;
            }

            .pane-info {
              flex: 0 0 520px;
              padding-left: 88px;
              justify-content: center;
              display: flex;
              flex-direction: column;
              padding-bottom: 50px;
            }

            h1 {
              font-size: 32px;
            }

            .bookingInfo {
              font-size: 17px;
              color: #939393;
            }
            .priceInfo {
              display: flex;
              font-size: 14px;
              letter-spacing: -0.15px;
              margin-bottom: 30px;
            }
            .priceInfo .price {
              font-size: 24px;
              font-weight: 500;
              color: #373737;
              padding-right: 5px;
            }
            .priceInfo img {
              padding-left: 30px;
            }
            .lineItems {
              list-style-type: none;
              padding: 0;
              font-size: 14px;
              color: #666666;
              margin-top: 20px;
              margin-bottom: 20px;
            }
            .lineItemsTotal {
              color: #000000;
              font-size: 17px;
              font-weight: 500;
            }

            .lineItems li {
              padding-top: 2px;
              padding-bottom: 2px;
              display: flex;
              justify-content: space-between;
              height: 26px;
            }
            hr {
              border: 0;
              border-top: 1px solid #d6d6d6;
            }

            .host {
              margin-top: 15px;
            }

            .host img {
              margin-right: 15px;
              align-self: center;
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
              padding-top: 8px;
            }

            .content {
              color: #676767;
            }

            h1 {
              color: #373737;
              font-weight: 600;
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

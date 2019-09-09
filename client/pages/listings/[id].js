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
      isUserVerified: false,
      amount: process.env.NODE_ENV === 'production' ? 78600 : 100,
    };
  }

  static async getInitialProps(context) {
    let id = context.query.id;
    return {
      listing: await API.makeRequest('get', `/api/listings/${id}`),
    };
  }

  componentDidMount() {
    if (Router.query.action && Router.query.action == 'booking') {
      this.setState({
        isBooking: true,
      });
    }

    if (Router.query.verified && Router.query.verified == 'true') {
      this.setState({
        isUserVerified: true,
      });
    }
  }

  handleBookingStartClick = () => {
    this.setState({
      isBooking: true,
    });
  };

  onBookingConfirmed = () => {
    this.setState({
      isBookingConfirmed: true,
    });
  };

  startUserVerification = async () => {
    try {
      let req = await API.makeRequest('post', '/api/verifications/link', {
        listingId: this.props.listing.id,
      });

      if (req && req.url) {
        window.location.href = req.url;
      }
    } catch (err) {
      alert('Verification intent failed', err);
    }
  };

  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title={this.props.listing.title}
      >
        <div className="listings">
          <BookingModalWrapper
            isShown={this.state.isBooking}
            startUserVerification={this.startUserVerification}
            onBookingConfirmed={this.onBookingConfirmed}
            isUserVerified={this.state.isUserVerified}
            isBookingConfirmed={this.state.isBookingConfirmed}
            amount={this.state.amount}
          />

          <div className="content">
            <div className="row">
              <div className="col-8 pane-images">
                <img src={this.props.listing.image} className="image-main" />

                <div className="row">
                  <div className="col-6">
                    <img
                      src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=3453&q=80"
                      className="image-small"
                    />
                  </div>
                  <div className="col-6">
                    <img
                      src="https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2450&q=80"
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

              <div className="col-4 pane-info">
                <div className="booking-info">
                  <h1>{this.props.listing.title}</h1>
                  <p className="bookingInfo">
                    3 guests · 1 bedroom · 1 bed · 2 baths
                  </p>
                  <div className="priceInfo">
                    <span className="price">$174 </span>/ night
                    <img className="stars" src="/static/stars.svg" />
                  </div>
                  <hr />
                  <ul className="lineItems">
                    {[
                      {item: '$174 x 4 nights', amount: '$696'},
                      {item: 'Cleaning fee', amount: '$33'},
                      {item: 'Service fee', amount: '$47'},
                      {item: 'Occupancy taxes and fees', amount: '$10'},
                    ].map(({item, amount}) => (
                      <li key={item}>
                        {item}
                        <span className="lineItemPrice">{amount}</span>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <ul className="lineItems lineItemsTotal">
                    <li>
                      Total{' '}
                      <span className="lineItemPrice">
                        <NumberFormat
                          value={this.state.amount / 100}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$'}
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
                    : 'Please login before booking'}
                </button>

                <div className="media host">
                  <img
                    src="/static/host.png"
                    width="36"
                    className="mr-3 avatar"
                  />
                  <div className="media-body">
                    <p>
                      Your host requires a verified government ID to complete
                      booking.
                    </p>
                  </div>
                </div>
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

            .bookingInfo {
              font-size: 17px;
              color: #939393;
              letter-spacing: 0.3px;
            }
            .priceInfo {
              display: flex;
              font-size: 14px;
              letter-spacing: -0.15px;
              margin-top: 30px;
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
              letter-spacing: -0.1px;
              color: #676767;
            }

            .host .media-body p {
              font-weight: normal;
              text-decoration: none;
              margin: 0;
              line-height: 22px;
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
              border-radius: 6px;

              border-radius: 6px;
              height: 100%;
              object-fit: cover;
              object-position: bottom;

              max-height: 466px;
            }

            .image-small {
              width: 100%;
              border-radius: 6px;
              border-radius: 6px;
              height: 250px;
              object-fit: cover;
              object-position: bottom;
            }

            .btn-book {
              margin-top: 34px;
            }

            .stars {
              align-self: center;
            }

            .pane-images {
              padding-bottom: 50px;
            }

            .booking-info {
              min-height: 462px;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Listing;

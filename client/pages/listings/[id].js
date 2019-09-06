import React from 'react';
import Link from 'next/link';

import Layout from '../../components/layout';
import API from '../../helpers/api';

import BookingModal from '../../components/bookingModal';

class Listing extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false,
      isCompleted: false,
    };
  }

  static async getInitialProps(context) {
    let id = context.query.id;
    return {
      listing: await API.makeRequest('get', `/api/listing/${id}`),
    };
  }

  componentDidMount() {
    if (window.location.hash.indexOf('success') > -1) {
      this.setState({isShowingModal: true, isCompleted: true});
    }
  }

  handleButtonClick = () => {
    this.setState({
      isCompleted: false,
      isShowingModal: !this.state.isShowingModal,
    });
  };

  async openVerifyFlow() {
    try {
      let req = await API.makeRequest('post', '/api/verifications/link', {
        baseUrl: window.location.href,
      });
      if (req && req.url) {
        window.location.href = req.url;
      }
    } catch (err) {
      alert('Verification intent failed', err);
    }
  }

  render() {
    console.log('Listing.render', this.props.token);
    API.setToken(this.props.token); // TODO Find a way to automate this

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="listings">
          <BookingModal
            isShown={this.state.isShowingModal}
            toggleModal={this.handleButtonClick}
            openVerifyFlow={this.openVerifyFlow}
            isCompleted={this.state.isCompleted}
          />
          <div className="content">
            <div className="pane-images">
              <img src="/static/place images.png" />
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
            <div className="pane-info">
              <h1>Two-Story Loft In Old Print Shop</h1>
              <p className="bookingInfo">
                3 guests · 1 bedroom · 1 bed · 2 baths
              </p>
              <div className="priceInfo">
                <span className="price">$174 </span>/ night
                <img src="/static/stars.svg" />
              </div>
              <hr />
              <ul className="lineItems">
                {[
                  {item: '$174 x 7 nights', amount: '$1,218'},
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
                  Total <span className="lineItemPrice">$1,308</span>
                </li>
              </ul>
              <button onClick={this.handleButtonClick}>Book now</button>
              <div className="host">
                <img src="/static/host.png" width="36" />
                <p>
                  Your host requires a verified government ID to complete
                  booking.
                </p>
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
              font-size: 14px;
              letter-spacing: -0.15px;
              margin-top: 30px;
              margin-bottom: 30px;
            }
            .priceInfo .price {
              font-size: 24px;
              font-weight: 500;
              color: #373737;
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
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-top: 15px;
            }
            .host img {
              margin-right: 15px;
            }
            .host p {
              font-size: 14px;
              letter-spacing: -0.1px;
              width: 240px;
              color: #676767;
            }
            .content {
              color: #676767;
              display: flex;
              flex-direction: row;
              align-items: center;
            }
            h1 {
              max-width: 300px;
              color: #373737;
              font-weight: 600;
            }
            .pane-images {
              padding-right: 120px;
            }
            .pane-info {
              width: 375px;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Listing;

import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import HomeSearchForm from '../components/bookingSearchForm';

class Home extends React.Component {
  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Welcome"
      >
        <div className="home">
          <div className="splash-image">
            <div className="container">
              <div className="popover">
                <h1>Book unique places to stay around the globe</h1>

                <HomeSearchForm size="large" />

                <div className="button-container">
                  <Link href="/listings">
                    <a className="btn btn-primary">Show listings</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="annotation">
            <p>
              <img src="static/stripe.svg" width="60" />
              Kavholm is a{' '}
              <a className="stripe" href="https://stripe.com">
                Stripe
              </a>{' '}
              demo that uses{' '}
              <a href="https://stripe.com/connect" target="_blank">
                Connect
              </a>{' '}
              to build a global marketplace.{' '}
              <a
                className="github arrow"
                href="https://github.com/stripe/stripe-demo-connect-kavholm-marketplace"
                target="_blank"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
        <style jsx>{`
          .home {
            width: 100%;
            position: absolute;
            top: 160px;
            left: 0;
            right: 0;
            bottom: 0;
          }

          h1 {
            font-size: 27px;
            font-weight: 600;
            color: #202020;
            width: 70%;
            margin-bottom: 30px;
          }

          .splash-image {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: cover;
            vertical-align: bottom;

            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0) 50%,
                #ffffff 100%
              ),
              url(https://images.unsplash.com/photo-1542349301445-c5f6ec562729?ixlib=rb-1.2.1&auto=format&fit=crop&w=2315&q=80)
                no-repeat;
            background-size: cover;
            background-position: center center;
          }

          .popover {
            padding: 20px;
            position: relative;
            width: 100%;

            background: #ffffff;
            border: 0;
            box-shadow: 0 15px 35px 0 rgba(50, 50, 93, 0.1),
              0 5px 15px 0 rgba(0, 0, 0, 0.07);
            border-radius: 6px;
          }

          @media (min-width: 768px) {
            .popover {
              padding: 40px;
              width: 500px;
              max-width: 500px;
            }
          }
          .booking-form {
            width: 100%;
            margin: 20px 0;
          }

          .button-container {
            display: flex;
            justify-content: flex-end;
          }

          .annotation {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            min-height: 50px;

            background: #fff;
            text-align: center;
            font-size: 12px;
          }

          .annotation img,
          .annotation a,
          .annotation p {
            display: inline-block;
            margin: 0;
          }

          .annotation img {
            margin-right: 10px;
          }

          .annotation a:link,
          .annotation a:visited {
            color: #32325d;
          }

          @media (min-width: 768px) {
            .annotation {
              max-width: 700px;
              margin-left: auto;
              margin-right: auto;
              bottom: 30px;
              border-radius: 50px;
              padding: 10px;
            }
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;

import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';

class Home extends React.Component {
  render() {
    return (
      <Layout
        width="full"
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        hideBooking={true}
      >
        <div className="home">
          <div className="splash-image">
            <div className="popover">
              <h1>Book unique places to stay around the globe.</h1>

              <img src="/static/booking_form.png" className="booking-form" />

              <Link href="/listings">
                <a className="btn btn-primary">Show listings</a>
              </Link>
            </div>
          </div>
        </div>
        <style jsx>{`
          .home {
            width: 100%;
            min-height: 800px;
            position: absolute;
            top: 110px;
            left: 0;
            right: 0;
            bottom: 0;
          }

          .splash-image {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: cover;
            vertical-align: bottom;

            background: url(https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80)
              no-repeat;
            background-size: cover;
            background-position: center center;
          }

          .popover {
            position: absolute;
            top: 100px;
            left: 50px;
            padding: 40px;

            width: 500px;
            max-width: 500px;
          }

          .booking-form {
            width: 100%;
            margin: 20px 0;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;

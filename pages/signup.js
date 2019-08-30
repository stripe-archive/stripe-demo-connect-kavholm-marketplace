import React from 'react';
import Link from 'next/link';
import Modal from '../components/modal';
import Layout from '../components/layout';

class Signup extends React.Component {
  render() {
    let signUpLink = '/api/signup/stripe';

    return (
      <Layout width="full">
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="splash-wrap">
                <div className="splash-image"></div>

                <div className="signup-box">
                  <h1>Earn money as an Kavholm Homes</h1>
                  <a className="btn btn-primary" href="/api/signup/stripe">
                    Signup using Stripe
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row mt-5 mb-5">
              <div className="col-6">
                <h2>Why host on Kavholm Homes?</h2>
                <p>
                  No matter what kind of home or room you have to share, Kavholm
                  Homes makes it simple and secure to host travelers. You’re in
                  full control of your availability, prices, house rules, and
                  how you interact with guests.
                </p>
              </div>
              <div className="col-6">
                <h2>We have your back</h2>
                <p>
                  To keep you, your home, and your belongings safe, we cover
                  every booking with $1M USD in property damage protection and
                  another $1M USD in insurance against accidents.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="mt-5 mb-5 mx-auto splash-text">
                <p>Hosting in 3 steps</p>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <h2>List your space for free</h2>
                <p>
                  Share any space without sign-up charges, from a shared living
                  room to a second home and everything in-between.
                </p>
              </div>
              <div className="col-4">
                <h2>Decide how you want to host</h2>
                <p>
                  Choose your own schedule, prices, and requirements for guests.
                  We’re there to help along the way.
                </p>
              </div>
              <div className="col-4">
                <h2>Welcome your first guest</h2>
                <p>
                  Once your listing is live, qualified guests can reach out. You
                  can message them with any questions before their stay.
                </p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .splash-wrap {
            max-width: 1600px;
            margin: 0 auto;
            position: relative;
          }
          .splash-image {
            width: 100%;

            background-position: 10% 70%;
            background-size: cover;
            background-image: url(https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80);

            height: 500px;
            object-fit: cover;
          }

          .signup-box {
            background: #fff;
            position: absolute;
            top: 100px;
            right: 100px;
            padding: 40px;

            width: 400px;
          }

          .splash-text {
            width: 600px;
          }

          .splash-text p {
            font-size: 50px;
            font-weight: bold;
            text-align: center;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Signup;

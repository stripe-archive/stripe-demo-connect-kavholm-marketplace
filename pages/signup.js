import React from 'react';
import Link from 'next/link';
import Modal from '../components/modal';
import Head from '../components/head';
import Nav from '../components/nav';

class Signup extends React.Component {
  render() {
    let signUpLink = '/api/signup/stripe';

    return (
      <div>
        <Head title="Sign up" />
        <Nav />
        <div className="content">
          <div className="row">
            <div className="col-8">
              <img
                className="splash-image"
                src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              />
            </div>
            <div className="col-4">
              <h1>
                Earn money as an <strong>Kavholm Homes</strong> host
              </h1>

              <a href={signUpLink}>
                <button className="btn btn-primary">Get started!</button>
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <h2>Why host on Kavholm Homes?</h2>
              <p>
                No matter what kind of home or room you have to share, Kavholm
                Homes makes it simple and secure to host travelers. You’re in
                full control of your availability, prices, house rules, and how
                you interact with guests.
              </p>
            </div>
            <div className="col-6">
              <h2>We have your back</h2>
              <p>
                To keep you, your home, and your belongings safe, we cover every
                booking with $1M USD in property damage protection and another
                $1M USD in insurance against accidents.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <h2>Hosting in 3 steps</h2>
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
        <style jsx>{`
          .splash-image {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default Signup;

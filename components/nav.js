import React from 'react';
import Link from 'next/link';
import NavProfile from './navProfile';
import BookingSearchForm from './bookingSearchForm';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className =
      'app ' + this.props.width && this.props.width == 'full'
        ? 'container-fluid nav-fullwidth'
        : 'container';

    return (
      <div className={className}>
        <nav className="navbar navbar-fixed navbar-expand-lg navbar-light">
          <ul className="navbar-nav mr-auto">
            <li className="navitem d-flex">
              <Link href="/">
                <a className="navbar-brand">
                  <img className="logo" src="/static/logo.svg" />
                </a>
              </Link>
            </li>
          </ul>

          <NavProfile
            isAuthenticated={this.props.isAuthenticated}
            userProfile={this.props.userProfile}
          />

          <style jsx>{`
            :global(.nav-fullwidth) {
              padding-left: 50px;
            }

            .navbar {
              margin: 32px 0 32px 0;
              padding: 0;
              height: 45px;
            }

            .navbar-brand {
              display: flex;
              align-content: center;
            }

            .logo {
              align-self: center;
            }
          `}</style>
        </nav>
      </div>
    );
  }
}
export default Nav;

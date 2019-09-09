import React from 'react';
import Link from 'next/link';
import {auth} from '../utils/auth';
import NavProfile from './navProfile';

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

            <li className="nav-item">
              <div className="booking-form">
                <input
                  type="search"
                  className="search"
                  placeholder="Singapore"
                ></input>
                <input
                  type="datepicker"
                  className="date"
                  placeholder="Oct 3-7"
                ></input>
                <select className="guests dropdown-toggle">
                  <option>3 guests</option>
                  <option>2 guests</option>
                  <option>1 guests</option>
                </select>
              </div>
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
              margin: 30px 0 30px 0;
              padding: 0;
              height: 45px;
            }

            .navbar-brand {
              display: flex;
              align-content: center;
            }

            .logo {
              padding-right: 42px;
              align-self: center;
            }

            .booking-form input {
              border: 1px solid rgb(229, 229, 229);
              border-radius: 6px;
              margin-right: 15px;
              padding: 0 10px 0 30px;
              width: 150px;
              font-size: 14px;
            }

            .booking-form select {
              border: 1px solid rgb(229, 229, 229);
              border-radius: 6px;
              margin-right: 15px;
              padding: 0 10px 0 30px;
              font-size: 14px;
              appearance: none;
              color: #757575;
            }

            .booking-form .search {
              background: url(/static/search.svg) no-repeat scroll 7px 6px;
              width: 200px;
              background-size: 15px 15px;
            }

            .booking-form .date {
              background: url(/static/cal.svg) no-repeat scroll 7px 6px;
              background-size: 15px 15px;
            }

            .guests {
              background: url(/static/people.svg) no-repeat scroll 7px 6px;
              background-size: 15px 15px;
            }
          `}</style>
        </nav>
      </div>
    );
  }
}
export default Nav;

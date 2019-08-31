import React from 'react';
import Link from 'next/link';
import {logout, auth} from '../utils/auth';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.syncLogout = this.syncLogout.bind(this);
  }

  handleLogout() {
    logout();
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.syncLogout);
    window.localStorage.removeItem('logout');
  }

  syncLogout(event) {
    if (event.key === 'logout') {
      console.log('logged out from storage!');
    }
  }

  render() {
    let userArea;
    let bookingArea;

    if (this.props.isAuthenticated) {
      userArea = (
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src="/static/avatar.png" height="42" />
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link href="/dashboard">
              <a className="dropdown-item">Dashboard</a>
            </Link>
            <Link href="/profile/stripe">
              <a className="dropdown-item">Connect Stripe</a>
            </Link>
            <a className="dropdown-item" href="#" onClick={this.handleLogout}>
              Logout
            </a>
          </div>
        </li>
      );
      bookingArea = (
        <li className="nav-item">
          <div className="inputs">
            <div className="fake-input">
              <img src="/static/search.svg" />
              <span className="city">Paris</span>
            </div>

            <div className="fake-input">
              <img src="/static/cal.svg" />
              <span>Aug 18 – 25</span>
            </div>

            <div className="fake-input">
              <img src="/static/people.svg" />
              <span>3 guests</span>
            </div>
          </div>
        </li>
      );
    } else {
      userArea = (
        <li className="nav-item">
          <Link href="/signup">
            <a className="btn btn-primary">Get started</a>
          </Link>
        </li>
      );
    }

    return (
      <div className="container">
        <nav className="navbar navbar-fixed navbar-expand-lg navbar-light">
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link href="/">
                <a className="navbar-brand">
                  <img className="logo" src="/static/logo.svg" />
                </a>
              </Link>
            </li>
            {bookingArea}
          </ul>

          <ul className="navbar-nav flex-row">{userArea}</ul>

          <style jsx>{`
            .navbar {
              margin: 30px 0;
              padding: 0;
            }

            .navbar-brand {
              display: flex;
              align-content: center;
            }

            h1 {
              margin: 0;
            }
            .inputs {
              display: flex;
              height: 36px;
            }
            .inputs div {
              margin-right: 12px;
            }
            .fake-input {
              color: #939393;
              padding-right: 40px;
              padding-left: 10px;
              border: 1px solid #dfdfdf;
              border-radius: 8px;
              padding-top: 8px;
              padding-bottom: 8px;
              display: flex;
              align-items: center;
            }
            .fake-input span {
              font-weight: 200;
              padding-left: 8px;
            }
            .fake-input .city {
              padding-right: 110px;
            }

            .logo {
              padding-right: 42px;
            }

            ul {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0;
            }

            li {
              display: flex;
            }
          `}</style>
        </nav>
      </div>
    );
  }
}
export default Nav;

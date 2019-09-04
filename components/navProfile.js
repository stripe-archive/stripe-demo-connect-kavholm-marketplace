import React from 'react';
import Link from 'next/link';
import {logout} from '../utils/auth';

class NavProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    logout();
  }

  render() {
    let items;

    if (this.props.isAuthenticated) {
      items = (
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
              <a className="dropdown-item">Payouts</a>
            </Link>
            <a className="dropdown-item" href="#" onClick={this.handleLogout}>
              Logout
            </a>
          </div>
        </li>
      );
    } else {
      items = (
        <>
          <li className="nav-item">
            <Link href="/login">
              <a className="btn">Login</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/host">
              <a className="btn btn-primary">Host a home</a>
            </Link>
          </li>
        </>
      );
    }

    return <ul className="navbar-nav flex-row">{items}</ul>;
  }
}
export default NavProfile;

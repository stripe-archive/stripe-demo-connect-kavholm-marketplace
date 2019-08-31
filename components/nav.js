import React from 'react';
import Link from 'next/link';
import {logout, auth} from '../utils/auth';
import NavProfile from './navProfile';

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
          </ul>

          <NavProfile isAuthenticated={this.props.isAuthenticated} />

          <style jsx>{`
            .navbar {
              margin: 30px 0;
              padding: 0;
            }

            .navbar-brand {
              display: flex;
              align-content: center;
            }

            .logo {
              padding-right: 42px;
            }
          `}</style>
        </nav>
      </div>
    );
  }
}
export default Nav;

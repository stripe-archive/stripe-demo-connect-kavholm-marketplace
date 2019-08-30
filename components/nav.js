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

    if (this.props.isAuthenticated) {
      userArea = (
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src="/static/avatar.png" height="42" />
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" onClick={this.handleLogout}>
              Logout
            </a>
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
            <li className="nav-item">
              <Link href="/">
                <a className="navbar-brand">
                  <img className="logo" src="/static/logo.svg" />
                </a>
              </Link>
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

            :global(body) {
              font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
                Avenir, Helvetica, sans-serif;
              margin: auto;
            }
            nav {
              text-align: center;
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
            a {
              color: #067df7;
              text-decoration: none;
              font-size: 13px;
            }
          `}</style>
        </nav>
      </div>
    );
  }
}
export default Nav;

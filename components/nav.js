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
        <li>
          <div className="avatar">
            <img src="/static/avatar.png" height="42" />
          </div>
          <a href="#" onClick={this.handleLogout}>
            LOGOUT
          </a>
        </li>
      );
    } else {
      userArea = (
        <li>
          <Link href="/signup">
            <a>Login/Signup</a>
          </Link>
        </li>
      );
    }

    return (
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
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

          {userArea}
        </ul>

        <style jsx>{`
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
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
            max-width: 1200px;
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
    );
  }
}
export default Nav;

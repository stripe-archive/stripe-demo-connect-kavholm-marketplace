import {Component} from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import {redirect} from './redirect.js';

function handleLogin(token, context) {
  console.log('auth.handleLogin', token);
  cookie.set('token', token, {expires: 1});

  redirect('/dashboard', context);
}

function logout() {
  console.log('auth.logout');
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  redirect('/');
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component) =>
  Component.displayName || Component.name || 'Component';

function withAuthSync(WrappedComponent) {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);
      const isAuthenticated = token !== undefined;

      console.log('token', token);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {...componentProps, token, isAuthenticated};
    }

    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
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
        // redirect('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

function auth(ctx) {
  const {token} = nextCookie(ctx);

  // if (!token) {
  //   redirect('/login', ctx);
  // }

  return token;
}

export {handleLogin, logout, withAuthSync, auth};

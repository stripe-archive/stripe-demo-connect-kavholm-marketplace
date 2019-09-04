import React from 'react';
import App, {Container} from 'next/app';
import API from '../helpers/api';
import nextCookie from 'next-cookies';
import Layout from '../components/layout';

export default class KavholmApp extends App {
  state = {
    user: null,
  };

  static async getAuthenticationState(appContext) {
    let token = '';

    if (appContext && appContext.ctx) {
      token = nextCookie(appContext.ctx)['token'];
    }

    const isAuthenticated = token !== undefined;

    return {
      token,
      isAuthenticated,
    };
  }

  static async getInitialProps(appContext) {
    console.log('KavholmApp.getInitialProps');

    let {token, isAuthenticated} = await this.getAuthenticationState(
      appContext,
    );

    API.setToken(token);
    API.setContext(appContext.ctx);

    let userProfile = await API.makeRequest('get', '/api/profile');

    if (appContext.router) {
      console.log(`${appContext.router.route}.getInitialProps`);
    }

    let appProps = await App.getInitialProps(appContext);

    let props = {...appProps, token, isAuthenticated, userProfile};

    return props;
  }

  render() {
    const {
      Component,
      pageProps,
      token,
      isAuthenticated,
      userProfile,
    } = this.props;

    // console.log('KavholmApp.render', this.props);

    let renderProps = {...pageProps, token, isAuthenticated, userProfile};

    return (
      <Container>
        <Component {...renderProps} />
      </Container>
    );
  }
}

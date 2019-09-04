import React from 'react';
import App, {Container} from 'next/app';
import API from '../helpers/api';
import nextCookie from 'next-cookies';
import Layout from '../components/layout';

export default class KavholmApp extends App {
  state = {
    user: null,
  };

  static async getInitialProps(appContext) {
    let token = '';

    if (appContext && appContext.ctx) {
      token = nextCookie(appContext.ctx)['token'];
    }

    const isAuthenticated = token !== undefined;
    let appProps = await App.getInitialProps(appContext);

    let props = {...appProps, token, isAuthenticated};
    // console.log('KavholmApp.getInitialProps', props);

    return props;
  }

  render() {
    const {Component, pageProps, token, isAuthenticated} = this.props;

    // console.log('KavholmApp.render', this.props);

    let renderProps = {...pageProps, token, isAuthenticated};

    return (
      <Container>
        <Component {...renderProps} />
      </Container>
    );
  }
}

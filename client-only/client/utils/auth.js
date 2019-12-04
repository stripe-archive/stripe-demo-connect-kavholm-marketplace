import {Component} from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import {redirect} from './redirect.js';
import logger from '../helpers/logger';

function handleLogin(token, context) {
  logger.log('auth.handleLogin', token);
  cookie.set('token', token, {expires: 1});

  redirect('/dashboard', context);
}

function logout() {
  logger.log('auth.logout');
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  redirect('/');
}

export {handleLogin, logout};

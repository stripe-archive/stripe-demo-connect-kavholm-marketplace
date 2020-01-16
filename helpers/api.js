import fetch from 'isomorphic-unfetch';
import logger from './logger';

class Client {
  constructor() {
    this.token = '';
    this.context = null;
    this.protocol = 'http:';
    this.port = null;
  }

  setToken(token) {
    logger.log('APIclient.setToken', token);
    this.token = token;
  }

  setContext(context) {
    logger.log('APIclient.setContext');
    this.context = context;
  }

  detectContext() {
    if (process.browser) {
      this.host = window.location.hostname;
      this.protocol = window.location.protocol;
      this.port = window.location.port;
    } else {
      if (this.context && this.context.req) {
        this.host = this.context.req.headers.host;

        if (this.context.req && this.context.req.connection) {
          this.protocol = this.context.req.connection.encrypted
            ? 'https:'
            : 'http:';
        }
      }
    }
  }

  async makeRequest(method, url, data) {
    this.detectContext();

    let requestData = data || {};
    let baseUrl = this.getBaseUrl();
    let requestUrl = baseUrl + url;

    logger.log('APIclient.makeRequest.requestUrl', requestUrl, this.token);
    try {
      const response = await fetch(requestUrl, {
        credentials: 'include',
        headers: {
          'content-type': method == 'post' ? 'application/json' : '',
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
        method: method,
        body: method == 'post' ? JSON.stringify(requestData) : null,
      });

      if (response.ok) {
        return await response.json();
      } else {
        let body = await response.text();
        logger.log(
          'APIclient.makeRequest.response.notOkay',
          response.statusText,
          body,
        );
        throw new Error(response.statusText);
      }
    } catch (err) {
      logger.log('APIclient.makeRequest.error', err);
      // throw new Error(err);
    }
  }

  getBaseUrl() {
    return `${this.protocol}//${this.host}${this.port ? ':' + this.port : ''}`;
  }
}

export default new Client();

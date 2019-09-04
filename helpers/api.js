import fetch from 'isomorphic-unfetch';

class Client {
  constructor() {
    this.token = '<fake>';
    this.context = null;
  }

  setToken(token) {
    this.token = token;
  }

  setContext(context) {
    this.context = context;
  }

  detectContext() {
    if (process.browser) {
      this.host = window.location.host;
    } else {
      if (this.context && this.context.req) {
        this.host = this.context.req.headers.host;
      }
    }
  }

  async makeRequest(method, url, data) {
    this.detectContext();

    let requestData = data || {};
    let baseUrl = this.getBaseUrl();
    let requestUrl = baseUrl + url;

    console.log('APIclient.makeRequest.requestUrl', requestUrl);
    try {
      const response = await fetch(requestUrl, {
        credentials: 'include',
        headers: {
          'content-type': method == 'post' ? 'application/json' : '',
          Authorization: JSON.stringify({
            token: this.token,
          }),
        },
        method: method,
        body: method == 'post' ? JSON.stringify(requestData) : null,
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.log(
          'APIclient.makeRequest.response.notOkay',
          response.statusText,
        );
      }
    } catch (err) {
      console.log('APIclient.makeRequest.error', err);
    }
  }

  getBaseUrl() {
    let protocol = 'http';
    return `${protocol}://${this.host}`;
  }
}

export default new Client();

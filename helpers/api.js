import getHost from '../utils/get-host';

class Client {
  constructor() {
    this.token = '';
  }

  async makeRequest(token, method, url, data) {
    let baseUrl = this.getBaseUrl();
    let requestUrl = baseUrl + url;

    console.log('requestUrl', requestUrl);

    try {
      const response = await fetch(requestUrl, {
        credentials: 'include',
        headers: {
          Authorization: JSON.stringify({
            token: token,
          }),
        },
        method: method,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.log('APIclient.makeRequest.error', response);
      }
    } catch (error) {
      console.log('APIclient.makeRequest.error', error);
    }
  }

  getBaseUrl(req) {
    console.log('process.browser', process.browser);
    let protocol = 'http';

    return `${protocol}://${window.location.host}`;

    // return process.browser
    //   ?
    //   : `${protocol}://${req.headers.host}`;
  }
}

export default new Client();

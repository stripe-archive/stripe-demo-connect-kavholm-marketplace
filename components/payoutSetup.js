import { Component } from "react";
import API from "../helpers/api";
import logger from "../helpers/logger";

class PayoutSetup extends Component {
  constructor(props) {
    super(props);

    this.handleConnect = this.handleConnect.bind(this);
  }

  async getRedirectInfo() {
    return API.makeRequest("post", `/api/payouts/stripe`);
  }

  async handleConnect() {
    logger.log("ProfileStripe.handleConnect");
    let response = await this.getRedirectInfo();
    let url = response.location;
    if (url) {
      window.location.href = url;
    }
  }

  render() {
    let signUpLink = "/api/stripe/connect";

    return (
      <>
        <div className="text-center box">
          <img src="/static/icon-bank.svg" className="icon" />
          <h3>Set up payouts to list on Kavholm</h3>
          <p>
            Kavholm partners with Stripe to transfer earnings to your bank
            account.
          </p>

          <a
            className="btn btn-primary text-center"
            onClick={this.handleConnect}
            href="#"
          >
            Set up payouts
          </a>

          <p className="text-center notice">
            You'll be redirected to Stripe to complete the onboarding proces.
          </p>
        </div>
        <style jsx>{`
          .icon {
            margin-bottom: 30px;
            height: 32px;
          }

          .box {
            max-width: 300px;
            max-height: 400px;
          }

          h3 {
            font-weight: 600;
          }

          p {
            line-height: 22px;
          }

          .box .btn {
            width: 100%;
            margin-bottom: 20px;
            margin-top: 16px;
          }

          .box .notice {
            font-size: 12px;
            line-height: 1.5;
          }

          .box h3 {
            margin-bottom: 20px;
          }
        `}</style>
      </>
    );
  }
}

export default PayoutSetup;

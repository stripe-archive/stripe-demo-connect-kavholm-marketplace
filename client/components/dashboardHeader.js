import React, {Component} from 'react';
import API from '../helpers/api';

class DashboardHeader extends Component {
  constructor() {
    super();
    this.state = {
      stripe: null,
    };
  }

  async handleDashboardLink() {
    let req = await API.makeRequest('get', '/api/payouts/link');
    window.open(req.url);
  }

  render() {
    let {profile} = this.props;
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';

    let formattedBalance = '';

    if (this.props.balance && this.props.balance) {
      const locale = new Intl.NumberFormat().resolvedOptions().locale;
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: this.props.balance.currency,
      });

      formattedBalance = formatter.format(this.props.balance.amount / 100);
    }

    return (
      <div className="dashboard-header">
        <div className="row">
          <div className="col-8">
            <div className="media user-details">
              <img src={avatarUrl} className="mr-3 avatar" />
              <div className="media-body">
                <div className="user-details-body align-middle">
                  <h5 className="mt-0">
                    {profile.firstName + ' ' + profile.lastName}
                  </h5>
                  <p className="text-secondary">{profile.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="align-middle stripe-dashboard">
              <p className="label text-secondary">Balance</p>
              <p className="balance">
                {formattedBalance}{' '}
                <a href="#" onClick={this.handleDashboardLink}>
                  View in Stripe Dashboard ↗
                </a>
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .dashboard-header {
            margin-bottom: 50px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgb(229, 229, 229);
          }

          .user-details .avatar {
            height: 55px;
            border-radius: 55px;
            align-self: center;
          }

          .user-details {
            font-size: 14px;
          }

          .user-details-body {
            padding-top: 10px;
          }

          .user-details h5 {
            font-size: 16px;
            margin: 0;
          }

          .user-details p {
            font-size: 12px;
          }

          .stripe-dashboard {
            font-size: 12px;
            padding-top: 4px;
          }

          .stripe-dashboard .label {
            font-size: 16px;
            margin: 0;
            padding: 0;
          }

          .stripe-dashboard .balance {
            margin: 0;
            padding: 0;
            font-size: 16px;
            line-height: 1;
          }

          .stripe-dashboard a {
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }
}
export default DashboardHeader;

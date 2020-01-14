import React, { Component } from "react";
import Link from "next/link";
import API from "../helpers/api";

class DashboardHeader extends Component {
  constructor() {
    super();
  }

  async handleDashboardLink() {
    let req = await API.makeRequest("get", "/api/payouts/link");
    window.open(req.url);
  }

  render() {
    let { profile } = this.props;
    let avatarUrl = profile ? profile.avatar : "/static/avatar.png";

    let formattedBalance = "";

    if (this.props.balance && this.props.balance) {
      const locale = new Intl.NumberFormat().resolvedOptions().locale;
      const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: this.props.balance.currency
      });

      formattedBalance = formatter.format(this.props.balance.amount / 100);
    }

    return (
      <div className="dashboard-header">
        <div className="row">
          <div className="col-4">
            {profile && (
              <div className="media user-details">
                <img src={avatarUrl} className="mr-3 avatar" />
                <div className="media-body">
                  <div className="user-details-body align-middle">
                    <h5 className="mt-0">
                      {profile.firstName + " " + profile.lastName}
                    </h5>
                    <p className="text-secondary">{profile.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-4">
            <div className="align-middle stripe-dashboard">
              {formattedBalance && (
                <>
                  <p className="label text-secondary">
                    Balance{" "}
                    <a href="#" onClick={this.handleDashboardLink}>
                      See Payouts ↗
                    </a>
                  </p>
                  <p className="balance">{formattedBalance} </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link href="/dashboard">
                  <a
                    className={
                      "nav-link " +
                      (this.props.dashboardType == "renter" ? "active" : "")
                    }
                  >
                    Your trips
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard/host">
                  <a
                    className={
                      "nav-link " +
                      (this.props.dashboardType == "host" ? "active" : "")
                    }
                  >
                    Your listings
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .dashboard-header {
            margin-bottom: 20px;
            padding-bottom: 0px;
          }
          .nav-tabs {
            margin: 20px 0;
            box-sizing: border-box;
          }

          .nav-link {
            text-align: left;
            box-sizing: border-box;
            font-size: 16px;
            font-weight: 600;
            padding: 0 8px 8px;
            margin-right: 24px;
            color: #484848;
          }

          .nav-link:hover {
            border: 1px solid #fff;
          }

          .nav-link.active {
            border: #fff;
            border-bottom: 2px solid #007bff;
            padding-top: 1px;
            color: #0055ff;
          }
          .user-details .avatar {
            height: 60px;
            width: 60px;
            border-radius: 60px;
            object-fit: cover;
            align-self: center;
          }

          .user-details {
            font-size: 14px;
            padding-bottom: 12px;
          }

          .user-details-body {
            padding-top: 10px;
          }

          .user-details h5 {
            font-size: 24px;
            margin: 0;
            font-weight: 600;
          }

          .user-details p {
            font-size: 14px;
            margin: 0;
            transform: translateY(-4px);
            margin-top: 4px;
          }

          .stripe-dashboard {
            font-size: 12px;
            padding-top: 4px;
          }

          .stripe-dashboard .label {
            font-size: 14px;
            margin: 0;
            padding: 0;
          }

          .stripe-dashboard .balance {
            margin: 0;
            padding: 0;
            font-size: 22px;
            line-height: 1;
            font-weight: 600;
          }

          .stripe-dashboard a {
            font-weight: 500;
            padding-left: 6px;
          }

          .stripe-dashboard a:hover {
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }
}
export default DashboardHeader;

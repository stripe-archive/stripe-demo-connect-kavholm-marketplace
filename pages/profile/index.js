import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';

class Profile extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    return {
      profile: await API.makeRequest('get', '/api/profile'),
    };
  }

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  render() {
    let profile = this.props ? this.props.profile : {};
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="profile">
          <div className="row">
            <div className="col-12">
              <div className="media user-details">
                <img src={avatarUrl} height="66" className="mr-3" />
                <div className="media-body">
                  <div className="user-details-body align-middle">
                    <h5 className="mt-0">{profile && profile.fullName}</h5>
                    <p className="text-secondary">{profile && profile.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="bg-light" />

          <h5>Profile details:</h5>
          <pre className="profile-details bg-light">
            <code>{JSON.stringify(profile, null, 2)}</code>
          </pre>
        </div>
        <style jsx>{`
          .user-details {
            font-size; 14px;
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

          .profile hr {
            margin-bottom: 50px;
          }

          .profile h4 {
            font-size: 18px;
            margin-bottom: 30px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Profile;

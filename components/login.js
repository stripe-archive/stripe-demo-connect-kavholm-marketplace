// www/pages/login.js

import {Component} from 'react';
import {handleLogin} from '../utils/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: '', error: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const url = `/api/login/token`;

    console.log('url', url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username}),
      });
      if (response.ok) {
        const {token} = await response.json();
        handleLogin(token);
      } else {
        console.log('Login failed.');
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error,
      );
      throw new Error(error);
    }
  }

  render() {
    return (
      <>
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username</label>

            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <button type="submit">Login</button>

            <p className={`error ${this.state.error && 'show'}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .login {
            max-width: 340px;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          form {
            display: flex;
            flex-flow: column;
          }
          label {
            font-weight: 600;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }
        `}</style>
      </>
    );
  }
}

export default Login;

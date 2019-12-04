// www/pages/login.js

import {Component} from 'react';
import {handleLogin} from '../utils/auth';
import logger from '../helpers/logger';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginAsBuyer = this.loginAsBuyer.bind(this);
    this.loginAsSeller = this.loginAsSeller.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  loginAsBuyer() {
    this.setState({
      email: 'buyer@global-marketplace.com',
      password: 'test',
    });
  }

  loginAsSeller() {
    this.setState({
      email: 'seller@global-marketplace.com',
      password: 'test',
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const url = `/api/login/token`;
    const {username, password} = this.state;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state),
      });
      if (response.ok) {
        const {token} = await response.json();
        handleLogin(token);
      } else {
        logger.log('Login failed.');
        this.setState({
          error: response.statusText,
        });
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error,
      );
      this.setState({
        error: response.statusText,
      });
    }
  }

  render() {
    return (
      <>
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <button className="btn btn-link" onClick={this.loginAsBuyer}>
              Demo: Login as buyer
            </button>

            <button className="btn btn-link" onClick={this.loginAsSeller}>
              Demo: Login as seller
            </button>

            <p className={`error ${this.state.error && 'show'}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .login {
            max-width: 340px;
            margin: 0 auto;
            border-radius: 4px;
            min-width: 300px;
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

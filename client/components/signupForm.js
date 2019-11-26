// www/pages/login.js

import {Component} from 'react';
import {handleLogin} from '../utils/auth';
import API from '../helpers/api';
import logger from '../helpers/logger';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 'Demo',
      lastName: 'Host',
      email: 'demoHost@stripe.com',
      password: 'test',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      let req = await API.makeRequest('post', `/api/signup/local`, this.state);
      handleLogin(req.token);
    } catch (err) {
      logger.log('Signup failed.', err);
    }
  }

  render() {
    return (
      <>
        <div className="signup-form">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />

            <label htmlFor="name">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button type="submit" className="btn btn-primary">
              Signup
            </button>

            <p className={`error ${this.state.error && 'show'}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .signup-form {
            max-width: 340px;
            min-width: 300px;
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

export default SignupForm;

// www/pages/login.js

import {Component} from 'react';
import {handleLogin} from '../utils/auth';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: 'Kenneth Auchenberg',
      email: 'kenneth@auchenberg.dk',
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
    const {fullname, email, password} = this.state;

    const url = `/api/signup/local`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state),
      });
      if (response.ok) {
        const {token} = await response.json();

        console.log('SIGNUP token', token);
        handleLogin(token);
      } else {
        console.log('Signup failed.');
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
        <div className="signup-form">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={this.state.fullname}
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

            <button type="submit">Signup</button>

            <p className={`error ${this.state.error && 'show'}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .signup-form {
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

export default SignupForm;

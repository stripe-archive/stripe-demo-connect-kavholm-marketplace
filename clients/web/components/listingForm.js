// www/pages/login.js

import {Component} from 'react';
import {handleLogin} from '../utils/auth';
import API from '../helpers/api';
import logger from '../helpers/logger';

class ListingForm extends Component {
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
      let req = await API.makeRequest('post', `/api/listings`, this.state);
      handleLogin(req.token);
    } catch (err) {
      logger.log('Signup failed.', err);
    }
  }

  render() {
    return (
      <>
        <div className="listing-form">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Listing title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />

            <label htmlFor="email">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />

            <label htmlFor="images">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={this.handleChange}
              multiple
            />

            <button type="submit" className="btn btn-primary">
              Create listing
            </button>

            <p className={`error ${this.state.error && 'show'}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .listing-form {
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

export default ListingForm;

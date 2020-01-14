// www/pages/login.js

import { Component } from "react";
import { handleLogin } from "../utils/auth";
import API from "../helpers/api";
import logger from "../helpers/logger";

class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "Demo",
      lastName: "Host",
      email: "demoHost@stripe.com",
      password: "test",
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      let req = await API.makeRequest("post", `/api/listings`, this.state);
      handleLogin(req.token);
    } catch (err) {
      logger.log("Signup failed.", err);
    }
  }

  render() {
    return (
      <>
        <div className="listing-form">
          <form onSubmit={this.handleSubmit}>
            {/* <div className="row"> */}

            <div className="form-right">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Breezy cabana in Baja California"
                value={this.state.title}
                onChange={this.handleChange}
              />

              <label htmlFor="price">Price per night</label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="$0.00 USD"
                value={this.state.price}
                onChange={this.handleChange}
              />

              <label htmlFor="email">Country</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Mexico"
                value={this.state.location}
                onChange={this.handleChange}
              />
              <div className="form-left">
                <label htmlFor="images">Image</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn-submit btn btn-primary">
                Create
              </button>

              <p className={`error ${this.state.error && "show"}`}>
                {this.state.error && `Error: ${this.state.error}`}
              </p>
              {/* </div> */}
            </div>
          </form>
        </div>
        <style jsx>{`
          .listing-form {
            margin: 0;
            padding: 20px 0 0;
          }
          form {
            display: flex;
            flex-flow: column;
          }
          label {
            font-weight: 600;
          }
          input {
            padding-left: 12px;
          }
          #images {
            height: 68px;
            border: 1px solid rgb(229, 229, 229);
            background: rgb(252, 252, 252);
            // color: transparent;
            padding: 20px 4px 16px 24px;
          }
          #images::-webkit-file-upload-button {
            visibility: hidden;
          }
          #images::-webkit-file-upload-button {
            visibility: hidden;
          }
          #images::before {
            position: absolute;
            content: "Upload";
            color: #fff;
            font-family: inherit;
            // margin: 0 auto;
            // align: center;
            display: inline-block;
            background: #0055ff;
            border: 1px solid #007bff;
            border-radius: 8px;
            padding: 8px 20px;
            margin-top: -6px;
            margin-left: -4px;
            height: 40px;
            outline: none;
            white-space: nowrap;
            -webkit-user-select: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            vertical-align: -50%;
          }
          #images:hover::before {
            opacity: 0.9;
          }
          // #images:hover::before {
          //   opacity: 0.9;
          // }
          // #images:active::before {
          //   background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
          // }
          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }

          .btn-submit {
            margin-top: 20px;
          }
        `}</style>
      </>
    );
  }
}

export default ListingForm;

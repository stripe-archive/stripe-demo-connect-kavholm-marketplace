import React, { Component } from "react";
import BookingModal from "./bookingModal";
import { Elements, StripeProvider, injectStripe } from "react-stripe-elements";
import getConfig from "next/config";

class BookingModalWrapper extends Component {
  constructor() {
    super();
    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    // (componentDidMount only fires in browser/DOM environment)
    let stripePublicKey = getConfig().publicRuntimeConfig.stripe.publicKey;

    if (!window.Stripe) {
      return;
    }

    this.setState({
      stripe: window.Stripe(stripePublicKey)
    });
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <BookingModal {...this.props} />
        </Elements>
      </StripeProvider>
    );
  }
}
export default BookingModalWrapper;

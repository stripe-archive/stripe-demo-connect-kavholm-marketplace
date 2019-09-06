import React, {Component} from 'react';
import Modal from './modal';
import {Elements, StripeProvider, injectStripe} from 'react-stripe-elements';
import getConfig from 'next/config';

class BookingModal extends Component {
  constructor() {
    super();
    this.state = {
      stripe: null,
    };
  }

  componentDidMount() {
    // (componentDidMount only fires in browser/DOM environment)
    let stripePublicKey = getConfig().publicRuntimeConfig.stripe.publicKey;
    this.setState({
      stripe: window.Stripe(stripePublicKey),
    });
  }

  render() {
    let {
      isShown,
      toggleModal,
      openVerifyFlow,
      isCompleted,
      handleButtonClick,
    } = this.props;

    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <Modal
            isShown={isShown}
            toggleModal={handleButtonClick}
            openVerifyFlow={openVerifyFlow}
            isCompleted={isCompleted}
          />
        </Elements>
      </StripeProvider>
    );
  }
}
export default BookingModal;

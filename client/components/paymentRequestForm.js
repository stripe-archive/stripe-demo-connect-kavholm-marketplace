import React, {Component} from 'react';

import {PaymentRequestButtonElement} from 'react-stripe-elements';

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canMakePayment: false,
      hasInitialized: false,
    };
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.stripe) {
      return;
    }

    if (this.state.hasInitialized) {
      return;
    }

    if (this.state.hasInitialized && this.props.stripe === prevProps.stripe) {
      return;
    }

    const paymentRequest = this.props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Total',
        amount: 1,
      },
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    let canMakePayment = await paymentRequest.canMakePayment();
    console.log('PaymentRequestForm.canMakePayment', canMakePayment);
    this.setState({
      canMakePayment: !!canMakePayment,
      hasInitialized: true,
      paymentRequest: paymentRequest,
    });
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{
          paymentRequestButton: {
            theme: 'light',
            height: '64px',
          },
        }}
      />
    ) : null;
  }
}
export default PaymentRequestForm;

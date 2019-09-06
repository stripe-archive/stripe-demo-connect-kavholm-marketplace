import React, {Component} from 'react';

import {PaymentRequestButtonElement} from 'react-stripe-elements';

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canMakePayment: false,
    };
  }

  componentDidUpdate(prevProps) {
    console.log('this.props.stripe', this.props.stripe);

    if (this.props.stripe === prevProps.stripe) {
      return;
    }

    if (!this.props.stripe) {
      return;
    }

    const paymentRequest = this.props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000,
      },
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then((result) => {
      console.log('result', result);
      this.setState({canMakePayment: !!result});
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

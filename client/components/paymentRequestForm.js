import React, {Component} from 'react';

import {PaymentRequestButtonElement} from 'react-stripe-elements';
import API from '../helpers/api';

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
      currency: this.props.currency,
      total: {
        label: 'Total',
        amount: this.props.amount,
      },
    });

    paymentRequest.on('token', async ({complete, token}) => {
      console.log('Received Stripe token: ', token);

      let bookingData = {
        listingId: 26,
        currency: this.props.currency,
        totalAmount: this.props.currency,
        startDate: '09-05-2019',
        endDate: '09-05-2019',
        chargeToken: token,
      };

      try {
        let req = await API.makeRequest(
          'post',
          `/api/bookings/new`,
          bookingData,
        );
        let bookingId = req.id;
        redirect(`/bookings/${bookingId}`);
        complete('success');
      } catch (err) {
        console.log('err', err);
      }
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
      <>
        <PaymentRequestButtonElement
          paymentRequest={this.state.paymentRequest}
          className="PaymentRequestButton"
          style={{
            paymentRequestButton: {
              theme: 'dark',
              height: '44px',
            },
          }}
        />
        <p className="tip-text">or pay with card</p>
        <style jsx>{`
          .tip-text {
            color: rgba(0, 0, 0, 0.5);
            font-size: 14px;
            font-weight: normal;
            letter-spacing: -0.15px;
            text-align: center;
            margin: 20px 0;
          }
        `}</style>
      </>
    ) : null;
  }
}
export default PaymentRequestForm;

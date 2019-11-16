import React, {Component} from 'react';

import {PaymentRequestButtonElement} from 'react-stripe-elements';
import API from '../helpers/api';
import {redirect} from '../utils/redirect';
import logger from '../helpers/logger';

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

    paymentRequest.on('paymentmethod', async (ev) => {
      let bookingData = {
        listingId: 26,
        currency: this.props.currency,
        amount: this.props.amount,
        startDate: '10/03/2019',
        endDate: '10/07/2019',
      };

      let onBookingConfirmed = this.props.onBookingConfirmed;
      let req = await API.makeRequest('post', `/api/bookings/new`, bookingData);

      if (!req) {
        throw new Error('Booking failed');
        return;
      }

      let paymentRequestSecret = req.paymentRequestSecret;

      // Confirm the PaymentIntent without handling potential next actions (yet).
      stripe
        .confirmCardPayment(
          paymentRequestSecret,
          {payment_method: ev.paymentMethod.id},
          {handleActions: false},
        )
        .then((confirmResult) => {
          if (confirmResult.error) {
            ev.complete('fail');
          } else {
            ev.complete('success');
            // Let Stripe.js handle the rest of the payment flow.
            stripe.confirmCardPayment(clientSecret).then((result) => {
              if (result.error) {
                // The payment failed -- ask your customer for a new payment method.
              } else {
                try {
                  complete('success');
                  onBookingConfirmed && onBookingConfirmed(req);
                } catch (err) {
                  console.log('err', err);
                }
              }
            });
          }
        });
    });

    // paymentRequest.on('token', async ({complete, token}) => {
    //   logger.log('Received Stripe token: ', token);

    //   let onBookingConfirmed = this.props.onBookingConfirmed;

    //   let bookingData = {
    //     listingId: 26,
    //     currency: this.props.currency,
    //     amount: this.props.amount,
    //     startDate: '10/03/2019',
    //     endDate: '10/07/2019',
    //     chargeToken: token.id,
    //   };

    //   try {
    //     complete('success');

    //     let req = await API.makeRequest(
    //       'post',
    //       `/api/bookings/new`,
    //       bookingData,
    //     );
    //     onBookingConfirmed && onBookingConfirmed(req);
    //   } catch (err) {
    //     logger.log('err', err);
    //   }
    // });

    let canMakePayment = await paymentRequest.canMakePayment();
    logger.log('PaymentRequestForm.canMakePayment', canMakePayment);
    this.setState({
      canMakePayment: !!canMakePayment,
      hasInitialized: true,
      paymentRequest: paymentRequest,
    });
  }

  render() {
    let className = ['payment-request-form'];

    if (this.state.canMakePayment) {
      className.push('ready');
    }

    return (
      <div className={className.join(' ')}>
        {this.state.canMakePayment && (
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
          </>
        )}

        <style jsx>{`
          .payment-request-form {
            max-height: 0px;
            transition: max-height 0.15s ease-out;
          }

          .ready {
            max-height: 115px;
          }

          .tip-text {
            color: rgba(0, 0, 0, 0.5);
            font-size: 14px;
            font-weight: normal;
            letter-spacing: -0.15px;
            text-align: center;
            margin: 20px 0;
          }
        `}</style>
      </div>
    );
  }
}
export default PaymentRequestForm;

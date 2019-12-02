import React, {Component} from 'react';
import Link from 'next/link';

import {CardElement, injectStripe} from 'react-stripe-elements';
import PaymentRequestForm from './paymentRequestForm';
import NumberFormat from 'react-number-format';
import API from '../helpers/api';
import logger from '../helpers/logger';

class BookingPayment extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isProcessing: false,
    };
  }

  async handleSubmit(event) {
    event.preventDefault();

    let onBookingConfirmed = this.props.onBookingConfirmed;

    try {
      this.setState({
        isProcessing: true,
      });

      let transactionParams = {
        listingId: this.props.listing.id,
      };

      let req = await API.makeRequest(
        'post',
        `/api/transactions/new`,
        transactionParams,
      );

      if (!req) {
        throw new Error('Booking failed');
        return;
      }

      let paymentRequestSecret = req.paymentRequestSecret;

      this.props.stripe
        .handleCardPayment(paymentRequestSecret)
        .then((payload) => {
          if (payload.error) {
            logger.log('Booking failed.', payload.error);
            this.setState({
              error: `Payment failed: ${payload.error.message}`,
            });
          } else {
            onBookingConfirmed && onBookingConfirmed(req.id);
          }
        });
    } catch (err) {
      logger.log('Booking failed.', err);
      this.setState({
        isProcessing: false,
      });

      this.setState({error: err.message});
    }
  }

  render() {
    let amount = this.props.listing.totalAmount;
    let currency = this.props.listing.price.currency;

    return (
      <form onSubmit={this.handleSubmit}>
        <PaymentRequestForm
          stripe={this.props.stripe}
          amount={amount}
          currency={currency.toLowerCase()}
          onBookingConfirmed={this.props.onBookingConfirmed}
        />

        <div className="card-info">
          <CardElement style={{base: {fontSize: '18px', width: '100%'}}} />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={this.state.isProcessing}
        >
          {this.state.isProcessing ? (
            'Processing…'
          ) : (
            <NumberFormat
              value={amount / 100}
              displayType={'text'}
              thousandSeparator={true}
              prefix={currency + ' '}
              renderText={(value) => <>Pay {value}</>}
            />
          )}
        </button>

        {this.state.error && <div className="error">{this.state.error}</div>}

        <style jsx>{`
          .card-info {
            margin-bottom: 20px;
            padding: 10px 10px;
            height: 44px;
            border-radius: 6px;
            box-shadow: 0px 0px 0px 1px rgb(224, 224, 224),
              0px 2px 4px 0px rgba(0, 0, 0, 0.07),
              0px 1px 1.5px 0px rgba(0, 0, 0, 0.05);
          }

          .error {
            color: red;
            padding: 10px;
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
      </form>
    );
  }
}
export default injectStripe(BookingPayment);

import React, {Component} from 'react';
import Modal from 'react-modal';
import {CardElement, injectStripe} from 'react-stripe-elements';
import PaymentRequestForm from './paymentRequestForm';
import API from '../helpers/api';
import {redirect} from '../utils/redirect';

class BookingModal extends Component {
  constructor(props) {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      listingId: 26,
      currency: 'USD',
      totalAmount: props.amount,
      startDate: '09-05-2019',
      endDate: '09-05-2019',
      isProcessing: false,
    };
  }
  async handleSubmit(event) {
    event.preventDefault();

    let bookingData = this.state;

    try {
      this.setState({
        isProcessing: true,
      });

      let req = await API.makeRequest('post', `/api/bookings/new`, bookingData);

      let paymentRequestSecret = req.paymentRequestSecret;
      let bookingId = req.id;

      this.props.stripe
        .handleCardPayment(paymentRequestSecret)
        .then((payload) => {
          if (payload.error) {
            this.setState({
              error: `Payment failed: ${payload.error.message}`,
            });
            console.log('[error]', payload.error);
          } else {
            redirect(`/bookings/${bookingId}`);
          }
        });
    } catch (err) {
      console.log('Booking failed.', err);
      this.setState({error: err.message});
    }
  }

  render() {
    let {isShown, toggleModal, openVerifyFlow, isCompleted} = this.props;

    var style = {
      base: {
        height: '44px',
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    return (
      <Modal
        isOpen={isShown}
        onRequestClose={toggleModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 0,
            width: 480,
            textAlign: 'center',
            paddingTop: '70px',
            paddingBottom: '45px',
            boxShadow: '0px 18px 36px rgba(0,0,0,0.15)',
            borderRadius: '16px',
          },
        }}
      >
        <div className="content">
          {!isCompleted && (
            <>
              <img src="/static/person.svg" />
              <h1>To continue booking, we’ll need to verify your ID.</h1>
              <p className="info">
                Your host requires a verified government-issued ID to complete
                the booking. This will take only a minute.
              </p>
              <button onClick={openVerifyFlow}>Verify your identity</button>
              <p className="footer">
                You’ll be redirected to Stripe to complete the verification
                process.
              </p>
            </>
          )}
          {isCompleted && (
            <div className="completed">
              <img src="/static/confirmed.svg" width="50" />
              <h1>Your ID has been verified.</h1>
              <h1>Pay now to finalize booking.</h1>

              <form onSubmit={this.handleSubmit}>
                <br />
                <br />
                <PaymentRequestForm
                  stripe={this.props.stripe}
                  amount={this.state.totalAmount}
                  currency={this.state.currency}
                />

                <div className="card-info">
                  <CardElement
                    style={{base: {fontSize: '18px', width: '100%'}}}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={this.state.isProcessing}
                >
                  {this.state.isProcessing ? 'Processing…' : 'Pay $1,308'}
                </button>
              </form>
            </div>
          )}
        </div>
        <style jsx>{`
          img {
            margin-bottom: 25px;
          }
          .content {
            width: 350px;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 {
            font-size: 24px;
            line-height: 30px;
            font-weight: 600;
            color: #373737;
            margin: 0;
            text-align: center;
          }
          p {
            color: #373737;
            font-size: 17px;
            font-weight: 300;
            margin: 0;
          }
          .info {
            margin-bottom: 40px;
          }
          button {
            margin-bottom: 25px;
          }
          .footer {
            font-size: 14px;
            line-height: 19px;
          }

          .completed {
            width: 100%;
          }

          .card-info {
            margin-bottom: 20px;
            padding: 10px 10px;
            height: 44px;
            border-radius: 6px;
            box-shadow: 0px 0px 0px 1px rgb(224, 224, 224),
              0px 2px 4px 0px rgba(0, 0, 0, 0.07),
              0px 1px 1.5px 0px rgba(0, 0, 0, 0.05);
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
      </Modal>
    );
  }
}
export default injectStripe(BookingModal);

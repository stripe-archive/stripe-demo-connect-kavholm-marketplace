import React, {Component} from 'react';
import Modal from 'react-modal';

import BookingConfirmedModal from './bookingConfirmedModal';
import BookingPayment from './bookingPayment';

Modal.setAppElement('.app');

class BookingModal extends Component {
  constructor(props) {
    super();

    this.state = {
      booking: {
        currency: 'usd',
        amount: props.amount,
        listingId: 26,
        startDate: '10/03/2019',
        endDate: '10/07/2019',
      },
    };
  }

  render() {
    let {
      isShown,
      toggleModal,
      startUserVerification,
      isUserVerified,
      isBookingConfirmed,
    } = this.props;

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
            position: 'relative',
            top: 200,
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            margin: '0 auto',
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
          {!isUserVerified && !isBookingConfirmed && (
            <>
              <img src="/static/person.svg" />
              <h1>To continue booking, we’ll need to verify your ID.</h1>
              <p className="info">
                Your host requires a verified government-issued ID to complete
                the booking. This will take only a minute.
              </p>
              <button onClick={startUserVerification}>
                Verify your identity
              </button>
              <p className="footer">
                You’ll be redirected to Stripe to complete the verification
                process.
              </p>
            </>
          )}

          {isUserVerified && !isBookingConfirmed && (
            <div className="completed">
              <img src="/static/confirmed.svg" width="50" />
              <h1>Pay now to finalize booking.</h1>

              <br />
              <br />

              <BookingPayment
                stripe={this.props.stripe}
                booking={this.state.booking}
                onBookingConfirmed={this.props.onBookingConfirmed}
              />
            </div>
          )}

          {isUserVerified && isBookingConfirmed && <BookingConfirmedModal />}
        </div>
        <style jsx>{`
          img {
            margin-bottom: 25px;
            height: 44px;
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
            margin-bottom: 16px;
          }
          p {
            color: #373737;
            font-size: 17px;
            line-height: 23px;
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
            opacity: 0.7;
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
export default BookingModal;

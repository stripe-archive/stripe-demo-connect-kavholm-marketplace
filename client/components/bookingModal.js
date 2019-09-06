import React, {Component} from 'react';
import Modal from './modal';
import {Elements, StripeProvider, injectStripe} from 'react-stripe-elements';

class BookingModal extends Component {
  render() {
    let {
      isShown,
      toggleModal,
      openVerifyFlow,
      isCompleted,
      handleButtonClick,
    } = this.props;

    return (
      <StripeProvider apiKey={'pk_test_nuvZwgc7ySc2JyhFMdirs5QS00pVixsTUL'}>
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

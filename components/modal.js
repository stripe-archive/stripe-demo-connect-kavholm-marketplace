import React from 'react';
import Modal from 'react-modal';

export default ({isShown, toggleModal, openVerifyFlow, isCompleted}) => {
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
              Your host requires a verified government-issued ID to complete the
              booking. This will take only a minute.
            </p>
            <button onClick={openVerifyFlow}>Verify your identity</button>
            <p className="footer">
              You’ll be redirected to Stripe to complete the verification
              process.
            </p>
          </>
        )}
        {isCompleted && (
          <>
            <img src="/static/confirmed.svg" />
            <h1>Your booking has been confirmed.</h1>
          </>
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
          margin-bottom: 15px;
          width: 300px;
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
      `}</style>
    </Modal>
  );
};

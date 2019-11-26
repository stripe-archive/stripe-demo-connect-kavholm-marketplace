function NewListingButton(props) {
  const target = React.createRef();

  return (
    <div className="listing-button">
      {props.showTip && (
        <div className="overlay">
          <span className="triangle">▲</span>
          <strong>Time to create your first listing.</strong>
          <br />
          You can now add your home to Global Marketplace.
        </div>
      )}
      <a
        ref={target}
        href="/listings/new"
        className="btn btn-primary btn-new-listing"
      >
        + New
      </a>
      <style jsx>
        {`
          .listing-button {
            position: relative;
          }

          .overlay .triangle {
            position: absolute;
            top: -16px;
            right: 28px;
            color: #000;
            transform: scaleY(0.7);
            font-size: 24px;
          }

          .overlay {
            position: absolute;
            right: 0;
            top: 40px;
            background: #000;
            font-size: 17px;
            line-height: 23px;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
            z-index: 10;
            box-shadow: 0 18px 36px 0 rgba(0, 0, 0, 0.15);
            animation: wiggle 1s infinite;
            animation-direction: alternate;
          }

          .overlay strong {
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 2px;
            display: inline-block;
          }

          .btn-new-listing {
            float: right;
            margin-top: -8px;
          }

          @keyframes wiggle {
            from {
              transform: translateY(0px);
            }
            to {
              transform: translateY(4px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default NewListingButton;

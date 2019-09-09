function NewListingButton(props) {
  const target = React.createRef();

  return (
    <div className="listing-button">
      {props.showTip && (
        <div className="overlay">
          <span className="triangle">▲</span>
          <strong>Time to create your first listing.</strong>
          <br />
          Your account and payout infromation has been verfied, now add your
          home to Kavholm
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
            top: -18px;
            right: 23px;
            color: #000;
          }

          .overlay {
            position: absolute;
            right: 0;
            top: 40px;
            background: #000;
            font-size: 14px;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
            z-index: 10;
          }

          .btn-new-listing {
            float: right;
            margin-top: -8px;
          }
        `}
      </style>
    </div>
  );
}

export default NewListingButton;

import Moment from 'react-moment';

function BookingsList(props) {
  const list = props.list || [];

  let listItems = [];

  if (list) {
    listItems = list.map((i) => (
      <li className="booking-list-item" key={i.id}>
        <a className="media" href={'/transactions/' + i.id}>
          <img src={i.bookingUser.avatar} height="30" className="mr-3 avatar" />

          <div className="media-body">
            <p className="booking-date">
              <Moment format="MMM DD">{i.startDate}</Moment>
              {' — '}
              <Moment format="MMM DD">{i.endDate}</Moment>
            </p>
            <p>
              <strong>
                {i.bookingUser.firstName + ' ' + i.bookingUser.lastName}
              </strong>
            </p>
          </div>

          <div className="verified">✔ Verified</div>
        </a>
        <style jsx>{`
          .booking-list-item {
            padding: 10px 15px;
            margin-bottom: 10px;

            background: rgb(255, 255, 255);
            border-radius: 6px;
            border: 1px solid rgb(229, 229, 229);
          }

          .booking-list-item .avatar {
            align-self: center;
          }

          .booking-list-item p {
            margin: 0;
            line-height: 20px;
          }

          .booking-list-item a {
            color: #000;
          }

          .booking-list-item .booking-date {
            color: rgb(55, 55, 55);
            opacity: 0.8;
            font-size: 14px;
          }

          .booking-list-item .verified {
            color: rgb(30, 166, 114);
            font-size: 14px;
            font-weight: 500;
            letter-spacing: -0.15px;
            align-self: center;

            height: 100%;
          }
        `}</style>
      </li>
    ));
  }

  return (
    <ul className="bookings-list">
      {listItems}

      <style jsx>{`
        .bookings-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </ul>
  );
}

export default BookingsList;

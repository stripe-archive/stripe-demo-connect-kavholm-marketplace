import Moment from 'react-moment';

function BookingsList(props) {
  const list = props.list || [];

  let listItems = [];

  if (list) {
    listItems = list.map((i) => (
      <li className="booking-list-item" key={i.id}>
        <a className="media" href={'/transactions/' + i.id}>
          <img src={i.user.avatar} height="30" className="mr-3 avatar" />
          <div className="media-body">
            <p className="booking-date">
              <Moment format="MMM DD">{i.startDate}</Moment>
              {' — '}
              <Moment format="MMM DD">{i.endDate}</Moment>
            </p>
            <p>
              <strong>{i.user.firstName + ' ' + i.user.lastName}</strong>
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

function ListingsBookingsList(props) {
  const list = props.list || [];

  let listItems = [];

  if (list) {
    listItems = list.map((l) => (
      <div className="booking-list-sub" key={l.title}>
        <h6 className="title">{l.title}</h6>

        {l.bookings && <BookingsList list={l.bookings} />}
        {l.bookings && l.bookings.length === 0 && (
          <span className="empty-text">No bookings yet...</span>
        )}

        <style jsx>{`
          .title {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 20px;
          }

          .empty-text {
            font-size: 14px;
          }
        `}</style>
      </div>
    ));
  }

  return (
    <div className="listings-bookings-list">
      {listItems}

      <style jsx>{`
        .listings-bookings-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default ListingsBookingsList;

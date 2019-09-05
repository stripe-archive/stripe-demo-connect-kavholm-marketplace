function BookingsList(props) {
  const list = props.list || [];

  //   if (list.length < 4) {
  //     while (list.length < 4) {
  //       list.push({id: Math.random()});
  //     }
  //   }

  let listItems = [];

  if (list) {
    listItems = list.map((i) => (
      <li className="booking-list-item" key={i.id}>
        <img src="" height="30" />
        <div className="booking-date">
          {i.startDate} - {i.endDate}
        </div>
        <strong>Booking User Name</strong>
        <div className="verified">✔ Verified</div>

        <style jsx>{`
          .booking-list-item {
            padding: 10px;
            margin-bottom: 10px;

            background: rgb(255, 255, 255);
            border-radius: 6px;
            border: 1px solid rgb(229, 229, 229);
          }

          .booking-list-item .booking-date {
            color: rgb(55, 55, 55);
          }

          .booking-list-item .verified {
            color: rgb(30, 166, 114);
            font-size: 14px;
            font-weight: 500;
            letter-spacing: -0.15px;
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
        <h6>{l.title}</h6>

        <BookingsList list={l.bookings} />

        <style jsx>{`
          .booking-list li {
            height: 30px;

            border: 0;
            margin-bottom: 30px;
            background: #f6f6f6;
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

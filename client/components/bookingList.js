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
      <li className="booking-list-item media" key={i.id}>
        <img src={i.user.avatar} height="30" className="mr-3 avatar" />
        <div className="media-body">
          <div className="align-middle">
            <p className="booking-date">
              {i.startDate} - {i.endDate}
            </p>
            <p>
              <strong>{i.user.fullName}</strong>
            </p>
          </div>
        </div>
        <div className="align-middle">
          <div className="verified">✔ Verified</div>
        </div>
        <style jsx>{`
          .booking-list-item {
            padding: 10px;
            margin-bottom: 10px;

            background: rgb(255, 255, 255);
            border-radius: 6px;
            border: 1px solid rgb(229, 229, 229);
          }

          .booking-list-item p {
            margin: 0;
            line-height: 20px;
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

        <BookingsList list={l.bookings} />

        <style jsx>{`
          .title {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 20px;
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

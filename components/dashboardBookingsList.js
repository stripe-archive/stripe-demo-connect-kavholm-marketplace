import Link from 'next/link';

function DashboardBookingsList(props) {
  const list = props.list ? [...props.list] : [];
  if (list.length < 6) {
    while (list.length < 6) {
      list.push({id: Math.random()});
    }
  }
  let listItems = [];

  if (list) {
    listItems = list.map((item) => (
      <li className="listing-item" key={item.id}>
        {item.listing && (
          <Link href={`/transactions/` + item.id}>
            <a>
              <h4>{item.location}</h4>
              <h3>{item.listing.title}</h3>
              {<img src={item.listing.image} />}
            </a>
          </Link>
        )}
        <style jsx>{`
          .listing-item {
            height: 325px;
            position: relative;

            border: 0;
            background: #f6f6f6;
            border-radius: 4px;
          }

          .listing-item h3 {
            position: absolute;
            bottom: 20px;
            left: 20px;
            z-index: 2;

            margin: 0;
            padding: 0;

            color: #fff;
            font-size: 16px;
            max-width: 50%;
          }

          .listing-item h4 {
            position: absolute;
            bottom: 60px;
            left: 20px;
            z-index: 2;

            margin: 0;
            padding: 0;

            color: #fff;
            font-size: 12px;
            max-width: 50%;
          }

          .listing-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: bottom;
            border: 0;
            filter: brightness(0.6);
            border-radius: 6px;
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

          display: grid;
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 30px;
          grid-auto-rows: minmax(100px, auto);
        }

        @media (min-width: 768px) {
          .bookings-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) { {
          .bookings-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }        
      `}</style>
    </ul>
  );
}

export default DashboardBookingsList;

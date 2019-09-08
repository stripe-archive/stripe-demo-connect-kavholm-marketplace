import Link from 'next/link';

function DashboardListingsList(props) {
  const list = props.list || [];
  if (list.length < 4) {
    while (list.length < 4) {
      list.push({id: Math.random()});
    }
  }

  let listItems = [];

  if (list) {
    listItems = list.map((l) => (
      <li className="listing-item" key={l.id}>
        {l.title && (
          <Link href={`/listings/` + l.id}>
            <a>
              <h3>{l.title}</h3>
              {<img src={l.image} />}
            </a>
          </Link>
        )}
        <style jsx>{`
          .listing-item {
            height: 325px;
            position: relative;

            border: 0;
            background: #f6f6f6;
            border-radius: 6px;
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

          .listing-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: bottom;
            border: 0;
            filter: brightness(0.7);
            border-radius: 6px;
          }
        `}</style>
      </li>
    ));
  }

  return (
    <ul className="listings-list">
      {listItems}

      <style jsx>{`
        .listings-list {
          list-style: none;
          padding: 0;
          margin: 0;

          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 30px;
          grid-auto-rows: minmax(100px, auto);
        }
      `}</style>
    </ul>
  );
}

export default DashboardListingsList;

import Link from 'next/link';

function ListingsList(props) {
  const list = props.list ? [...props.list] : [];
  if (list.length < 4) {
    while (list.length < 4) {
      list.push({id: Math.random()});
    }
  }

  let listItems = [];

  if (list) {
    listItems = list.map((l) => (
      <li className="listing-item" key={l.id}>
        <div className="clip">
          {l.title && (
            <Link href={`/listings/` + l.id}>
              <a>
                {<img src={l.image} />}
                <div className="overlay" />
                <h2>{l.location}</h2>
                <h3>{l.title}</h3>
              </a>
            </Link>
          )}
        </div>
        <style jsx>{`
          .listing-item {
            height: 233px;
            border: 0;
            background: #f6f6f6;
            position: relative;
            // border-radius: 4px;
          }

          .clip {
            position: absolute;
            height: 100%;
            width: 100%;
            overflow: hidden;
            // border-radius: 4px;
          }

          .listing-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: bottom;
            border: 0;
            position: absolute;
            // border-radius: 4px;
          }

          .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            // border-radius: 4px;
            background-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.65)
            );
          }

          .listing-item:hover img {
            filter: brightness(1.02);
            transform: scale(1.02);
            transition: all 200ms ease-out;
          }
          .listing-item:hover h2 {
            color: #fff;
            transition: all 200ms ease;
          }
          .listing-item:hover h3 {
            color: #fff;
            transition: all 200ms ease;
          }
          .listing-item h2 {
            font-size: 10px;
            font-weight: 800;
            color: #ddd;
            width: 100%;
            margin: 12px 0 0;
            text-transform: uppercase;
            position: absolute;
            bottom: 40px;
            left: 16px;
            z-index: 2;
          }
          .listing-item h3 {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            width: 100%;
            margin: 4px 0;
            position: absolute;
            bottom: 12px;
            left: 16px;
            z-index: 2;
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
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 24px 24px;
          grid-auto-rows: minmax(100px, auto);
        }

        @media (min-width: 768px) {
          .listings-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) { {
          .listings-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </ul>
  );
}

export default ListingsList;

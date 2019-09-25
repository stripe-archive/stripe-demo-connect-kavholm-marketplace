function bookingSearchForm(props) {
  return (
    <div
      className={
        props.size && props.size == 'large'
          ? 'booking-search-form large'
          : 'booking-search-form'
      }
    >
      <input type="search" className="search" placeholder="Singapore"></input>
      <input type="datepicker" className="date" placeholder="Oct 3-7"></input>
      <select className="guests dropdown-toggle">
        <option>3 guests</option>
        <option>2 guests</option>
        <option>1 guests</option>
      </select>

      <style jsx>{`
        .booking-search-form input {
          border: 1px solid rgb(229, 229, 229);
          border-radius: 6px;
          margin-right: 15px;
          padding: 0 10px 0 30px;
          width: 150px;
          font-size: 14px;
        }

        .booking-search-form select {
          border: 1px solid rgb(229, 229, 229);
          border-radius: 6px;
          margin-right: 15px;
          padding: 0 10px 0 30px;
          font-size: 14px;
          appearance: none;
          color: #757575;
        }

        .booking-search-form.large input,
        .booking-search-form.large select {
          display: block;
          margin-bottom: 15px;
          width: 100%;
          padding: 8px 40px;
          font-size: 20px;
        }

        .booking-search-form.large .search,
        .booking-search-form.large .date,
        .booking-search-form.large .guests {
          background-size: 20px 20px;
          background-position: 10px 14px;
        }

        .booking-search-form .search {
          background: url(/static/search.svg) no-repeat scroll 7px 6px;
          width: 200px;
          background-size: 15px 15px;
        }

        .booking-search-form .date {
          background: url(/static/cal.svg) no-repeat scroll 7px 6px;
          background-size: 15px 15px;
        }

        .booking-search-form .guests {
          background: url(/static/people.svg) no-repeat scroll 7px 6px;
          background-size: 15px 15px;
        }
      `}</style>
    </div>
  );
}

export default bookingSearchForm;

function bookingSearchForm(props) {
  return (
    <div
      className={
        props.size && props.size == "large"
          ? "booking-search-form large"
          : "booking-search-form"
      }
    >
      <input type="search" className="search" placeholder="Where to?" />
      <input type="datepicker" className="date" placeholder="Check in" />
      <input type="datepicker" className="date right" placeholder="Check out" />
      <select className="guests dropdown-toggle">
        <option>Guests</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
      </select>

      <style jsx>{`
        .booking-search-form input {
          width: 100%;
        }

        .booking-search-form.large .date {
          width: 48%;
          margin-right: 16px;
          display: inline;
        }

        .booking-search-form.large .date.right {
          margin-right: 0;
        }

        .booking-search-form.large .search,
        .booking-search-form.large .date,
        .booking-search-form.large .guests {
          background-size: 20px 20px;
          background-position: 16px 14px;
        }

        .booking-search-form .search {
          background: url(/static/search.svg) no-repeat scroll 7px 6px;
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

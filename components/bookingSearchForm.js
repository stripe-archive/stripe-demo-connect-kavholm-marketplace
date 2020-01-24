import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class BookingSearchForm extends Component {
  constructor() {
    super();

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);

    this.state = {
      startDate: new Date(),
      endDate: moment()
        .add(3, 'days')
        .valueOf(),
    };
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date,
    });
  }

  render() {
    return (
      <div
        className={
          this.props.size && this.props.size == 'large'
            ? 'booking-search-form large'
            : 'booking-search-form'
        }
      >
        <select className="search dropdown-toggle">
          <option>Canada</option>
          <option>Denmark</option>
          <option>France</option>
          <option>Greece</option>
          <option>Mexico</option>
          <option>New Zealand</option>
          <option>Norway</option>
          <option>Singapore</option>
          <option>Spain</option>
          <option>USA</option>
        </select>

        <div className="row">
          <div className="col-6">
            <DatePicker
              selected={this.state.startDate}
              className="date"
              onChange={this.handleStartDateChange}
            />
          </div>
          <div className="col-6">
            <DatePicker
              selected={this.state.endDate}
              className="date"
              onChange={this.handleEndDateChange}
            />
          </div>
        </div>
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
            margin-right: 16px;
            display: inline;
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

          :global(.react-datepicker__input-container input) {
            background: url(/static/cal.svg) no-repeat scroll 18px 17px;
            background-size: 15px 15px;
            color: #757575;
          }

          :global(.react-datepicker__day--selected) {
            background: #0055ff;
          }

          .booking-search-form .guests {
            background: url(/static/people.svg) no-repeat scroll 7px 6px;
            background-size: 15px 15px;
          }
        `}</style>
      </div>
    );
  }
}

export default BookingSearchForm;

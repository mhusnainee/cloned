import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const range = (start, end, step) => {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

const getYear = (date) => {
  return date.getFullYear();
};
const getMonth = (date) => {
  return date.getFullYear();
};
const Datepicker = ({ selectedDate, setSelectedDate }) => {
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
      <DatePicker
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
};

export default Datepicker;

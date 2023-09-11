import React, { useState } from "react";

const BookingForm = () => {
  const [showTimeSelect, setShowTimeSelect] = useState(false);

  const handleFindTimeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent the form from submitting
    setShowTimeSelect(!showTimeSelect); // Toggle visibility
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h4 className="text-center mb-4">Make a reservation</h4>

      <form>
        {/* Party Size */}
        <label
          htmlFor="partySize"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Party Size
        </label>
        <select
          id="partySize"
          className="block w-full mb-4 p-2 border rounded-md"
        >
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} {index === 0 ? "person" : "people"}
            </option>
          ))}
        </select>

        {/* Date */}
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="block w-full mb-4 p-2 border rounded-md"
        />

        {/* Time */}
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Time
        </label>
        <select id="time" className="block w-full mb-4 p-2 border rounded-md">
          {Array.from({ length: 12 * 2 + 1 }, (_, index) => {
            const hour = Math.floor(index / 2);
            const minute = index % 2 === 0 ? "00" : "30";
            const ampm = hour < 12 || hour === 24 ? "AM" : "PM";
            return hour === 0 || hour === 12
              ? `12:${minute} ${ampm}`
              : `${hour % 12}:${minute} ${ampm}`;
          }).map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          type="submit"
          onClick={(e) => handleFindTimeClick(e)}
          className="block w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:bg-red-600 focus:outline-none mb-4"
        >
          Find a time
        </button>

        {showTimeSelect && (
          <>
            <h5 className="text-center my-5">Select a time</h5>
            <div className="grid grid-cols-3 gap-2">
              {["6:30 PM", "", "7:30 PM", "8:00 PM", "8:30 PM", ""].map(
                (time, index) => (
                  <label
                    key={index}
                    className={`block ${
                      time ? "bg-red-500" : "bg-gray-300"
                    }  text-white p-2 rounded-md text-center cursor-pointer hover:bg-red-600 focus:bg-red-600`}
                  >
                    <input
                      type="radio"
                      name="selectedTime"
                      value={time}
                      className="hidden"
                    />
                    {time}
                  </label>
                )
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default BookingForm;

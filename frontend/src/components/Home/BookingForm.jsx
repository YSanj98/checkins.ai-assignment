import React from "react";

const BookingForm = ({
  isEditing,
  formData,
  setFormData,
  handleSubmit,
  errors,
}) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Update form data, converting date strings to ISO format if applicable
    setFormData({
      ...formData,
      [id]: id.includes("Date") ? new Date(value).toISOString() : value,
    });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            "hotelName",
            "hotelAddress",
            "checkInDate",
            "checkOutDate",
            "numOfGuests",
            "numOfRooms",
          ].map((field) => {
            const labels = {
              hotelName: "Hotel Name",
              hotelAddress: "Hotel Address",
              checkInDate: "Check-in Date",
              checkOutDate: "Check-out Date",
              numOfGuests: "Number of Guests",
              numOfRooms: "Number of Rooms",
            };

            return (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {labels[field]} {/* Render label for each field */}
                </label>
                <div className="mt-1">
                  <input
                    type={field.includes("Date") ? "date" : "text"} // Determine input type based on field
                    id={field}
                    required
                    value={
                      field.includes("Date")
                        ? formData[field]?.substring(0, 10) // Display date in YYYY-MM-DD format
                        : formData[field]
                    }
                    onChange={handleChange} // Handle input change
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p> // Display error message if any
                  )}
                </div>
              </div>
            );
          })}

          <div>
            <button
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {isEditing ? "Update" : "Submit"} {/* Button text changes based on editing state */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Formats date as YYYY-MM-DD
};

const BookingList = ({ bookingDetails, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {bookingDetails.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Hotel Name",
                  "Hotel Address",
                  "Check-in Date",
                  "Check-out Date",
                  "Number of Guests",
                  "Number of Rooms",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookingDetails.map((bookingDetail) => (
                <tr key={bookingDetail._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-gray-300">
                    {bookingDetail.hotelName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-gray-300">
                    {bookingDetail.hotelAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-gray-300">
                    {formatDate(bookingDetail.checkInDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-gray-300">
                    {formatDate(bookingDetail.checkOutDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-gray-300">
                    {bookingDetail.numOfGuests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-gray-300">
                    {bookingDetail.numOfRooms}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-gray-300">
                    {/* Edit button */}
                    <button
                      onClick={() => handleEdit(bookingDetail._id)}
                      className="text-indigo-600 hover:text-indigo-900 rounded-md py-1 px-3 bg-indigo-100 hover:bg-indigo-200"
                    >
                      Edit Booking
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(bookingDetail._id)}
                      className="text-red-600 hover:text-red-900 rounded-md py-1 px-3 bg-red-100 hover:bg-red-200 ml-2"
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No bookings found.</p> // Message when no bookings exist
      )}
    </div>
  );
};

export default BookingList;

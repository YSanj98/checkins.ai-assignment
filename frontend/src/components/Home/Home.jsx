import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import { validateBookingInputs } from "../../utils/validateBookingInputs";

const Home = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelAddress: "",
    checkInDate: "",
    checkOutDate: "",
    numOfGuests: "",
    numOfRooms: "",
  });

  const [errors, setErrors] = useState({});
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the booking inputs before submission
    if (!validateBookingInputs(formData, setErrors)) {
      return;
    }

    try {
      // Determine whether to create or update a booking
      const response = isEditing
        ? await axios.put(`${backendUrl}/editBooking/${editingId}`, formData, {
            headers: {
              authorization: `${localStorage.getItem("jwtToken")}`,
            },
          })
        : await axios.post(`${backendUrl}/makeABooking`, formData, {
            headers: {
              authorization: `${localStorage.getItem("jwtToken")}`,
            },
          });

      // Show success alert and reset form
      if (response.data.status === "success") {
        alert(`Booking ${isEditing ? "Updated" : "Created"} Successfully`);
        resetForm();
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      alert(`Booking ${isEditing ? "Update" : "Creation"} Failed`);
    }
  };

  const fetchBookings = async () => {
    try {
      // Fetch existing bookings from the backend
      const response = await axios.get(`${backendUrl}/bookings`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      });
      setBookingDetails(response.data.bookingDetails);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      // Delete the selected booking
      const response = await axios.delete(`${backendUrl}/deleteBooking/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      });
      if (response.status === 200) {
        setBookingDetails(
          bookingDetails.filter((bookingDetail) => bookingDetail._id !== id)
        );
        alert("Booking deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Error deleting booking");
    }
  };

  const handleEdit = async (id) => {
    try {
      // Fetch booking details for editing
      const response = await axios.get(`${backendUrl}/booking/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      });
      const {
        hotelName,
        hotelAddress,
        checkInDate,
        checkOutDate,
        numOfGuests,
        numOfRooms,
      } = response.data.bookingDetails;
      setFormData({
        hotelName,
        hotelAddress,
        checkInDate,
        checkOutDate,
        numOfGuests,
        numOfRooms,
      });
      setIsEditing(true);
      setEditingId(id);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const resetForm = () => {
    // Reset the form fields and editing state
    setFormData({
      hotelName: "",
      hotelAddress: "",
      numOfRooms: "",
      checkInDate: "",
      checkOutDate: "",
      numOfGuests: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-600">
          {isEditing ? "Edit Booking" : "Make A Booking"}
        </h2>
      </div>
      <BookingForm
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-4xl lg:max-w-6xl">
          <h2 className="mt-6 py-12 text-center text-3xl font-extrabold text-blue-600">
            My Bookings
          </h2>
        </div>
        <BookingList
          bookingDetails={bookingDetails}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Home;

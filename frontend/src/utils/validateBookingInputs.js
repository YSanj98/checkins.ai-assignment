export const validateBookingInputs = (formData, setErrors) => {
  const newErrors = {};

  if (!/^[a-zA-Z\s]{3,20}$/.test(formData.hotelName)) {
    newErrors.hotelName =
      "Please enter a hotel name using 3-20 characters, including letters and spaces only.";
  }

  if (!/^[a-zA-Z0-9\s,.'-]{3,100}$/.test(formData.hotelAddress)) {
    newErrors.hotelAddress =
      "Please provide a valid hotel address using 3-100 characters.";
  }

  if (!/^([1-9]|10)$/.test(formData.numOfRooms)) {
    newErrors.numOfRooms = "You are allowed to book a maximum of 10 rooms.";
  }

  if (!formData.checkInDate) {
    newErrors.checkInDate = "Please select a check-in date.";
  }

  if (!formData.checkOutDate) {
    newErrors.checkOutDate = "Please select a check-out date.";
  }

  if (!/^([1-9]|[12][0-9]|30)$/.test(formData.numOfGuests)) {
    newErrors.numOfGuests = "You can book for a maximum of 30 guests.";
  }

  setErrors(newErrors);
  return !Object.keys(newErrors).length;
};

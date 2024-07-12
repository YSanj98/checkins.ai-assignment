const express = require("express");
const router = express.Router();

const User = require("../models/User.js");
const isAuthenticated = require("../middleware/auth.js");

//get all bookings API endpoint
router.get("/bookings", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("bookingDetails");

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res
      .status(200)
      .json({ status: "success", bookingDetails: user.bookingDetails });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
});

//create booking API endpoint
router.post("/makeABooking", isAuthenticated, async (req, res) => {
  const {
    hotelName,
    hotelAddress,
    numOfRooms,
    checkInDate,
    checkOutDate,
    numOfGuests,
  } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    if (
      !hotelName ||
      !hotelAddress ||
      !numOfRooms ||
      !checkInDate ||
      !checkOutDate ||
      !numOfGuests
    ) {
      return res.status(400).send({
        status: "error",
        message:
          "All fields (Hotel Name, Hotel Address, Number of Rooms, Check-in Date, Check-out Date, Number of Guests) are required",
      });
    }

    await User.updateOne(
      { _id: req.user.id },
      {
        $push: {
          bookingDetails: {
            hotelName,
            hotelAddress,
            numOfRooms,
            checkInDate,
            checkOutDate,
            numOfGuests,
          },
        },
      }
    );

    return res
      .status(201)
      .send({ status: "success", message: "Booking created" });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

//delete booking API endpoint
router.delete("/deleteBooking/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    // Find the index of the booking to be deleted
    const bookingIndex = user.bookingDetails.findIndex(
      (booking) => booking._id.toString() === req.params.id
    );

    if (bookingIndex === -1) {
      return res
        .status(404)
        .send({ status: "error", message: "Booking not found" });
    }

    user.bookingDetails.splice(bookingIndex, 1);

    await user.save();

    return res
      .status(200)
      .send({ status: "success", message: "Booking deleted" });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

//retrieve booking API endpoint
router.get("/booking/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("bookingDetails");

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    // Find the booking with the specified ID
    const booking = user.bookingDetails.find(
      (booking) => booking._id.toString() === req.params.id
    );

    if (!booking) {
      return res
        .status(404)
        .send({ status: "error", message: "Booking not found" });
    }

    return res.status(200).send({ status: "success", bookingDetails: booking });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

// Edit booking API endpoint
router.put("/editBooking/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    // Find the booking to be edited
    const booking = user.bookingDetails.find(
      (booking) => booking._id.toString() === req.params.id
    );

    if (!booking) {
      return res
        .status(404)
        .json({ status: "error", message: "Booking not found" });
    }

    // Update the booking details if provided in req.body
    Object.keys(req.body).forEach((key) => {
      if (booking[key] !== undefined) {
        booking[key] = req.body[key];
      }
    });

    await user.save();

    return res
      .status(200)
      .json({ status: "success", message: "Booking updated", booking });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;

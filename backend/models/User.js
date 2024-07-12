const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false,
    },
    bookingDetails: [
      {
        hotelName: {
          type: String,
        },
        hotelAddress: {
          type: String,
        },
        numOfRooms: {
          type: Number,
        },
        checkInDate: {
          type: Date,
          required: true,
        },
        checkOutDate: {
          type: Date,
          required: true,
        },
        numOfGuests: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

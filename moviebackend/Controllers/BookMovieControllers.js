const BookMovie = require('../Models/BookMovie');

// Book Movie
exports.bookMovie = async (req, res) => {
    try {
        const { movieName, bookingDate, theatreName, showTime, noOfSeats, seatNumbers } = req.body;

        // Check if seats are already booked
        const existingBooking = await BookMovie.findOne({
            movieName,
            bookingDate,
            theatreName,
            showTime,
            seatNumbers: { $in: seatNumbers }
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Some seats are already booked!" });
        }

        // Get last reqNumber and increment
        const lastBooking = await BookMovie.findOne().sort({ reqNumber: -1 });
        const newReqNumber = lastBooking ? lastBooking.reqNumber + 1 : 1;

        const newBooking = new BookMovie({
            movieName,
            bookingDate,
            theatreName,
            showTime,
            noOfSeats,
            seatNumbers,
            reqNumber: newReqNumber
        });

        await newBooking.save();
        res.status(200).json({ message: "Movie booked successfully!", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get booked seats for a movie
exports.getBookedSeats = async (req, res) => {
    try {
        const { movieName, bookingDate, theatreName, showTime } = req.query;
        const bookings = await BookMovie.find({ movieName, bookingDate, theatreName, showTime });

        const bookedSeats = bookings.flatMap(booking => booking.seatNumber);
        res.status(200).json({ bookedSeats });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Payment
exports.updatePayment = async (req, res) => {
    try {
        const { reqNumber, paymentMode, tax, totalPayment } = req.body;

        const booking = await BookMovie.findOneAndUpdate(
            { reqNumber },
            { paymentMode, tax, totalPayment, reqType: "Confirmation" },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        res.status(200).json({ message: "Payment updated successfully!", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

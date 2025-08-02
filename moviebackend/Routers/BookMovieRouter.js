const express = require('express');
const { bookMovie, getBookedSeats, updatePayment } = require('../Controllers/BookMovieControllers');
const router = express.Router();

router.post("/book", bookMovie);
router.get("/booked-seats", getBookedSeats);
router.put("/update-payment", updatePayment);

module.exports = router;
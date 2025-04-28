const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getAllBookings = (req, res) => {
  db.query(`SELECT * FROM booking`, (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    res.send({ data: result });
  });
};

const getBookingById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM booking WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Booking topilmadi!" });
    }
    res.send({ data: result[0] });
  });
};

const createBooking = (req, res) => {
  const {
    stadion_id,
    user_id,
    start_time,
    booking_date,
    end_time,
    total_price,
    status,
  } = req.body;
  if (
    !stadion_id ||
    !user_id ||
    !start_time ||
    !booking_date ||
    !end_time ||
    !total_price ||
    !status
  ) {
    return res.status(400).send({ message: "Barcha maydonlarni to'ldiring!" });
  }
  db.query(
    `
    INSERT INTO booking (stadion_id, user_id, start_time, booking_date, end_time, total_price, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      stadion_id,
      user_id,
      start_time,
      booking_date,
      end_time,
      total_price,
      status,
    ],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      res.status(201).send({
        message: "Booking yaratildi!",
        bookingId: result.insertId,
      });
    }
  );
};

const updateBookingById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .send({ message: "Yangilash uchun ma'lumot yuboring!" });
  }
  const updateQuery = queryGenerate(data);
  const values = Object.values(data);
  db.query(
    `UPDATE booking SET ${updateQuery} WHERE id = ?`,
    [...values, id],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Booking topilmadi!" });
      }
      res.send({ message: "Booking yangilandi!" });
    }
  );
};

const removeBookingById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM booking WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Booking topilmadi!" });
    }
    res.send({ message: "Booking o'chirildi!" });
  });
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingById,
  removeBookingById,
};

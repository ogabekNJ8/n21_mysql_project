const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getAllPayments = (req, res) => {
  db.query(`SELECT * FROM payment`, (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    res.send({ data: result });
  });
};

const getPaymentById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM payment WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Payment topilmadi!" });
    }
    res.send({ data: result[0] });
  });
};

const createPayment = (req, res) => {
  const { booking_id, amount, payment_time, payment_method } = req.body;
  if (!booking_id || !amount || !payment_time || !payment_method) {
    return res.status(400).send({ message: "Barcha maydonlarni to'ldiring!" });
  }
  db.query(
    `
    INSERT INTO payment (booking_id, amount, payment_time, payment_method)
    VALUES (?, ?, ?, ?)
    `,
    [booking_id, amount, payment_time, payment_method],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      res.status(201).send({
        message: "To'lov yaratildi!",
        paymentId: result.insertId,
      });
    }
  );
};

const updatePaymentById = (req, res) => {
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
    `UPDATE payment SET ${updateQuery} WHERE id = ?`,
    [...values, id],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Payment topilmadi!" });
      }
      res.send({ message: "Payment yangilandi!" });
    }
  );
};

const removePaymentById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM payment WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Payment topilmadi!" });
    }
    res.send({ message: "Payment o'chirildi!" });
  });
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePaymentById,
  removePaymentById,
};

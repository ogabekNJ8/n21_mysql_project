const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getAllReviews = (req, res) => {
  db.query(`SELECT * FROM review`, (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    res.send({ data: result });
  });
};

const getReviewById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM review WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Review topilmadi!" });
    }
    res.send({ data: result[0] });
  });
};

const createReview = (req, res) => {
  const { stadion_id, user_id, rating, comment } = req.body;
  if (!stadion_id || !user_id || !rating || !comment) {
    return res.status(400).send({ message: "Barcha maydonlarni to'ldiring!" });
  }
  db.query(
    `
    INSERT INTO review (stadion_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
    `,
    [stadion_id, user_id, rating, comment],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      res
        .status(201)
        .send({ message: "Sharh yaratildi!", reviewId: result.insertId });
    }
  );
};

const updateReviewById = (req, res) => {
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
    `UPDATE review SET ${updateQuery} WHERE id = ?`,
    [...values, id],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Review topilmadi!" });
      }
      res.send({ message: "Review yangilandi!" });
    }
  );
};

const removeReviewById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM review WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Review topilmadi!" });
    }
    res.send({ message: "Review o'chirildi!" });
  });
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  removeReviewById,
};

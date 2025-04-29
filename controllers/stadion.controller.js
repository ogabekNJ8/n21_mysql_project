const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getStadionAll = (req, res) => {
  db.query(`SELECT * FROM stadium`, (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    res.send({ data: result });
  });
};

const getOneStadionById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM stadium WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Stadion topilmadi!" });
    }
    res.send({ data: result[0] });
  });
};

const createStadion = (req, res) => {
  const { name, address, location, description, price, owner_id } = req.body;
  if (!name || !address || !location || !price || !owner_id) {
    return res
      .status(400)
      .send({ message: "Barcha majburiy maydonlarni to'ldiring!" });
  }
  db.query(
    `
    INSERT INTO stadium (name, address, location, description, price, owner_id)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [name, address, location, description || "", price, owner_id],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      res.status(201).send({
        message: "Stadion muvaffaqiyatli yaratildi!",
        stadionId: result.insertId,
      });
    }
  );
};

const updateStadionById = (req, res) => {
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
    `UPDATE stadium SET ${updateQuery} WHERE id = ?`,
    [...values, id],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .send({ message: "Yangilanish uchun stadion topilmadi!" });
      }
      res.send({ message: "Stadion muvaffaqiyatli yangilandi!" });
    }
  );
};

const removeStadionById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM stadium WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "O'chirish uchun stadion topilmadi!" });
    }
    res.send({ message: "Stadion muvaffaqiyatli o'chirildi!" });
  });
};

const getStadionByPrice = (req, res) => {
  const { price } = req.body;
  db.query(
    `select s.name, s.address, s.price, b.start_time, b.end_time FROM stadium s 
    JOIN booking b 
    ON b.stadion_id = s.id
    WHERE ${price} > s.price AND (
    (
      SUBSTRING_INDEX(b.end_time, ':', 1) * 60 +
      SUBSTRING_INDEX(b.end_time, ':', -1)
    )  
    -
    (
      SUBSTRING_INDEX(b.start_time, ':', 1) * 60 +
      SUBSTRING_INDEX(b.start_time, ':', -1)
    )
  ) > 120; `,
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      res.send(result);
    }
  );
};

module.exports = {
  getStadionAll,
  getOneStadionById,
  createStadion,
  removeStadionById,
  updateStadionById,
  getStadionByPrice,
};

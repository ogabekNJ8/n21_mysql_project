const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getAllImages = (req, res) => {
  db.query(`SELECT * FROM images`, (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    res.send({ data: result });
  });
};

const getImageById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM images WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Image topilmadi!" });
    }
    res.send({ data: result[0] });
  });
};

const createImage = (req, res) => {
  const { stadion_id, image_url } = req.body;
  if (!stadion_id || !image_url) {
    return res.status(400).send({ message: "Barcha maydonlarni to'ldiring!" });
  }
  db.query(
    `
    INSERT INTO images (stadion_id, image_url)
    VALUES (?, ?)
    `,
    [stadion_id, image_url],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      res
        .status(201)
        .send({ message: "Rasm qo'shildi!", imageId: result.insertId });
    }
  );
};

const updateImageById = (req, res) => {
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
    `UPDATE images SET ${updateQuery} WHERE id = ?`,
    [...values, id],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: "Server xatosi!" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Image topilmadi!" });
      }
      res.send({ message: "Image yangilandi!" });
    }
  );
};

const removeImageById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM images WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: "Server xatosi!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Image topilmadi!" });
    }
    res.send({ message: "Image o'chirildi!" });
  });
};

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  updateImageById,
  removeImageById,
};

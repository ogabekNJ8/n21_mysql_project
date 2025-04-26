const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getStadionAll = (req, res) => {
  db.query(`select * from stadium`, (error, result) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.send({ data: result });
  });
};

const getOneStadionById = (req, res) => {
  const {id} = req.params
  db.query(`select * from stadium where id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.send({ data: result });
  })
};

const createStadion = (req, res) => {};

const updateStadionById = (req, res) => {};

const removeStadionById = (req, res) => {};


module.exports = {
  getStadionAll,
  getOneStadionById,
  createStadion,
  removeStadionById,
  updateStadionById,
};

const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const createUser = (req, res) => {
  const { first_name, last_name, email, password, phone, role } = req.body;
  db.query(
    `
      INSERT INTO users (first_name, last_name, email, password, phone, role)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
    [first_name, last_name, email, password, phone, role],
    (error, result) => {
      if (error) {
        console.log("Error adding new user", error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi user qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const getAllUsers = (req, res) => {
  db.query(`select * from users`, (error, result) => {
    if (error) {
      console.log("Error - get all users", error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  db.query(`select * from users where id = ${id}`, (error, result) => {
    if (error) {
      console.log("Error - get user by id", error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const removeUserById = (req, res) => {
  const { id } = req.params;
  db.query(`delete from users where id = ?`, [id], (error, result) => {
    if (error) {
      console.log("Error - delete user", error);
      return res.status(500).send({ message: `${error.message}` });
    }
    res.send({ message: "User deleted successfully" });
  });
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  updateValue = queryGenerate(data);
  let values = Object.values(data)

  db.query(
    `UPDATE users SET ${updateValue} WHERE id=?`,
    [...values, id],
    (error, result) => {
      if (error) {
        console.log("Error - update user", error);
        return res.status(500).send({ message: `${error.message}` });
      }
      res.send({ message: "User updated successfully" });
    }
  );
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
};

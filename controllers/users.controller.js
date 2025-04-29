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
  let values = Object.values(data);

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

const getUsersByRole = (req, res) => {
  const { role } = req.body;

  db.query(`select * from users where role = ?`, [role], (error, result) => {
    if (error) {
      console.log("Error - select users", error);
      return res.status(500).send({ message: `${error.message}` });
    }
    res.send(result);
  });
};

const getUsersByAnyParams = (req, res) => {
  const { first_name, last_name, phone } = req.body;

  let conditions = [];
  let values = [];

  if (first_name) {
    conditions.push(`first_name = ?`);
    values.push(first_name);
  }
  if (last_name) {
    conditions.push(`last_name = ?`);
    values.push(last_name);
  }
  if (phone) {
    conditions.push(`phone = ?`);
    values.push(phone);
  }
  if (conditions.length === 0) {
    return res.status(400).send({
      message:
        "Kamida bitta ma'lumot yuboring (first_name, last_name yoki phone)!",
    });
  }

  db.query(
    `SELECT * FROM users WHERE ${conditions.join(" AND ")}`,
    values,
    (error, result) => {
      if (error) {
        console.log("Error - select users", error);
        return res.status(500).send({ message: `${error.message}` });
      }
      res.send(result);
    }
  );
};

const getStadionsByOwner = (req, res) => {
  const { first_name, last_name } = req.body;

  db.query(
    `SELECT u.first_name, u.phone, s.name from users u 
    LEFT JOIN stadium s
    ON u.id = s.owner_id
    where  first_name = '${first_name}' and last_name = '${last_name}'`,
    (error, result) => {
      if (error) {
        console.log("Error - select users", error);
        return res.status(500).send({ message: `${error.message}` });
      }
      res.send(result);
    }
  );
};

const findReviewByPhone = (req, res) => {
  const { phone } = req.body;

  db.query(
    `SELECT u.first_name, u.last_name, s.name as stadium_name, r.rating, r.comment FROM users u
    JOIN stadium s
    ON s.owner_id = u.id
    JOIN review r 
    ON r.user_id = u.id
    WHERE u.phone = "${phone}"`, (error, result) => {
      if (error) {
        console.log("Error - find users by phone", error);
        return res.status(500).send({ message: `${error.message}` });
      }
      res.send(result);
    }
  );
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getUsersByRole,
  getUsersByAnyParams,
  getStadionsByOwner,
  findReviewByPhone,
};

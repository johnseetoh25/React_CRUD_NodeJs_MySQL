import {db} from "./db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      return res.status(200).json(data);
    });
}

export const getUsersById = (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [id], (err, results) => {
    if (err) {
      console.error("Error retrieving user:", err);
      res.status(500).json({ error: "Error retrieving user" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(results[0]);
  });

}

export const addUser = (req, res) => {
  const q = "INSERT INTO users(`name`, `email`, `gender`, `date`, `time`) VALUES(?)";
  
  const values = [
    req.body.name,
    req.body.email,
    req.body.gender,
    req.body.date,
    req.body.time,
  ];
  
  db.query(q, [values], (err) => {
    if (err) return res.json(err);
  
    return res.status(200).json("add user's data sucessful");
  });
};

export const updateUser = (req, res) => {
  const q =  "UPDATE users SET `name` = ?, `email` = ? WHERE `id` = ?";
  
  const values = [
    req.body.name,
    req.body.email,
  ];
  
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
  
    return res.status(200).json("edit user's data sucessful");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE `id` = ?";
  
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
  
    return res.status(200).json("delete user's data sucessful");
  });
};
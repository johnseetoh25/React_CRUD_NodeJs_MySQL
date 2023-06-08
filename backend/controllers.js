import {db} from "./db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      return res.status(200).json(data);
    });
}

export const addUser = (req, res) => {
  const q = "INSERT INTO users(`name`, `email`) VALUES(?)";
  
  const values = [
    req.body.name,
    req.body.email,
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
import express  from "express";
import { getUsers, addUser, deleteUser, updateUser, getUsersById } from "./controllers.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUsersById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
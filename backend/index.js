import express from "express";
import cors from "cors";
import getRouter from "./routes.js"

const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cors());

app.use("/users", getRouter);


app.listen(PORT, ()=>{
    console.log(`conected in Node.js and PORT is ${PORT}`);
})
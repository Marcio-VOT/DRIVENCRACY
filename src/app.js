import express, { json } from "express";
import cors from "cors";
import choiceRouter from "./routers/choiceRouter.js";
import pollRouter from "./routers/pollRouter.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(json());
app.use(cors());

app.use([choiceRouter, pollRouter]);

app.listen(port, () => console.log(`Server running in port: ${port}`));

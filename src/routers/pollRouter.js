import pollGet from "../controllers/poolGet/poolGet.JS";
import pollPost from "../controllers/poolPost/poolPost.js";
import pollChoice from "../controllers/pollChoice/pollChoice.js";
import pollResult from "../controllers/pollResult/pollResult.js";
import { pollPostValidation } from "../Middlewares/pollPostValidation";

import { Router } from "express";
import { pollIsOnDb } from "../Middlewares/pollIsOnDb";

const pollRouter = Router();

pollRouter.post("/pool", pollPostValidation, pollPost);
pollRouter.get("/pool", pollGet);
pollRouter.get("/poll/:id/choice", pollIsOnDb, pollChoice);
pollRouter.get("/pool/:id/result", pollIsOnDb, pollResult);

export default pollRouter;

import pollGet from "../controllers/pollGet/pollGet.js";
import pollPost from "../controllers/pollPost/pollPost.js";
import pollChoice from "../controllers/pollChoice/pollChoice.js";
import pollResult from "../controllers/pollResult/pollResult.js";
import { pollPostValidation } from "../Middlewares/pollPostValidation.js";

import { Router } from "express";
import { pollIsOnDb } from "../Middlewares/pollIsOnDb.js";

const pollRouter = Router();

pollRouter.post("/poll", pollPostValidation, pollPost);
pollRouter.get("/poll", pollGet);
pollRouter.get("/poll/:id/choice", pollIsOnDb, pollChoice);
pollRouter.get("/pool/:id/result", pollIsOnDb, pollResult);

export default pollRouter;

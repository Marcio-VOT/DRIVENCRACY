import choiceAddOn from "../controllers/choiceAddOn/choiceAddOn.js";
import setChoice from "../controllers/setChoice/setChoice.js";
import { choicePostValidation } from "../Middlewares/choicePostValidation.js";
import { pollIsOnDb } from "../Middlewares/pollIsOnDb.js";
import { validChoice } from "../Middlewares/isAValidChoice.js";
import { validPoll } from "../Middlewares/isAValidPoll.js";

import { Router } from "express";
import { dupChoice } from "../Middlewares/duplicatedChoice.js";

const choiceRouter = Router();

choiceRouter.post(
  "/choice",
  choicePostValidation,
  pollIsOnDb,
  dupChoice,
  validPoll,
  choiceAddOn
);
choiceRouter.post("/choice/:id/vote", validChoice, validPoll, setChoice);

export default choiceRouter;

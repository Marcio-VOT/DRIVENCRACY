import { ObjectID } from "bson";
import { voteOptionCollection } from "../config/database.js";

export async function dupChoice(req, res, next) {
  const { _id } = res.locals;
  const { title } = req.body;

  const exist = await voteOptionCollection.findOne({
    pollId: _id,
    title,
  });
  if (exist) return res.sendStatus(409);
  next();
}

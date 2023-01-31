import { ObjectId } from "mongodb";
import { voteOptionCollection } from "../config/database.js";

export async function validChoice(req, res, next) {
  const { id } = req.params;

  const exist = await voteOptionCollection.findOne({
    _id: ObjectId(id),
  });
  if (!exist) return res.sendStatus(404);
  res.locals._id = exist.pollId;
  next();
}

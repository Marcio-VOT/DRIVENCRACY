import { ObjectID } from "bson";
import { pollCollection } from "../config/database.js";
export async function pollIsOnDb(req, res, next) {
  let id = req.params.id;
  if (!id) {
    id = req.body.pollId;
  }
  const exist = await pollCollection.findOne({ _id: ObjectID(id) });
  if (!exist) return res.sendStatus(404);
  res.locals._id = ObjectID(id);
  next();
}

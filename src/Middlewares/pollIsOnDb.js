import { ObjectId } from "mongodb";
import { pollCollection } from "../config/database.js";
export async function pollIsOnDb(req, res, next) {
  let id = req.params.id;
  if (!id) {
    id = req.body.pollId;
  }
  const exist = await pollCollection.findOne({ _id: ObjectId(id) });
  if (!exist) return res.sendStatus(404);
  res.locals._id = ObjectId(id);
  next();
}

import { ObjectId } from "mongodb";
import { pollCollection } from "../config/database.js";
export async function pollIsOnDb(req, res, next) {
  let id = req.params.id;
  if (!id) {
    id = req.body.pollId;
  }
  if (!ObjectId.isValid(id)) {
    return res.status(422).send("Id Não compatível com o esperado");
  }
  const exist = await pollCollection.findOne({ _id: ObjectId(id) });
  if (!exist) return res.sendStatus(404);
  res.locals._id = ObjectId(id);
  next();
} 

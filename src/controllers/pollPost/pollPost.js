import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import { pollCollection } from "../../config/database.js";

export default async (req, res) => {
  try {
    let { title, expireAt } = req.body;
    if (!expireAt) {
      expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
    } else {
      expireAt = dayjs(expireAt).format("YYYY-MM-DD HH:mm");
    }
    const pollid = await pollCollection.insertOne({ title, expireAt });
    const poll = await pollCollection.findOne({
      _id: ObjectId(pollid.insertedId),
    });

    res.status(201).send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

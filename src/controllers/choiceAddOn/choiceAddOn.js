import { ObjectId } from "mongodb";
import { voteOptionCollection } from "../../config/database.js";

export default async (req, res) => {
  try {
    const { title, pollId } = req.body;

    const choiceSend = await voteOptionCollection.insertOne({
      title,
      pollId: ObjectId(pollId),
    });
    const chice = await voteOptionCollection.findOne({
      _id: choiceSend.insertedId,
    });

    res.status(201).send(chice);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

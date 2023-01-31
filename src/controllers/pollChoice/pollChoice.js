import { ObjectId } from "mongodb";
import { voteOptionCollection } from "../../config/database.js";

export default async (req, res) => {
  try {
    const { id } = req.params;

    const choices = await voteOptionCollection
      .find({ pollId: ObjectId(id) })
      .toArray();
    res.send(choices);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

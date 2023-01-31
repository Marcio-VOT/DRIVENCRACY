import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { voteCollection } from "../../config/database.js";

export default async (req, res) => {
  try {
    const { id } = req.params;
    await voteCollection.insertOne({
      createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
      choiceId: ObjectId(id),
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

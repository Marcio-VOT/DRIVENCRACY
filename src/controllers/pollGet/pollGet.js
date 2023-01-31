import { pollCollection } from "../../config/database.js";

export default async (req, res) => {
  try {
    const poll = pollCollection.find({}).toArray();
    res.send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

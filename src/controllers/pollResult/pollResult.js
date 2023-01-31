import { voteCollection, pollCollection } from "../../config/database.js";

export default async (req, res) => {
  try {
    const count = objects.reduce((acc, obj) => {
      acc[obj._id] = (acc[obj._id] || 0) + 1;
      return acc;
    }, {});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

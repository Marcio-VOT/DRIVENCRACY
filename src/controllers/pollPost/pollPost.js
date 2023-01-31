import { pollCollection } from "../../config/database.js";

export default async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};

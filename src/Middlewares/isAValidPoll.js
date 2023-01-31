import dayjs from "dayjs";
import { pollCollection } from "../config/database";

export async function validPoll(req, res, next) {
  const { _id } = res.locals;

  const exist = await pollCollection.findOne({
    _id,
  });
  if (exist.expireAt.isBefore(dayjs())) return res.sendStatus(403);

  next();
}

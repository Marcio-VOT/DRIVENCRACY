import { pollPostSchema } from "../Model/pollSchemas/pollSchemas.js";

export async function pollPostValidation(req, res, next) {
  const { error } = pollPostSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);
  next();
}

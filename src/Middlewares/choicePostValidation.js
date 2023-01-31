import { choicePostSchema } from "../Model/choiceSchemas/choiceSchemas.js";

export async function choicePostValidation(req, res, next) {
  const { error } = choicePostSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);
  next();
}

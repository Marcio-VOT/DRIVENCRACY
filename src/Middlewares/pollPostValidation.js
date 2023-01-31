import { pollPostSchema } from "../Model/pollSchemas/pollSchemas.js";

export async function pollPostValidation(req, res, next) {
  const { error } = pollPostSchema.validate(req.body, { abortEarly: false });
  // console.log(error.details);
  if (error) {
    const message = error.details.find(
      (err) => err.type === "string.pattern.base"
    );
    return res
      .status(422)
      .send(message ? message.message : error.details[0].message);
  }
  next();
}

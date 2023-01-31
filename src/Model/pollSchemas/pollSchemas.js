import Joi from "joi";

export const pollPostSchema = Joi.object({
  title: Joi.string().required(),
  expireAt: Joi.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
});

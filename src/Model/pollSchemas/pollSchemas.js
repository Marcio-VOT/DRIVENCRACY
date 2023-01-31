import Joi from "joi";

export const pollPostSchema = Joi.object({
  title: Joi.string().required(),
  expireAt: Joi.date().format("YYYY-MM-DD HH:mm"),
});

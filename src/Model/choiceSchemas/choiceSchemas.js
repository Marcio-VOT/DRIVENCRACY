import Joi from "joi";

export const choicePostSchema = Joi.object({
  title: Joi.string().required(),
  pollId: Joi.string().required(),
});

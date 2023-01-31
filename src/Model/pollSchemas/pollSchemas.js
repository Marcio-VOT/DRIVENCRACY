import Joi from "joi";
import dayjs from "dayjs";

export const pollPostSchema = Joi.object({
  title: Joi.string().required(),
  expireAt: Joi.string()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "Formato de data invalido. Esperado YYYY-MM-DD HH:mm";
        }
      });

      return errors;
    })
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message =
            "Tempo invalido. Esperava hora entre 00 e 23 e minutos entre 00 e 59";
        }
      });

      return errors;
    })
    .regex(/^\d{4}-\d{2}-\d{2} (?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "Data inválida. Verifique o dia e mês";
        }
      });

      return errors;
    })
    .regex(
      /^(20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|30|31)\s([01][0-9]|2[0-3]):[0-5][0-9]$/
    ),
});

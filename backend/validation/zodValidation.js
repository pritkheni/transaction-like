const zod = require("zod");
exports.singupParser = zod.object({
  username: zod.string().email(),
  firstName: zod
    .string()
    .min(1, { message: "firstnaem must be 1 or more charecter" }),
  lastName: zod
    .string()
    .min(1, { message: "lastnaem must be 1 or more charecter" }),
  password: zod
    .string()
    .min(5, { message: "password atleast contain 5 or more charecter" })
    .max(12, { message: "password length must be less then 12 charecter" }),
});

exports.singinParser = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

exports.updateParser = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

exports.trasactionParser = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

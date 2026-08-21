import { ZodType } from "zod";
import { ApiError } from "../utils/errors.js";

export function validate(schema, source = "body") {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".") || source}: ${issue.message}`)
        .join("; ");
      next(new ApiError(422, message));
      return;
    }
    req[source] = result.data;
    next();
  };
}

export function asyncHandler(handler) {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}
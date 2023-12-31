import { RequestHandler } from "express";
import { ZodSchema } from "zod";

export const zodSchemaBodyValidator = <
  TParams = any,
  TQuery = any,
  TBody = any
>(
  zodSchema: ZodSchema<TBody>
): RequestHandler<TParams, any, TBody, TQuery> => {
  return (req, _res, next) => {
    const result = zodSchema.safeParse(req.body);
    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    } else {
      next();
    }
  };
};

export const zodSchemaQueryParamsValidator = <
  TParams = any,
  TQuery = any,
  TBody = any
>(
  zodSchema: ZodSchema<TQuery>
): RequestHandler<TParams, any, TBody, TQuery> => {
  return (req, _res, next) => {
    const result = zodSchema.safeParse(req.query);
    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    } else {
      next();
    }
  };
};

export const zodSchemaParamsValidator = <
  TParams = any,
  TQuery = any,
  TBody = any
>(
  zodSchema: ZodSchema<TParams>
): RequestHandler<TParams, any, TBody, TQuery> => {
  return (req, _res, next) => {
    const result = zodSchema.safeParse(req.params);
    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    } else {
      next();
    }
  };
};

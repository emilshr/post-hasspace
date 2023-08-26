import { Router } from "express";
import { login, signUp } from "../services/auth.service";
import { zodSchemaBodyValidator } from "../middlewares/zod-schema-validator";
import z from "zod";

export const authRouter = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *      description: Used to login a user
 *      tags:
 *          - User login
 *      parameters:
 *          - in: body
 *            name: User login
 *            description: User login parameters
 *            schema:
 *              type: object
 *              required:
 *                 - email
 *                 - password
 *              properties:
 *                  email:
 *                      type: string
 *                      example: john@gmail.com
 *                  password:
 *                      type: string
 *                      minLength: 8
 *                      maxLength: 36
 *                      example: myCustomPassword123@
 *      responses:
 *          '200':
 *              description: User login is successful
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
authRouter.post(
  "/login",
  zodSchemaBodyValidator(
    z.strictObject({ email: z.string().email(), password: z.string().min(8) })
  ),
  (req, res, next) => {
    const { email, password } = req.body;
    login(email, password)
      .then((payload) => {
        res.json(payload);
      })
      .catch((err) => {
        next(err);
      });
  }
);

/**
 * @swagger
 * /api/auth/signUp:
 *   post:
 *      description: Used to register a user
 *      tags:
 *          - User sign-up
 *      parameters:
 *          - in: body
 *            name: User registration
 *            description: User registration parameters
 *            schema:
 *              type: object
 *              required:
 *                 - email
 *                 - name
 *                 - password
 *              properties:
 *                  name:
 *                      type: string
 *                      example: John Doe
 *                  password:
 *                      type: string
 *                      minLength: 8
 *                      maxLength: 36
 *                      example: myCustomPassword123@
 *                  email:
 *                    type: string
 *                    example: john@gmail.com
 *      responses:
 *          '200':
 *              description: User login is successful
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
authRouter.post(
  "/signUp",
  zodSchemaBodyValidator(
    z.strictObject({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })
  ),
  (req, res, next) => {
    const { email, name, password } = req.body;
    signUp(email, name, password)
      .then(() => {
        res.json({ message: "OK" }).end();
      })
      .catch((err) => {
        next(err);
      });
  }
);

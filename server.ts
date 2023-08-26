import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import http from "http";
import { connectToDatabase } from "./config/db";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { router } from "./routers";
import { config } from "./config/config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.prettyPrint({
        colorize: config.environment === "development",
      })
    ),
    // level: config.environment === "development" ? "debug" : "info",
    expressFormat: true,
    colorize: true,
  })
);

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send({ message: "OK" });
});

const { PORT = 3000 } = process.env;

app.use("/api", router);

app.use(errorHandler);

(async () => {
  await connectToDatabase();
  server.listen(PORT, () => {
    console.debug(`Server listening at PORT: ${PORT}`);
  });
})();

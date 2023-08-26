import { connect } from "mongoose";
import { config } from "./config";

export const connectToDatabase = async () => {
  try {
    console.log("db url", config.dbUrl);
    connect(config.dbUrl)
      .then(() => {
        console.log(`Connected to database ... `);
      })
      .catch((err) => {
        console.error(`Error while connecting to database ... ${err}`);
      });
  } catch (error) {
    console.error(`Error while connecting to database ... ${error}`);
  }
};

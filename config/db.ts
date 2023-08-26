import { connect } from "mongoose";
import { config } from "./config";

export const connectToDatabase = async () => {
  try {
    connect(config.dbUrl).then(() => {
      console.log(`Connected to database ... `);
    });
  } catch (error) {
    console.error(`Error while connecting to database ... ${error}`);
  }
};

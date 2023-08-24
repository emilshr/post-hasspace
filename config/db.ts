import { Sequelize } from "sequelize";
import { config } from "./config";

export const sequelize = new Sequelize(config.dbUrl, {
  logging: (msg) => console.log(`[DATABASE] - ${msg}\n`),
});
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error(`Error while connecting to database ... ${error}`);
  }
};

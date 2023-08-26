import * as MongoServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import { testConfig } from "./test-config";

export = async function globalSetup() {
  if (testConfig.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoServer.MongoMemoryServer.create();
    if (instance.state !== "running") {
      await instance.ensureInstance();
    }
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));
  } else {
    process.env.MONGO_URI = `mongodb://${testConfig.IP}:${testConfig.Port}`;
  }

  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(`${process.env.MONGO_URI}/${testConfig.Database}`);
  await mongoose.disconnect();
};

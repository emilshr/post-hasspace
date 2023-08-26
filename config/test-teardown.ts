import { MongoMemoryServer } from "mongodb-memory-server";
import { testConfig } from "./test-config";

export = async function globalTeardown() {
  if (testConfig.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};

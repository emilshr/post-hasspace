import { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  testMatch: ["<rootDir>/**/__tests__/**/*.test.ts"],
  globalSetup: "<rootDir>/config/test-setup.ts",
  globalTeardown: "<rootDir>/config/test-teardown.ts",
  setupFiles: ["<rootDir>/config/setup-test-env.ts"],
  setupFilesAfterEnv: ["<rootDir>/config/setupFile.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};

module.exports = jestConfig;

import { login, signUp } from "../auth.service";

describe("Login test suite #1", () => {
  it("should throw an error when trying to login the user", async () => {
    await expect(login("random_email", "mypassword123")).rejects.toThrow();
    await expect(
      login("random_email", undefined as unknown as string)
    ).rejects.toThrow();
    await expect(
      login(undefined as unknown as string, undefined as unknown as string)
    ).rejects.toThrow();
    await expect(
      login("proper_email@gmail.com", "mypassword123")
    ).rejects.toThrowError("Invalid credentials");
  });
});

describe("Login test suite #2", () => {
  beforeAll(async () => {
    await signUp("sample@gmail.com", "John Doe", "mypassword123");
  });

  it("should return the access token when trying to login the user", async () => {
    const { accessToken } = await login("sample@gmail.com", "mypassword123");
    expect(accessToken).toBeDefined();
  });
});

export const config = {
  secret: process.env.SECRET || "",
  dbUrl: process.env.DB_URL || "",
  environment: process.env.NODE_ENV || "production",
};

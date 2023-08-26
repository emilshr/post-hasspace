import swaggerJsDoc from "swagger-jsdoc";

export const config = {
  secret: process.env.SECRET || "",
  dbUrl: process.env.DB_URL || "",
  environment: process.env.NODE_ENV || "production",
};

export const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Post API",
    },
  },
  apis: ["express-server.ts", "./routers/*.router.ts"],
});

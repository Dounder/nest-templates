export const ENV_CONFIGURATION = () => ({
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbUsername: process.env.DB_USERNAME,
  port: process.env.PORT,
  state: process.env.STATE,
  jwtSecret: process.env.JWT_SECRET,
});

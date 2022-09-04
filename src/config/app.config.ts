export const EnvConfiguration = () => ({
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbUsername: process.env.DB_USERNAME,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
});

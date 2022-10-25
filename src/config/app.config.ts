export const ENV_CONFIGURATION = () => ({
  state: process.env.STATE,
  dbPassword: process.env.DB_PASSWORD,
  dbUsername: process.env.DB_USERNAME,
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT || 300,
  jwtKey: process.env.JWT_SECRET,
});

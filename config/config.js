require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbEngine: process.env.DB_ENGINE,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mailerEmail: process.env.MAILER_EMAIL,
  mailerPassword: process.env.MAILER_PASSWORD,
  superAdminPass: process.env.SUPER_ADMIN_PASSWORD,
  frontEnd: process.env.FRONT_END,
  mlRedirectUri: process.env.ML_REDIRECT_URI,
  mlApi: process.env.ML_API,
  mlAppId: process.env.ML_APP_ID,
  mlSecret: process.env.ML_SECRET,
  backEnd: process.env.BACK_END,
};
// console.log('Config', config);

module.exports = { config };

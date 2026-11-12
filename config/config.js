import "dotenv/config";

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI,
  adminName: process.env.ADMIN_NAME,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPasswordHash: process.env.ADMIN_PASSWORD,
};

export default config;

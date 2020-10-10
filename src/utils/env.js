import { config } from 'dotenv';

config();

export default {
  databaseURL: process.env.DATABASE_URL
    || process.env.POSTGRESQLCONNSTR_AZURE || process.env.TEST_DATABASE_URL
    || process.env.DEV_DATABASE_URL,
  JwtSecret: process.env.JWT_SECRET,
};

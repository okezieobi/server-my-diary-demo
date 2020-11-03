import { config } from 'dotenv';

config();

let databaseURL;
if (process.env.NODE_ENV === 'test') databaseURL = process.env.TEST_DATABASE_URL;
else if (process.env.NODE_ENV === 'production') databaseURL = process.env.DATABASE_URL;
else databaseURL = process.env.DEV_DATABASE_URL;

export default {
  databaseURL,
  jwtSecret: process.env.JWT_SECRET,
};

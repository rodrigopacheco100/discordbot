import dotenv from 'dotenv';

dotenv.config();

export default {
  prefix: '!',
  token: process.env.TOKEN,
};

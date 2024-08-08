import 'dotenv/config';

export const config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  MONGO_URI: process.env.MONGO_URI || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  profanityList: ['badword1', 'badword2', 'badword3'], // Replace with your actual profanity list
};
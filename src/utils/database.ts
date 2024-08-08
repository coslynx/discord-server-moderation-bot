import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from './logger';
import { config } from './config';

export const connectToDatabase = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as ConnectOptions);

    logger.info('Connected to MongoDB!');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
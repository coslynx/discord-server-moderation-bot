import { Client, IntentsBitField } from 'discord.js';
import { config } from '@utils/config';
import { connectToDatabase } from '@utils/database';
import { logger } from '@utils/logger';
import { registerCommands } from '@commands/index';
import { registerEvents } from '@events/index';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildWebhooks,
  ],
});

client.on('ready', async () => {
  logger.info(`Logged in as ${client.user.tag}!`);

  await connectToDatabase(config.MONGO_URI);

  await registerCommands(client);
  await registerEvents(client);

  logger.info('ModerationBot is ready!');
});

client.on('error', (error) => {
  logger.error('Discord Client Error:', error);
});

client.on('warn', (warning) => {
  logger.warn('Discord Client Warning:', warning);
});

client.on('disconnect', (disconnectEvent) => {
  logger.warn('Discord Client Disconnected:', disconnectEvent);
});

client.login(config.DISCORD_TOKEN);
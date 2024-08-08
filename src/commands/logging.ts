import { SlashCommandBuilder } from 'discord.js';
import { LoggingService } from '@services/loggingService';
import { logger } from '@utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('logging')
    .setDescription('Manage server logging')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('enable')
        .setDescription('Enable server logging')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('disable')
        .setDescription('Disable server logging')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('get')
        .setDescription('Get server logs')
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('The type of logs to retrieve')
            .setRequired(true)
            .addChoices(
              { name: 'messages', value: 'messages' },
              { name: 'members', value: 'members' },
              { name: 'moderation', value: 'moderation' }
            )
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();

      const loggingService = new LoggingService(interaction.guild);

      switch (subcommand) {
        case 'enable': {
          await loggingService.enableLogging();
          await interaction.reply({
            content: 'Server logging enabled!',
            ephemeral: true,
          });
          break;
        }
        case 'disable': {
          await loggingService.disableLogging();
          await interaction.reply({
            content: 'Server logging disabled!',
            ephemeral: true,
          });
          break;
        }
        case 'get': {
          const logType = interaction.options.getString('type', true);
          const logs = await loggingService.getLogs(logType);

          const logMessage = logs.length > 0
            ? logs.map((l) => `- ${l}`).join('\n')
            : `No ${logType} logs found.`;

          await interaction.reply({
            content: `Server ${logType} Logs:\n${logMessage}`,
            ephemeral: true,
          });
          break;
        }
        default: {
          throw new Error('Invalid subcommand');
        }
      }
    } catch (error) {
      logger.error('Error executing logging command:', error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  },
};
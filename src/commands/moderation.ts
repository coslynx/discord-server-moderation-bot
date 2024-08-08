import { SlashCommandBuilder } from 'discord.js';
import { ModerationService } from '@services/moderationService';
import { logger } from '@utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('moderation')
    .setDescription('Moderation commands for server management')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('The user to kick')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('reason')
            .setDescription('Reason for kicking the user')
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('The user to ban')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('reason')
            .setDescription('Reason for banning the user')
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('mute')
        .setDescription('Mute a user in the server')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('The user to mute')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('reason')
            .setDescription('Reason for muting the user')
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('unmute')
        .setDescription('Unmute a user in the server')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('The user to unmute')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('warn')
        .setDescription('Warn a user in the server')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('The user to warn')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('reason')
            .setDescription('Reason for warning the user')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const moderationService = new ModerationService(interaction.guild);

      switch (subcommand) {
        case 'kick': {
          const user = interaction.options.getUser('user', true);
          const reason = interaction.options.getString('reason');

          await moderationService.kickUser(user, reason);
          await interaction.reply({
            content: `User ${user.username} kicked successfully!`,
            ephemeral: true,
          });
          break;
        }
        case 'ban': {
          const user = interaction.options.getUser('user', true);
          const reason = interaction.options.getString('reason');

          await moderationService.banUser(user, reason);
          await interaction.reply({
            content: `User ${user.username} banned successfully!`,
            ephemeral: true,
          });
          break;
        }
        case 'mute': {
          const user = interaction.options.getUser('user', true);
          const reason = interaction.options.getString('reason');

          await moderationService.muteUser(user, reason);
          await interaction.reply({
            content: `User ${user.username} muted successfully!`,
            ephemeral: true,
          });
          break;
        }
        case 'unmute': {
          const user = interaction.options.getUser('user', true);

          await moderationService.unmuteUser(user);
          await interaction.reply({
            content: `User ${user.username} unmuted successfully!`,
            ephemeral: true,
          });
          break;
        }
        case 'warn': {
          const user = interaction.options.getUser('user', true);
          const reason = interaction.options.getString('reason', true);

          await moderationService.warnUser(user, reason);
          await interaction.reply({
            content: `User ${user.username} warned successfully!`,
            ephemeral: true,
          });
          break;
        }
        default: {
          throw new Error('Invalid subcommand');
        }
      }
    } catch (error) {
      logger.error('Error executing moderation command:', error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  },
};
import { SlashCommandBuilder } from 'discord.js';
import { RoleService } from '@services/roleService';
import { logger } from '@utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Manage server roles')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('create')
        .setDescription('Create a new role')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The name of the role')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('color')
            .setDescription('The hex color of the role')
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('delete')
        .setDescription('Delete a role')
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('The role to delete')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('assign')
        .setDescription('Assign a role to a user')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('The user to assign the role to')
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('The role to assign')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remove')
        .setDescription('Remove a role from a user')
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('The user to remove the role from')
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('The role to remove')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const roleService = new RoleService(interaction.guild);

      switch (subcommand) {
        case 'create': {
          const name = interaction.options.getString('name', true);
          const color = interaction.options.getString('color');

          const role = await roleService.createRole(name, color);
          await interaction.reply({
            content: `Role "${name}" created successfully!`,
            ephemeral: true,
          });
          break;
        }
        case 'delete': {
          const role = interaction.options.getRole('role', true);
          await roleService.deleteRole(role);
          await interaction.reply({
            content: `Role "${role.name}" deleted successfully!`,
            ephemeral: true,
          });
          break;
        }
        case 'assign': {
          const user = interaction.options.getUser('user', true);
          const role = interaction.options.getRole('role', true);

          await roleService.assignRole(user, role);
          await interaction.reply({
            content: `Role "${role.name}" assigned to ${user.username} successfully!`,
            ephemeral: true,
          });
          break;
        }
        case 'remove': {
          const user = interaction.options.getUser('user', true);
          const role = interaction.options.getRole('role', true);

          await roleService.removeRole(user, role);
          await interaction.reply({
            content: `Role "${role.name}" removed from ${user.username} successfully!`,
            ephemeral: true,
          });
          break;
        }
        default: {
          throw new Error('Invalid subcommand');
        }
      }
    } catch (error) {
      logger.error('Error executing roles command:', error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  },
};
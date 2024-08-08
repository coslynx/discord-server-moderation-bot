import { GuildMember, Client } from 'discord.js';
import { logger } from '@utils/logger';
import { LoggingService } from '@services/loggingService';
import { RoleService } from '@services/roleService';
import { config } from '@utils/config';

export default (client: Client) => {
  client.on('guildMemberAdd', async (member: GuildMember) => {
    try {
      const loggingService = new LoggingService(member.guild);
      await loggingService.logMemberJoin(member);

      const roleService = new RoleService(member.guild);

      // Assign default roles if configured
      if (config.defaultRoles) {
        const defaultRoles = config.defaultRoles.map((roleName) =>
          member.guild.roles.cache.find((role) => role.name === roleName)
        );

        if (defaultRoles.length > 0) {
          await member.roles.add(defaultRoles);
        }
      }

      // Trigger welcome message if configured
      if (config.welcomeMessage) {
        const welcomeChannel = member.guild.channels.cache.find(
          (channel) => channel.name === config.welcomeChannelName
        );

        if (welcomeChannel) {
          await welcomeChannel.send(
            config.welcomeMessage.replace('{user}', member.user.toString())
          );
        }
      }

      logger.info(`User ${member.user.tag} joined the guild.`);
    } catch (error) {
      logger.error('Error handling guildMemberAdd event:', error);
    }
  });
};
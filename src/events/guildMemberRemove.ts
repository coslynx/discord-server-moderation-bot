import { GuildMember, Client } from 'discord.js';
import { logger } from '@utils/logger';
import { LoggingService } from '@services/loggingService';

export default (client: Client) => {
  client.on('guildMemberRemove', async (member: GuildMember) => {
    try {
      const loggingService = new LoggingService(member.guild);
      await loggingService.logMemberLeave(member);

      // Additional actions based on your bot's configuration
      // ...

      logger.info(`User ${member.user.tag} left the guild.`);
    } catch (error) {
      logger.error('Error handling guildMemberRemove event:', error);
    }
  });
};
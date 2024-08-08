import { Guild, GuildMember, Message } from 'discord.js';
import { GuildModel } from '@models/guild';
import { MessageModel } from '@models/message';
import { logger } from '@utils/logger';

export class LoggingService {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  async enableLogging(): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData) {
        throw new Error('Guild data not found!');
      }

      guildData.loggingEnabled = true;
      await guildData.save();
    } catch (error) {
      logger.error('Error enabling logging:', error);
    }
  }

  async disableLogging(): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData) {
        throw new Error('Guild data not found!');
      }

      guildData.loggingEnabled = false;
      await guildData.save();
    } catch (error) {
      logger.error('Error disabling logging:', error);
    }
  }

  async logMessage(message: Message): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData || !guildData.loggingEnabled) {
        return;
      }

      await MessageModel.create({
        guildId: this.guild.id,
        channelId: message.channelId,
        authorId: message.author.id,
        content: message.content,
        createdAt: message.createdAt,
        editedAt: message.editedAt,
        deletedAt: message.deletedAt,
        attachments: message.attachments.map((a) => a.url),
        embeds: message.embeds.map((e) => JSON.stringify(e)),
        reactions: message.reactions.cache.map((r) => r.emoji.name),
        mentions: message.mentions.users.map((u) => u.id),
      });
    } catch (error) {
      logger.error('Error logging message:', error);
    }
  }

  async logMemberJoin(member: GuildMember): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData || !guildData.loggingEnabled) {
        return;
      }

      // Log member join event (add more details as needed)
      logger.info(`User ${member.user.tag} joined the guild.`);
    } catch (error) {
      logger.error('Error logging member join:', error);
    }
  }

  async logMemberLeave(member: GuildMember): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData || !guildData.loggingEnabled) {
        return;
      }

      // Log member leave event (add more details as needed)
      logger.info(`User ${member.user.tag} left the guild.`);
    } catch (error) {
      logger.error('Error logging member leave:', error);
    }
  }

  async getLogs(logType: 'messages' | 'members' | 'moderation'): Promise<string[]> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData || !guildData.loggingEnabled) {
        throw new Error('Logging is disabled for this server.');
      }

      switch (logType) {
        case 'messages': {
          const messages = await MessageModel.find({ guildId: this.guild.id });
          return messages.map(
            (m) =>
              `${m.createdAt.toLocaleString()} - ${m.authorId} in #${
                m.channelId
              }: ${m.content}`
          );
        }
        case 'members': {
          // Retrieve member join/leave logs from your database
          // Example:  const members = await MemberModel.find({ guildId: this.guild.id });
          //           return members.map((m) => `${m.joinedAt} - ${m.userId} joined/left the guild`);
          return ['// Implement member join/leave logging here'];
        }
        case 'moderation': {
          // Retrieve moderation logs from your database
          // Example:  const moderationActions = await ModerationActionModel.find({ guildId: this.guild.id });
          //           return moderationActions.map((m) => `${m.timestamp} - ${m.userId} was ${m.action} for ${m.reason}`);
          return ['// Implement moderation action logging here'];
        }
        default: {
          throw new Error('Invalid log type.');
        }
      }
    } catch (error) {
      logger.error('Error retrieving logs:', error);
      return ['// An error occurred while retrieving logs.'];
    }
  }
}
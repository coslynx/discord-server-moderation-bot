import { Guild, GuildMember, Message, User } from 'discord.js';
import { GuildModel } from '@models/guild';
import { UserModel } from '@models/user';
import { logger } from '@utils/logger';

export class ModerationService {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  async kickUser(user: User, reason?: string): Promise<void> {
    try {
      const member = await this.guild.members.fetch(user.id);
      await member.kick(reason);

      await this.logModerationAction('kick', user, reason);
    } catch (error) {
      logger.error('Error kicking user:', error);
      throw new Error('Failed to kick user.');
    }
  }

  async banUser(user: User, reason?: string): Promise<void> {
    try {
      await this.guild.bans.create(user.id, { reason });

      await this.logModerationAction('ban', user, reason);
    } catch (error) {
      logger.error('Error banning user:', error);
      throw new Error('Failed to ban user.');
    }
  }

  async muteUser(user: User, reason?: string): Promise<void> {
    try {
      const member = await this.guild.members.fetch(user.id);
      await member.timeout(2147483647, reason); // Maximum timeout duration

      await UserModel.findOneAndUpdate(
        { id: user.id },
        { muted: true, $push: { warnings: { reason } } }
      );

      await this.logModerationAction('mute', user, reason);
    } catch (error) {
      logger.error('Error muting user:', error);
      throw new Error('Failed to mute user.');
    }
  }

  async unmuteUser(user: User): Promise<void> {
    try {
      const member = await this.guild.members.fetch(user.id);
      await member.timeout(null); // Remove timeout

      await UserModel.findOneAndUpdate(
        { id: user.id },
        { muted: false }
      );

      await this.logModerationAction('unmute', user);
    } catch (error) {
      logger.error('Error unmuting user:', error);
      throw new Error('Failed to unmute user.');
    }
  }

  async warnUser(user: User, reason: string): Promise<void> {
    try {
      await UserModel.findOneAndUpdate(
        { id: user.id },
        { $push: { warnings: { reason } } }
      );

      await this.logModerationAction('warn', user, reason);
    } catch (error) {
      logger.error('Error warning user:', error);
      throw new Error('Failed to warn user.');
    }
  }

  async isMuted(user: User): Promise<boolean> {
    try {
      const userData = await UserModel.findOne({ id: user.id });

      if (!userData) {
        throw new Error('User data not found!');
      }

      return userData.muted;
    } catch (error) {
      logger.error('Error checking user mute status:', error);
      throw new Error('Failed to check user mute status.');
    }
  }

  async logModerationAction(
    action: 'kick' | 'ban' | 'mute' | 'unmute' | 'warn',
    user: User,
    reason?: string
  ): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData || !guildData.loggingEnabled) {
        return;
      }

      // Log moderation action in the database (add more details as needed)
      logger.info(
        `User ${user.tag} was ${action} ${reason ? `for ${reason}` : ''}.`
      );
    } catch (error) {
      logger.error('Error logging moderation action:', error);
    }
  }
}
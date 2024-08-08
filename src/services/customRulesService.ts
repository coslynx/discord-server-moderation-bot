import { Guild, GuildMember } from 'discord.js';
import { GuildModel } from '@models/guild';
import { logger } from '@utils/logger';

export class CustomRulesService {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  async addCustomRule(rule: string, type: string, value: string): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData) {
        throw new Error('Guild data not found!');
      }

      guildData.customRules.push({ rule, type, value });
      await guildData.save();
    } catch (error) {
      logger.error('Error adding custom rule:', error);
    }
  }

  async removeCustomRule(rule: string): Promise<void> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData) {
        throw new Error('Guild data not found!');
      }

      guildData.customRules = guildData.customRules.filter(
        (r) => r.rule !== rule
      );
      await guildData.save();
    } catch (error) {
      logger.error('Error removing custom rule:', error);
    }
  }

  async getCustomRules(): Promise<{ rule: string; type: string; value: string }[]> {
    try {
      const guildData = await GuildModel.findOne({ id: this.guild.id });

      if (!guildData) {
        throw new Error('Guild data not found!');
      }

      return guildData.customRules;
    } catch (error) {
      logger.error('Error retrieving custom rules:', error);
      return [];
    }
  }
}
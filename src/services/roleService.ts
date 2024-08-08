import { Guild, GuildMember, Role } from 'discord.js';
import { GuildModel } from '@models/guild';
import { logger } from '@utils/logger';

export class RoleService {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  async createRole(name: string, color?: string): Promise<Role> {
    try {
      const role = await this.guild.roles.create({
        name,
        color: color ? parseInt(color.replace('#', ''), 16) : undefined,
      });

      await GuildModel.findOneAndUpdate(
        { id: this.guild.id },
        { $push: { roles: role.id } }
      );

      return role;
    } catch (error) {
      logger.error('Error creating role:', error);
      throw new Error('Failed to create role.');
    }
  }

  async deleteRole(role: Role): Promise<void> {
    try {
      await role.delete();

      await GuildModel.findOneAndUpdate(
        { id: this.guild.id },
        { $pull: { roles: role.id } }
      );
    } catch (error) {
      logger.error('Error deleting role:', error);
      throw new Error('Failed to delete role.');
    }
  }

  async assignRole(member: GuildMember, role: Role): Promise<void> {
    try {
      await member.roles.add(role);
    } catch (error) {
      logger.error('Error assigning role:', error);
      throw new Error('Failed to assign role.');
    }
  }

  async removeRole(member: GuildMember, role: Role): Promise<void> {
    try {
      await member.roles.remove(role);
    } catch (error) {
      logger.error('Error removing role:', error);
      throw new Error('Failed to remove role.');
    }
  }
}
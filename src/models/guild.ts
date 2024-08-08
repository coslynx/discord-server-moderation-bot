import { Schema, model, Document } from 'mongoose';
import { Guild as DiscordGuild } from 'discord.js';

export interface Guild extends Document {
  id: string;
  name: string;
  icon: string | null;
  ownerId: string;
  memberCount: number;
  channels: string[];
  roles: string[];
  loggingEnabled: boolean;
  customRules: { rule: string; type: string; value: string }[];
}

const guildSchema = new Schema<Guild>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String },
  ownerId: { type: String, required: true },
  memberCount: { type: Number, required: true },
  channels: [{ type: String }],
  roles: [{ type: String }],
  loggingEnabled: { type: Boolean, default: false },
  customRules: [
    {
      rule: { type: String, required: true },
      type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

export const GuildModel = model<Guild>('Guild', guildSchema);

export const saveGuild = async (guild: DiscordGuild): Promise<void> => {
  const { id, name, icon, ownerId, memberCount, channels, roles } = guild;

  const newGuild = new GuildModel({
    id,
    name,
    icon,
    ownerId,
    memberCount,
    channels: channels.cache.map((c) => c.id),
    roles: roles.cache.map((r) => r.id),
  });

  await newGuild.save();
};
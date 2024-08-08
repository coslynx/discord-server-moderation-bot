import { Schema, model, Document } from 'mongoose';
import { User as DiscordUser } from 'discord.js';

export interface User extends Document {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot: boolean;
  system: boolean;
  mfaEnabled: boolean;
  banner: string | null;
  accentColor: number | null;
  locale: string;
  verified: boolean;
  email: string | null;
  flags: number;
  premiumType: number;
  publicFlags: number;
  guilds: string[];
  roles: string[];
  muted: boolean;
  warnings: { reason: string; issuedAt: Date }[];
  createdAt: Date;
}

const userSchema = new Schema<User>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  discriminator: { type: String, required: true },
  avatar: { type: String },
  bot: { type: Boolean, required: true },
  system: { type: Boolean, required: true },
  mfaEnabled: { type: Boolean, required: true },
  banner: { type: String },
  accentColor: { type: Number },
  locale: { type: String, required: true },
  verified: { type: Boolean, required: true },
  email: { type: String },
  flags: { type: Number, required: true },
  premiumType: { type: Number, required: true },
  publicFlags: { type: Number, required: true },
  guilds: [{ type: String }],
  roles: [{ type: String }],
  muted: { type: Boolean, default: false },
  warnings: [
    {
      reason: { type: String, required: true },
      issuedAt: { type: Date, required: true, default: Date.now },
    },
  ],
  createdAt: { type: Date, required: true, default: Date.now },
});

export const UserModel = model<User>('User', userSchema);

export const saveUser = async (user: DiscordUser): Promise<void> => {
  const {
    id,
    username,
    discriminator,
    avatar,
    bot,
    system,
    mfaEnabled,
    banner,
    accentColor,
    locale,
    verified,
    email,
    flags,
    premiumType,
    publicFlags,
    guilds,
    roles,
  } = user;

  const newUser = new UserModel({
    id,
    username,
    discriminator,
    avatar,
    bot,
    system,
    mfaEnabled,
    banner,
    accentColor,
    locale,
    verified,
    email,
    flags,
    premiumType,
    publicFlags,
    guilds: guilds.cache.map((g) => g.id),
    roles: roles.cache.map((r) => r.id),
  });

  await newUser.save();
};
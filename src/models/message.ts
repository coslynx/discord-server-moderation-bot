import { Schema, model, Document } from 'mongoose';
import { Message as DiscordMessage } from 'discord.js';

export interface Message extends Document {
  guildId: string;
  channelId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  editedAt?: Date;
  deletedAt?: Date;
  attachments: string[];
  embeds: string[];
  reactions: string[];
  mentions: string[];
  isSpam: boolean;
  isOffensive: boolean;
  isMuted: boolean;
  moderationAction?: string;
  moderationReason?: string;
  moderationUserId?: string;
}

const messageSchema = new Schema<Message>({
  guildId: { type: String, required: true },
  channelId: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  editedAt: { type: Date },
  deletedAt: { type: Date },
  attachments: [{ type: String }],
  embeds: [{ type: String }],
  reactions: [{ type: String }],
  mentions: [{ type: String }],
  isSpam: { type: Boolean, default: false },
  isOffensive: { type: Boolean, default: false },
  isMuted: { type: Boolean, default: false },
  moderationAction: { type: String },
  moderationReason: { type: String },
  moderationUserId: { type: String },
});

export const MessageModel = model<Message>('Message', messageSchema);

export const saveMessage = async (message: DiscordMessage): Promise<void> => {
  const { guildId, channelId, author, content, createdAt, editedAt, deletedAt, attachments, embeds, reactions, mentions } = message;

  const newMessage = new MessageModel({
    guildId,
    channelId,
    authorId: author.id,
    content,
    createdAt,
    editedAt,
    deletedAt,
    attachments: attachments.map((a) => a.url),
    embeds: embeds.map((e) => JSON.stringify(e)),
    reactions: reactions.cache.map((r) => r.emoji.name),
    mentions: mentions.users.map((u) => u.id),
  });

  await newMessage.save();
};
import { Message, Client } from 'discord.js';
import { logger } from '@utils/logger';
import { CustomRulesService } from '@services/customRulesService';
import { ModerationService } from '@services/moderationService';
import { LoggingService } from '@services/loggingService';
import { isOffensive, detectSpam, analyzeSentiment } from '@utils/nlp';

export default (client: Client) => {
  client.on('messageCreate', async (message: Message) => {
    try {
      // Ignore messages from bots
      if (message.author.bot) return;

      // Check for custom rules
      const customRulesService = new CustomRulesService(message.guild);
      const customRules = await customRulesService.getCustomRules();

      for (const rule of customRules) {
        switch (rule.type) {
          case 'max-message-length': {
            if (message.content.length > parseInt(rule.value)) {
              await message.delete();
              await message.channel.send(
                `Your message exceeds the maximum allowed length of ${rule.value} characters.`
              );
              break;
            }
          }
          case 'character-limit': {
            if (message.content.length > parseInt(rule.value)) {
              await message.delete();
              await message.channel.send(
                `Your message exceeds the character limit of ${rule.value}.`
              );
              break;
            }
          }
          case 'keyword-restriction': {
            if (message.content.toLowerCase().includes(rule.value.toLowerCase())) {
              await message.delete();
              await message.channel.send(
                `Your message contains a restricted keyword: ${rule.value}.`
              );
              break;
            }
          }
        }
      }

      // Check for offensive language
      if (isOffensive(message.content)) {
        await message.delete();
        await message.channel.send(
          'Please refrain from using offensive language.'
        );
      }

      // Check for spam
      if (detectSpam(message.content)) {
        await message.delete();
        await message.channel.send('Please avoid spamming.');
      }

      // Analyze sentiment (optional)
      const sentiment = analyzeSentiment(message.content);
      if (sentiment === 'negative') {
        // Trigger actions based on negative sentiment
        // ...
      }

      // Log the message
      const loggingService = new LoggingService(message.guild);
      await loggingService.logMessage(message);

      // Check for moderation actions
      const moderationService = new ModerationService(message.guild);
      if (await moderationService.isMuted(message.author)) {
        await message.delete();
        await message.author.send(
          'You are currently muted and cannot send messages.'
        );
      }
    } catch (error) {
      logger.error('Error handling messageCreate event:', error);
    }
  });
};
import { SlashCommandBuilder } from 'discord.js';
import { CustomRulesService } from '@services/customRulesService';
import { logger } from '@utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('customrules')
    .setDescription('Manage custom moderation rules')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription('Add a new custom rule')
        .addStringOption((option) =>
          option
            .setName('rule')
            .setDescription('The custom rule to add')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('The type of rule')
            .setRequired(true)
            .addChoices(
              { name: 'max-message-length', value: 'max-message-length' },
              { name: 'character-limit', value: 'character-limit' },
              { name: 'keyword-restriction', value: 'keyword-restriction' }
            )
        )
        .addStringOption((option) =>
          option
            .setName('value')
            .setDescription('The value for the rule')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remove')
        .setDescription('Remove a custom rule')
        .addStringOption((option) =>
          option
            .setName('rule')
            .setDescription('The custom rule to remove')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('list')
        .setDescription('List all custom rules')
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();

      const customRulesService = new CustomRulesService(interaction.guild);

      switch (subcommand) {
        case 'add': {
          const rule = interaction.options.getString('rule', true);
          const type = interaction.options.getString('type', true);
          const value = interaction.options.getString('value', true);

          await customRulesService.addCustomRule(rule, type, value);

          await interaction.reply({ content: `Custom rule "${rule}" added successfully!`, ephemeral: true });
          break;
        }
        case 'remove': {
          const rule = interaction.options.getString('rule', true);

          await customRulesService.removeCustomRule(rule);

          await interaction.reply({ content: `Custom rule "${rule}" removed successfully!`, ephemeral: true });
          break;
        }
        case 'list': {
          const rules = await customRulesService.getCustomRules();

          const ruleList = rules.length > 0
            ? rules.map((r) => `- ${r.rule}: ${r.type} = ${r.value}`).join('\n')
            : 'No custom rules defined.';

          await interaction.reply({ content: `Custom Rules:\n${ruleList}`, ephemeral: true });
          break;
        }
        default: {
          throw new Error('Invalid subcommand');
        }
      }
    } catch (error) {
      logger.error('Error executing custom rules command:', error);
      await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
    }
  },
};
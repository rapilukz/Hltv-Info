import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CommandInteraction, Interaction } from 'discord.js';

export interface Run {
  (interaction: CommandInteraction);
}

export interface SlashCommand {
  category: string;
  data: Omit<SlashCommandSubcommandsOnlyBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  developer?: boolean;
  description: string;
  run: Run;
}

import { SlashCommand } from '../../Interfaces';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, PermissionFlagsBits } from 'discord.js';
import HLTV from '../../Hltv';

export const command: SlashCommand = {
  category: 'Hltv',
  description: 'Find a player by name',
  data: new SlashCommandBuilder()
    .setName('rankings')
    .setDescription('Get the top 30 teams in the world')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  run: async (interaction: CommandInteraction) => {
    const topTeams = await HLTV.getTopTeams();
  },
};


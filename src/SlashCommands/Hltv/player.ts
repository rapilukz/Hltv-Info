import { SlashCommand } from '../../Interfaces';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CommandInteractionOptionResolver, PermissionFlagsBits } from 'discord.js';
import HLTV from '../../Hltv';

export const command: SlashCommand = {
  category: 'Hltv',
  description: 'Find a player by name',
  data: new SlashCommandBuilder()
    .setName('find')
    .setDescription('Find a player by their name')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('player')
        .setDescription('Info about a player by name')
        .addStringOption((option) =>
          option.setName('name').setDescription('The user').setDescription("the player's name").setRequired(true)
        )
    ),
  run: async (interaction: CommandInteraction) => {
    const data = interaction.options.get('name').value.toString();
    const playerData = await HLTV.getPlayerByName(data);
 
    if (!playerData) interaction.reply({ content: `This player was not found, try again`, ephemeral: true });
   
    interaction.reply({ content: playerData })
  },
};

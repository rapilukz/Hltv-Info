import { SlashCommand } from '../../Interfaces';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
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
 
    if (!playerData) return interaction.reply({ content: `This player was not found, try again`, ephemeral: true });
    const playerEmbed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(`${playerData.nickname}'s hltv stats `)
      .setThumbnail(playerData.image)
      .setURL(playerData.url)
      .setFields(
        {
          name: '✏ Name',
          value: playerData.name,
          inline: true      
        },
        {
          name: '🕐 Age',
          value: playerData.age.toString(),
          inline: true      
        },
        {
          name: '🌍 Country:',
          value: playerData.country,
          inline: true      
        },
        {
          name: '🎮 Team',
          value: playerData.team,
          inline: true      
        },
        {
          name: '🎖 Rating',
          value: playerData.rating.toString(),
          inline: true      
        },
        {
          name: '🎯 Headshot',
          value: playerData.headshots.toString() + '%',
          inline: true      
        },
        {
          name: '🔪 Adr',
          value: playerData.adr.toString(),
          inline: true
        },
        {
          name: '☠ Kdr',
          value: playerData.kpr.toString(),
          inline: true
        },
        {
          name: '💣 Impact',
          value: playerData.impact.toString(),
          inline: true      
        },
        
      )
      .setFooter({ text: playerData.fullName, iconURL: interaction.client.user.displayAvatarURL() })

    interaction.reply({ embeds: [playerEmbed], content: playerData.url })
  },
};

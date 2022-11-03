import { SlashCommand } from '../../Interfaces';
import { ButtonBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import HLTV from '../../Hltv';
import { ITeam } from '../../Hltv/api/rankings';
import { CONFIG } from '../../Hltv/config';
import { sendPaginationEmbed } from '../../Client/embedPagination';

export const command: SlashCommand = {
  category: 'Hltv',
  description: 'Find a player by name',
  data: new SlashCommandBuilder()
    .setName('rankings')
    .setDescription('Get the top 30 teams in the world')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  run: async (interaction: CommandInteraction) => {
    const topTeams = await HLTV.getTopTeams();
    
    const firstPage = topTeams.slice(0, 15)
    const secondPage= topTeams.slice(15, topTeams.length)

    const firstPageEmbed = await createRankingsEmbed(firstPage, interaction);
    const secondPageEmbed = await createRankingsEmbed(secondPage, interaction);

    const pages = [firstPageEmbed, secondPageEmbed]

    sendPaginationEmbed(interaction, pages)
  },
};

async function createRankingsEmbed(teamsData: ITeam[], interaction: CommandInteraction): Promise<EmbedBuilder> {
  let rankings = '';
  teamsData.forEach((team) => {
    rankings += `${team.ranking}: ${team.name} \n`;
  });
  const embed = new EmbedBuilder()
    .setTitle(`HLTV World Ranking`)
    .setDescription(rankings)
    .setColor('Green')
    .setURL(`${CONFIG.BASE}/${CONFIG.TEAMS}`)
    .setThumbnail(interaction.client.user.displayAvatarURL())

  return embed;
}

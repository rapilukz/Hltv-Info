import { SlashCommand } from '../../Interfaces';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import HLTV from '../../Hltv';
import { ITeam } from '../../Hltv/api/rankings';
import { CONFIG } from '../../Hltv/config'; 

export const command: SlashCommand = {
  category: 'Hltv',
  description: 'Find a player by name',
  data: new SlashCommandBuilder()
    .setName('rankings')
    .setDescription('Get the top 30 teams in the world')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  run: async (interaction: CommandInteraction) => {
    const topTeams = await HLTV.getTopTeams();
    const embed = await createRankingsEmbed(topTeams)
    embed.setThumbnail(interaction.client.user.displayAvatarURL())

    interaction.reply({embeds: [embed]})
  },
};

async function createRankingsEmbed(teamsData: ITeam[]) : Promise<EmbedBuilder>{
  let rankings = '';
  teamsData.forEach(team =>{
    rankings += `${team.ranking}: ${team.name} \n`
  })
  const embed = new EmbedBuilder()
  .setTitle(`HLTV World Ranking`)
  .setDescription(rankings)
  .setColor('Green')
  .setURL(`${CONFIG.BASE}/${CONFIG.TEAMS}`)

  return embed
}

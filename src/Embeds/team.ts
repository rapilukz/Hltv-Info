import { EmbedBuilder } from 'discord.js';
import { ITeam } from '../Hltv/api/team';

export async function createTeamEmbed(teamData: ITeam): Promise<EmbedBuilder> {
  let description = `**Players:** \n`

  teamData.players.forEach(player =>{
    description += `${player.nickname} \n `
  })

  const teamEmbed = new EmbedBuilder()
    .setThumbnail(teamData.logo)
    .setDescription(description)
    .setTitle(`${teamData.name}'s Information`)
    .setURL(teamData.url)
    .setFields(
      {
        name: '👑 World Ranking',
        value: teamData.ranking.toString(),
        inline: true,
      },
      {
        name: '🕕 Avg player age',
        value: teamData.averagePlayerAge.toString(),
        inline: true,
      },
      {
        name: '🧠 Coach',
        value: teamData.coach,
        inline: true,
      }
    )
    .setColor('Green');

  return teamEmbed;
}

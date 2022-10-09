import { EmbedBuilder } from 'discord.js';
import { IPlayer } from '../Hltv/api/player';

export function createPlayerEmbed(playerData: IPlayer): EmbedBuilder {
  const playerEmbed = new EmbedBuilder()
    .setColor('Green')
    .setTitle(`${playerData.fullName}'s hltv stats `)
    .setThumbnail(playerData.image)
    .setURL(playerData.url)
    .setFields(
      {
        name: '🕐 Age',
        value: playerData.age.toString(),
        inline: true,
      },
      {
        name: '🌍 Country:',
        value: playerData.country,
        inline: true,
      },
      {
        name: '🎮 Team',
        value: playerData.team,
        inline: true,
      },
      {
        name: '🎯 Headshot',
        value: playerData.headshots.toString() + '%',
        inline: true,
      },
      {
        name: '🎖 Rating',
        value: playerData.rating.toString(),
        inline: true,
      },
      {
        name: '🔪 Adr',
        value: playerData.adr.toString(),
        inline: true,
      },
      {
        name: '☠ Kdr',
        value: playerData.kpr.toString(),
        inline: true,
      },
      {
        name: '🔫 Kast',
        value: playerData.kast.toString() + '%',
        inline: true,
      },
      {
        name: '💣 Impact',
        value: playerData.impact.toString(),
        inline: true,
      }
    )
    
    return playerEmbed
}

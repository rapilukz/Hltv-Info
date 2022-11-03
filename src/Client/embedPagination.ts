import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from 'discord.js';

export async function sendPaginationEmbed(
  interaction: CommandInteraction,
  pages: EmbedBuilder[],
  timeout: Number = 1000
) {
  let page = 0;

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('back').setLabel('⬅️').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('forward').setLabel('➡️').setStyle(ButtonStyle.Secondary)
  );

  if (!interaction.deferred) await interaction.deferReply();

  const curPage = await interaction.editReply({
    embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
    components: [row],
  });

  await interaction.reply({ components: [row] });
}

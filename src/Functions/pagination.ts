import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  ComponentType,
} from 'discord.js';

export async function sendPaginationEmbed(
  interaction: CommandInteraction,
  pages: EmbedBuilder[],
  timeout: number = 6000
) {
  await interaction.deferReply();

  if (pages.length === 1) {
    interaction.editReply({
      embeds: pages,
      components: [],
    });
  }

  let index = 0;

  pages.forEach((page, i) => {
    page.setFooter({text : `Page: ${i + 1}/${pages.length}`});
  });

  const next = new ButtonBuilder().setCustomId('next').setLabel('➡️').setStyle(ButtonStyle.Secondary);
  const prev = new ButtonBuilder().setCustomId('prev').setLabel('⬅️').setStyle(ButtonStyle.Secondary).setDisabled(true);

  const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(prev, next);

  const curPage = await interaction.editReply({
    embeds: [pages[index]],
    components: [buttonRow],
  });

  const collector = curPage.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: timeout,
  });

  collector.on('collect', async (i) => {
    if (i.user.id !== interaction.user.id) {
      i.reply({
        content: `You can't use these buttons`,
        ephemeral: true,
      });

      return;
    }

    await i.deferUpdate();

    if (i.customId === 'prev' && index > 0) index--;
    else if (i.customId === 'next' && index < pages.length - 1) index++;

    if (index === 0) prev.setDisabled(true);
    else prev.setDisabled(false);

    if (index === pages.length - 1) next.setDisabled(true);
    else next.setDisabled(false);

    await curPage.edit({
      embeds: [pages[index]],
      components: [buttonRow],
    });

    collector.resetTimer();
  });

  collector.on('end', async (i) => {
    await curPage.edit({
      embeds: [pages[index]],
      components: [],
    });
  });
}

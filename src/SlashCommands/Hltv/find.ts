import { SlashCommand } from '../../Interfaces';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, PermissionFlagsBits, CommandInteractionOptionResolver } from 'discord.js';
import HLTV from '../../Hltv';
import { createPlayerEmbed } from '../../Embeds/player';

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
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('team')
        .setDescription('Info about a team by name')
        .addStringOption((option) =>
          option.setName('name').setDescription('The team').setDescription("the team's name").setRequired(true)
        )
    ),
  run: async (interaction: CommandInteraction) => {
    const interactionOptions = interaction.options as CommandInteractionOptionResolver;
    const command = interactionOptions.getSubcommand();

    const commandHandler = {
      player: async () => await findPlayer(interaction),
      team: async () => await findTeam(interaction),
    };

    await commandHandler[command]()
  },
};

async function findPlayer(interaction: CommandInteraction) {
  const data = interaction.options.get('name').value.toString();
  const playerData = await HLTV.getPlayerByName(data);

  if (!playerData) return interaction.reply({ content: `This player was not found, try again`, ephemeral: true });

  const embed = createPlayerEmbed(playerData);
  interaction.reply({ embeds: [embed], content: playerData.url });
}

async function findTeam(interaction: CommandInteraction) {
  const data = interaction.options.get('name').value.toString();
  const TeamData = await HLTV.getTeamByName(data);

  interaction.reply({ content: `finding  team ${data}` });
}

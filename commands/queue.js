const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Send Testing Queue Panel"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("🧪 Testing Queue")
      .setDescription(
        "Click the button below to join the testing queue."
      )
      .setColor("Blue");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("join_queue")
        .setLabel("Join Queue")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("leave_queue")
        .setLabel("Leave Queue")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
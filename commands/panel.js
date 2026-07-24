const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Send register panel"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("📝 Player Registration")
      .setDescription(
`Click the **Register / Update** button below.

After completing the form, you'll be able to choose your gamemode.

Available Gamemodes:
• UHC
• Pot
• Mace
• NetHop
• SMP
• Sword
• Axe
• Vanilla
• Cart`
      )
      .setColor("Blue");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("register")
        .setLabel("Register / Update")
        .setStyle(ButtonStyle.Success)
        .setEmoji("📝")
    );

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
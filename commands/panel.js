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
      .setTitle("📝 Register Testing")
      .setDescription(
        "Click **Register / Update** to register.\n\nChoose your gamemode below."
      )
      .setColor("Blue");

    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("register")
        .setLabel("Register / Update")
        .setStyle(ButtonStyle.Danger)
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("uhc").setLabel("UHC").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("pot").setLabel("Pot").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("mace").setLabel("Mace").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("nethop").setLabel("NetHop").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("smp").setLabel("SMP").setStyle(ButtonStyle.Secondary)
    );

    const row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("sword").setLabel("Sword").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("axe").setLabel("Axe").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("vanilla").setLabel("Vanilla").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("cart").setLabel("Cart").setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row1, row2, row3]
    });
  }
};
const {
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {

    // Slash Command
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
      }
    }

    // Register Button
    if (interaction.isButton()) {
      if (interaction.customId === "register") {

        const modal = new ModalBuilder()
          .setCustomId("register_modal")
          .setTitle("Register");

        const ign = new TextInputBuilder()
          .setCustomId("ign")
          .setLabel("Minecraft Username")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const region = new TextInputBuilder()
          .setCustomId("region")
          .setLabel("Region")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(ign),
          new ActionRowBuilder().addComponents(region)
        );

        await interaction.showModal(modal);
      }
    }

    // Modal Submit
    if (interaction.isModalSubmit())     // Gamemode Buttons
    if (interaction.isButton()) {

      const config = require("../config/config.json");

      const roles = {
        uhc: config.roles.uhc,
        pot: config.roles.pot,
        mace: config.roles.mace,
        nethop: config.roles.nethop,
        smp: config.roles.smp,
        sword: config.roles.sword,
        axe: config.roles.axe,
        vanilla: config.roles.vanilla,
        cart: config.roles.cart
      };

      if (roles[interaction.customId]) {

        const role = interaction.guild.roles.cache.get(roles[interaction.customId]);

        if (!role) {
          return interaction.reply({
            content: "❌ Role not found.",
            ephemeral: true
          });
        }

        await interaction.member.roles.add(role);

        return interaction.reply({
          content: `✅ You joined the **${role.name}** waitlist.`,
          ephemeral: true
        });
      }
    }{
      if (interaction.customId === "register_modal") {

        const ign = interaction.fields.getTextInputValue("ign");
        const region = interaction.fields.getTextInputValue("region");

        await interaction.reply({
          content: `✅ Registered!\nIGN: **${ign}**\nRegion: **${region}**`,
          ephemeral: true
        });
      }
    }

  }
};

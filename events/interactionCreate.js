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

        const ign

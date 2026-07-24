require("dotenv").config();

const fs = require("fs");
const path = require("path");
const http = require("http");
const {
  Client,
  Collection,
  GatewayIntentBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const config = require("./config/config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// Load Commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));

  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
  }
}

// Ready
client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

// Interaction
client.on("interactionCreate", async (interaction) => {

  // Slash Commands
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
    }

    return;
  }

  // Register Button
  if (interaction.isButton() && interaction.customId === "register") {

    const modal = new ModalBuilder()
      .setCustomId("register_modal")
      .setTitle("Player Register");

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

    const account = new TextInputBuilder()
      .setCustomId("account")
      .setLabel("Account Type (Premium/Cracked)")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(ign),
      new ActionRowBuilder().addComponents(region),
      new ActionRowBuilder().addComponents(account)
    );

    return interaction.showModal(modal);
  }
  // Modal Submit
  if (interaction.isModalSubmit() && interaction.customId === "register_modal") {

    const ign = interaction.fields.getTextInputValue("ign");
    const region = interaction.fields.getTextInputValue("region");
    const account = interaction.fields.getTextInputValue("account");

    await db.set(`user_${interaction.user.id}`, {
      ign,
      region,
      account
    });
// Give Queue Role
try {
  await interaction.member.roles.add(config.queueRole);
} catch (err) {
  console.log("Queue Role Error:", err);
}
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("uhc")
        .setLabel("UHC")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("pot")
        .setLabel("Pot")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("mace")
        .setLabel("Mace")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("nethop")
        .setLabel("NetHop")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("smp")
        .setLabel("SMP")
        .setStyle(ButtonStyle.Secondary)
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("sword")
        .setLabel("Sword")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("axe")
        .setLabel("Axe")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("vanilla")
        .setLabel("Vanilla")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("cart")
        .setLabel("Cart")
        .setStyle(ButtonStyle.Secondary)
    );

    return interaction.reply({
      content:
        "✅ Registration completed!\n\nNow choose your gamemode.",
      components: [row, row2],
      ephemeral: true
    });
  }
  // Gamemode Buttons
  if (interaction.isButton()) {

    const data = await db.get(`user_${interaction.user.id}`);

    if (!data) {
      return interaction.reply({
        content: "❌ Please register first using the Register button.",
        ephemeral: true
      });
    }

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

      // Remove old gamemode roles
      for (const id of Object.values(roles)) {
        if (interaction.member.roles.cache.has(id)) {
          await interaction.member.roles.remove(id).catch(() => {});
        }
      }

      // Add new role
      await interaction.member.roles.add(roles[interaction.customId]);

      return interaction.reply({
        content: `✅ You have been added to **${interaction.customId.toUpperCase()}**.`,
        ephemeral: true
      });
    }
  }

});

client.login(process.env.TOKEN);

// Web Server for Render

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot Online");
}).listen(process.env.PORT || 3000, () => {
  console.log("Web server started.");
});
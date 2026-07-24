require("dotenv").config();

const fs = require("fs");
const path = require("path");
const {
  Client,
  Collection,
  GatewayIntentBits
} = require("discord.js");

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

// Bot Ready
client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

// Interaction Handler
client.on("interactionCreate", async (interaction) => {

  // Slash Commands
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Error while executing command.",
        ephemeral: true
      });
    }
    return;
  }

  // Buttons
  if (interaction.isButton()) {

    if (interaction.customId === "register") {
      return interaction.reply({
        content: "🛠️ Register modal baad me add karenge.",
        ephemeral: true
      });
    }

    const gamemodes = {
      uhc: "UHC",
      pot: "Pot",
      mace: "Mace",
      nethop: "NetHop",
      smp: "SMP",
      sword: "Sword",
      axe: "Axe",
      vanilla: "Vanilla",
      cart: "Cart"
    };

    if (gamemodes[interaction.customId]) {
      return interaction.reply({
        content: `✅ You selected **${gamemodes[interaction.customId]}**.`,
        ephemeral: true
      });
    }
  }

});

client.login(process.env.TOKEN);
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Bot is online!");
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Web server started");
});
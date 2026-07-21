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

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
   if (interaction.isButton()) {
  if (interaction.customId === "register") {
    return interaction.reply({
      content: "🛠️ Register modal next step me add karenge.",
      ephemeral: true
    });
  }

  const roles = {
    uhc: "UHC",
    pot: "Pot",
    sword: "Sword",
    axe: "Axe"
  };

  if (roles[interaction.customId]) {
    return interaction.reply({
      content: `✅ You clicked **${roles[interaction.customId]}**.`,
      ephemeral: true
    });
  }
   } const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
    }
  }
});

client.login(process.env.TOKEN);

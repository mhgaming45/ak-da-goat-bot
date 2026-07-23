const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
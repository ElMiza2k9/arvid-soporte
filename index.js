const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

//dotenv
require("dotenv").config();

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = process.env;

// Initializing the project
require("./src/functions")(client);

client.login(client.config.token);
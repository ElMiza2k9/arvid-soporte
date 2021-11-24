const { Client, Collection, WebhookClient } = require("discord.js");

const client = new Client({
    intents: 32767,
    disableEveryone: true
});

process.on('unhandledRejection', err => {
    console.log(`[ERROR]: Unhandled promise rejection: ${err.message}.`);
    console.log(err);
});

//dotenv
require("dotenv").config();

// Global Variables
client.config = process.env;
client.commands = new Collection();
client.slashCommands = new Collection();
// Initializing the project

//webhook
let webhookid = process.env.webhook_id
let webhooktoken = process.env.webhook_token
const webhookClient = new WebhookClient({
    id: webhookid,
    token: webhooktoken
});

let id = process.env.errId;
let token = process.env.tokenId;

const errwebhook = new WebhookClient({
    id: id,
    token: token
});

client.logger = webhookClient;
client.errlogger = errwebhook;

require("./src/functions")(client);

client.login(client.config.token);

module.exports = client;
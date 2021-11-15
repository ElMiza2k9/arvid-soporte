const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = process.env.clientId;
const guildId = process.env.guildId;
require("dotenv").config();

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        for (folder of commandFolders) {

            client.commandsArray = [];
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);

                client.commands.set(command.data.name, command);
                client.commadsArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commadsArray },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();

    }
};
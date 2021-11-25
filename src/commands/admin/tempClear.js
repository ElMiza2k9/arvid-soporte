const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "tempclear",
    description: "Limpia los archivos de la carpeta 'temp'",
    permission: "ADMINISTRATOR",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
       // if (!interaction.member.roles.cache.has(client.config.moderator_role)) return interaction.followUp({ content: "No puedes usar este comando.", ephemeral: true });

        const fs = require('fs');
        fs.rm('/root/BOT/temp/', { recursive: true }, (files) => {
            interaction.followUp({ content: `Se han eliminado los archivos del directorio 'temp'`, ephemeral: true })
        });
    }
}
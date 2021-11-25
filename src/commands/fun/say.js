const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "say",
    description: "Repite lo que dices...",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "mensaje",
            description: "Mensaje a repetir",
            required: true,
            type: 'STRING',
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        let msg = interaction.options.getString('mensaje');

        if (msg.length > 1024) return interaction.editReply({ content: "El mensaje contiene mas de 1024 caracteres." });

        if (msg) return interaction.editReply({ content: msg });
    }
}
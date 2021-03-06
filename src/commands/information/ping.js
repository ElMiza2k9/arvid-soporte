const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Devuelve el ping del WebSocket",
    permission: "SEND_MESSAGES",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setDescription(`Por favor espera...`)

        interaction.editReply({ embeds: [embed] }).then((result) => {
            const ping = result.createdTimestamp - interaction.createdTimestamp;

            const embed1 = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Websocket ping: \`${client.ws.ping}\`ms\nMessage ping: \`${ping}\`ms`)

            interaction.editReply(({ embeds: [embed1] }))
        });
    },
};
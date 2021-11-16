const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Devuelve el ping del WebSocket",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`WebSocket ping: \`${client.ws.ping}\`ms :ping_pong:`)

        interaction.followUp({ embeds: [embed] });
    },
};
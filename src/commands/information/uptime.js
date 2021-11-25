const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "uptime",
    description: "Mira cuanto tiempo lleva activo el bot",
    permission: "SEND_MESSAGES",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {

        const time = ms(client.uptime, { long: true });

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Tiempo activo del cliente: ${time}`)

        interaction.editReply({ embeds: [embed] })
    }
}
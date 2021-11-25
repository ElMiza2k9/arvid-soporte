const { Client, CommandInteraction, MessagEmbed, MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "purge",
    description: "Elimina cantidad de mensajes",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "cantidad",
            description: "Cantidad de mensajes a eliminar",
            type: "INTEGER",
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        let cantidad = interaction.options.getInteger("cantidad")

        if(cantidad > 100) return interaction.editReply({ content: "La cantidad de mensajes maxima es de 100."})

        const messages = await interaction.channel.messages.fetch({
            limit: cantidad + 1,
        });

        const filtred = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms("14 days"));

        await interaction.channel.bulkDelete(filtred)
    }
}
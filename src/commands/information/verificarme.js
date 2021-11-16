const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "verificarme",
    description: "Verificate",
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const embed = new MessageEmbed()
            .setColor('DARK_GREEN')
            .setDescription(`Haz click en el boton para empezar a verificarte`)
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("SUCCESS")
                    .setCustomId("verify")
                    .setLabel("Verificate")
            )
        interaction.editReply({ embeds: [embed], components: [row]})
    }
}
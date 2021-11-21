const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Banea a un usuario del servidor",
    options: [
        {
            name: "usuario",
            description: "Menciona a un usuario",
            type: 'USER',
            required: true
        },
        {
            name: "razon",
            description: "Menciona la razon de baneo",
            type: 'STRING',
            required: false
        }
    ],
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction,
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const user = interaction.options.getMember('usuario');
        const server = interaction.guild;
        let reason = interaction.options.getString('razon');

        if (!interaction.member.roles.cache.has(client.config.moderator_role)) return interaction.editReply({ content: "No puedes usar este comando.", ephemeral: true });

        if (user.id === client.user.id) return interaction.editReply({ content: "No puedes banearme a mi.", ephemeral: true });

        if (user.id === interaction.user.id) return interaction.editReply({ content: "No puedes banearte a ti mismo.", ephemeral: true });

        if (!user.bannable) return interaction.editReply({ content: "No puedo banear a este usuario" });

        try {

            timestamp = Date.now();
            unixTimestmap = Math.floor(timestamp / 1000);

            if (!reason) reason = "No hubo una razon proporcionada";

            const kickEmbed = new MessageEmbed()
                .setColor('#dd5f38')
                .setDescription(`**Fuiste baneado de:** ${server.name}\n\**Razon:** ${reason}`)
                .setFooter(server.name, server.iconURL())

            user.send({ embeds: [kickEmbed] }).then(async () => {
                await user.ban({ reason: reason })

                const embed3 = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`
                **El usuario ${user} fue baneado del servidor**\n
                **Razon:** \`${reason}\`\n
                **Moderador:** ${interaction.user.toString()}\n
                **Fecha:** <t:${unixTimestmap}>
                `)

                client.logger.send({ embeds: [embed3] })
            });
            interaction.editReply(`El usuario: **${user}** fue baneado del servidor.`)
        } catch (err) {
            const embed2 = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
            **Un error ha ocurrido en el comando: ban**\n
            **Fecha:** <t:${unixTimestmap}>\n
            **Error Log:** \`\`\`${err.stack}\`\`\` 
            `)

            client.errlogger.send({ embeds: [embed2] })
            console.log(err.message)
        }

    }

}
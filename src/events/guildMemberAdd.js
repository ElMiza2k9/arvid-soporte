const client = require("../../index");
const { MessageEmbed } = require("discord.js");

client.on('guildMemberAdd', (user) => {
    const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`
    **Nuevo usuario:** ${user} (${user.id})
    **Se unio a Discord:** <t:${Math.floor(user.user.createdTimestamp / 1000)}:R>

    `)
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))

    client.logger.send({ embeds: [embed] })
});
const { MessageEmbed, CommandInteraction, Client, MessageAttachment } = require("discord.js");
const { Captcha } = require('captcha-canvas');
const { writeFileSync } = require('fs');

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

        if (!['910194622293233716'].includes(interaction.channelId)) return interaction.followUp({ content: 'No puedes usar este comando', ephemeral: true });

        const captcha = new Captcha(); 
        captcha.async = false 
        captcha.addDecoy(); 
        captcha.drawTrace();
        captcha.drawCaptcha(); 

        console.log(captcha.text); //log captcha text. 
        writeFileSync(`./temp/${interaction.user.id}.png`, captcha.png); 

        const file = new MessageAttachment(`./temp/${interaction.user.id}.png`)
        const embed = new MessageEmbed()
            .setColor('DARK_GREEN')
            .setDescription(`❗ | Escribe el captcha para verificarte\nTienes 10 segundos para resolverlo.`)
            .setImage(`attachment://${interaction.user.id}.png`)
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))

        const msg = await interaction.editReply({ embeds: [embed], files: [file] })

        const filter = (message) => {
            if (message.author.id !== interaction.user.id) return;
            if (message.content === captcha.text) return true;
            else interaction.followUp({ content: "Captcha incorrecto, intentalo de nuevo.", ephemeral: true })
        }

        try {
            const response = await msg.channel.awaitMessages({ filter: filter, max: 1, time: 10000, errors: ["time"] });

            if (response) {
                interaction.member.roles.add('910194512654123008');
                interaction.member.send('Fuiste verificado correctamente.')
            }
        } catch (err) {
            return interaction.editReply({ content: "Ha caducado el tiempo para resolver el captcha" })
        }
    }
}

const client = require("../../index");
const { MessageAttachment, MessageEmbed } = require("discord.js");

client.on("interactionCreate", async (interaction) => {

    timestamp = Date.now();
    unixTimestmap = Math.floor(timestamp / 1000);

    if (interaction.isButton()) {
        if (interaction.customId === "verify") {

            if (!['910194622293233716'].includes(interaction.channel.id)) return interaction.followUp({ content: "No puedes ejecutar este comando.", ephemeral: true });

            const { Captcha } = require("captcha-canvas");

            const captcha = new Captcha()
            captcha.async = false
            captcha.addDecoy()
            captcha.drawTrace()
            captcha.drawCaptcha()

            const attachment = new MessageAttachment(captcha.png, "captcha.png");

            /* const embed = new MessageEmbed()
                 .setTitle("Captcha ⛔")
                 .setDescription(`❗ | Debes resolver este captcha
             📛 | Tienes 15 segundos para resolverlo
             `)
                 .setColor('FUCHSIA')
             interaction.user.send({ embeds: [embed], files: [attachment]})*/

            interaction.reply({ content: `${interaction.user.toString()},\n❗ | Debes resolver el captcha para verificarte\n❗ | Tienes 15 segundos para resolverlo`, files: [attachment], ephemeral: true })
            const filter = m => m.author.id === interaction.user.id;

            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 })

            collector.on("collect", async m => {
                setTimeout(() => {
                    m.delete().catch(() => {})
                }, 1000)
                if (!m.content.startsWith(captcha.text)) {
                    collector.stop()
                   return interaction.followUp('Codigo incorrecto ❌').then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 3000)
                    })
                }
                const verified = new MessageEmbed()
                .setColor('GREYPLE')
                .setDescription(`
                **El usuario ${interaction.user.toString()}, se ha verificado correctamente**
                **Fecha:** <t:${unixTimestmap}>
                 `)
                client.logger.send({ embeds: [verified]})

                await m.member.roles.add('910194512654123008')
                return interaction.followUp({ content: "Fuiste verificado correctamente ✅", ephemeral: true })
            })

        }

    }

    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Ocurrio un error..." });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args).catch((err) => {

            const embed2 = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
            **Un error ha ocurrido en el comando: kick**\n
            **Fecha:** <t:${unixTimestmap}>\n
            **Error Log:** \`\`\`${err.stack}\`\`\` 
            `)

            client.errlogger.send({ embeds: [embed2] })
            console.log(err.message)
        });
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction).catch((err) => {

            const embed2 = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
            **Un error ha ocurrido en el comando: kick**\n
            **Fecha:** <t:${unixTimestmap}>\n
            **Error Log:** \`\`\`${err.stack}\`\`\` 
            `)

            client.errlogger.send({ embeds: [embed2] })
            console.log(err.message)
        });
    }
});

const client = require("../../index");
const { MessageEmbed } = require("discord.js");

client.on("interactionCreate", async (interaction) => {

    timestamp = Date.now();
    unixTimestmap = Math.floor(timestamp / 1000);

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
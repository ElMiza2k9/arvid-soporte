const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    name: "eval",
    description: "Evalua codigo javascript",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "codigo",
            description: "Codigo a evaluar",
            type: 'STRING',
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const code = interaction.options.getString('codigo')
        if (!interaction.user.id === '673282658679259197') return interaction.editReply({ content: "No puedes usar este comando."});

        try {
            const evaled = eval(code);

          const embed = new MessageEmbed()
          .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
          .setColor('GREEN')
          .setTitle("Codigo ejecutado correctamente.")
          .addFields({
              name: "**Tipo:**",
              value: `\`\`\`prolog\n${typeof(evaled)}\`\`\``,
              inline: true,
              
          }, {
              name: "**Evaluado en:**",
              value: `\`\`\`yaml\n${Date.now() - interaction.createdTimestamp}ms\`\`\``,
              inline: true,
          }, {
              name: "**Entrada:**",
              value: `\`\`\`js\n${code}\`\`\``,
          }, {
              name: "**Salida:**",
              value: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``,
          })
           interaction.editReply({ embeds: [embed] })
        } catch (err) {
            
        }

    }
}
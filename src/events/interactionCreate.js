module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} uso una interaccion`)

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}
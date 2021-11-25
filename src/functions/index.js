const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const { Perms } = require("./perms/perms");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/src/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;

        if (file.permission) {
            if (Perms.includes(file.permission))
                file.defaultPermission = false;
            else return console.log("[ERROR]: Permission invalid in file " + file.name)
        }

        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        const guild = client.guilds.cache.get('906906665000009738')
        await guild.commands.set(arrayOfSlashCommands).then(async (cmd) => {
                const getRoles = (commandNames) => {
                    const permissions = arrayOfSlashCommands.find(x => x.name === commandNames).permission;

                    if (!permissions) return null;
                    return guild.roles.cache.filter((x) => x.permissions.has(permissions))
                }

                const fullPermissions = cmd.reduce((accumulator, r) => {
                    const roles = getRoles(r.name);
                    if (!roles) return accumulator;

                    const permissions = roles.reduce((a, r) => {
                        return [
                            ...a,
                            {
                                id: r.id,
                                type: "ROLE",
                                permission: true,
                            },
                        ];

                    }, []);
                    return [
                        ...accumulator,
                        {
                            id: r.id,
                            permissions: permissions.slice(0,10),
                        },
                    ];
                }, []);
                await guild.commands.permissions.set({ fullPermissions });
            });
    });

};
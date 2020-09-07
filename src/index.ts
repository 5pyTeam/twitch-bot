import * as path from 'path'
import { CommandoClient } from 'discord.js-commando'
import { log } from './log'
try {
    const client = new CommandoClient({
        commandPrefix: '!',
        owner: '349253471490539520',
    })
    client.registry
        .registerDefaultTypes()
        .registerGroups([['stream', 'stream command group']])
        .registerDefaultGroups()
        .registerDefaultCommands()
        .registerCommandsIn(path.join(__dirname, 'commands'))
    client.once('ready', () => {
        log.info(`Logged in as ${client.user.tag}! (${client.user.id})`)
    })
    client.on('error', log.error)
    client.login(process.env.DISCORD_TOKEN)
} catch (e) {
    log.fatal(e)
}

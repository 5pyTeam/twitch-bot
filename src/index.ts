const path = require('path')
const { CommandoClient } = require('discord.js-commando')
const cron = require('node-cron')
const logger = require('pino')()
import { Requests } from './req'
import { Settings } from './settings'
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
    logger.info(`Logged in as ${client.user.tag}! (${client.user.id})`)
})
client.on('error', logger.error)
client.login(Settings.getToken())
//console.log(Requests.getUsersLive(['deujna', 'sardoche', 'doigby', 'gotaga']))
cron.schedule('* * * * * *', () => {
    Requests.getUsersLive(['deujna', 'jeeltv', 'doigby', 'gotaga'], function (
        streamers: String[]
    ) {
        if (streamers.length > 0) console.log(streamers)
    })
})

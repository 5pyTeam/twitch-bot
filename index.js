const logger = require('pino')()
const path = require('path')
const { CommandoClient } = require('discord.js-commando')
const { settings } = require('./settings')
const client = new CommandoClient({
    commandPrefix: '!',
    token: '',
    owner: '349253471490539520',
})
client.registry
    .registerDefaultTypes()
    .registerGroups([['stream', 'stream command group']])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'))
client.once('ready', () => {
    logger.log(`Logged in as ${client.user.tag}! (${client.user.id})`)
})
client.on('error', logger.error)

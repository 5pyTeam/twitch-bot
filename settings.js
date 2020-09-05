const fs = require('fs')
const logger = require('pino')()
var settings = ''
const settingsSchema =
    '{"token":"your discord token", "client-id":"your twitch client-id","oauth2-token":"your twitch oauth2 token"}'
if (!fs.existsSync('settings.json')) {
    fs.writeFileSync('settings.json', settingsSchema)
    logger.error('settings file created you need now to edit it')
} else {
    settings = JSON.parse(fs.readFileSync('settings.json'))
}
module.exports = {
    settings,
}

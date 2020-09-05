const fs = require('fs')
const path = require('path')
const logger = require('pino')()
interface iSettings {
    token: string
    clientId: string
    oauth2token: string
}
const settingsPath = path.resolve('settings.json')
let settings: iSettings

const settingsSchema =
    '{"token":"your discord token", "clientId":"your twitch client-id","oauth2token":"your twitch oauth2 token"}'
if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, settingsSchema)
    logger.error('settings file created you need now to edit it')
} else {
    settings = JSON.parse(fs.readFileSync(settingsPath))
}
export class Settings {
    static getToken(): string {
        return settings.token
    }
    static getClientId(): string {
        return settings.clientId
    }
    static getOauth2token(): string {
        return settings.oauth2token
    }
}

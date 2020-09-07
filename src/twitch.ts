import * as cron from 'node-cron'
import { CommandoClient } from 'discord.js-commando'
import { Requests } from './req'
export class Twitch {
    private streamers: String[] = []
    private client: CommandoClient | undefined
    private task = cron.schedule(
        '* * * * * *',
        () => {
            Requests.getUsersLive(this.streamers, function (
                streamers: String[]
            ) {
                if (streamers.length > 0) {
                }
            })
        },
        {
            scheduled: false,
        }
    )
    constructor(streamers: String[], client: CommandoClient) {
        if (streamers) this.streamers = streamers
        this.client = client
    }
    beginRequests() {
        this.task.start()
    }
}

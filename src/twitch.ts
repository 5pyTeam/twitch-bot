import * as cron from 'node-cron'
import { Requests } from './req'
export class Twitch {
    private streamers: String[] = []
    private task = cron.schedule(
        '* * * * * *',
        () => {
            Requests.getUsersLive(this.streamers, function (
                streamers: String[]
            ) {
                if (streamers.length > 0) console.log(streamers)
            })
        },
        {
            scheduled: false,
        }
    )
    constructor(streamers: String[]) {
        if (streamers) this.streamers = streamers
    }
    beginRequests() {}
}

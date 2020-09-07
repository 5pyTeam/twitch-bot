import { AxiosError, AxiosResponse } from 'axios'
import { log } from './log'
const fs = require('fs')
const axios = require('axios').default
const defaultUrl = 'https://api.twitch.tv/helix'
const config = {
    headers: {
        Authorization: `Bearer ${process.env.TWITCH_OAUTH}`,
        'Client-ID': process.env.TWITCH_CLIENTID,
    },
}

let wasLive: String[] = []
class Requests {
    static getUserData(username: String) {
        axios
            .get(defaultUrl + `/streams?user_login=${username}`)
            .then(function (response: AxiosResponse) {})
            .catch(function (error: AxiosError) {
                log.error(error)
            })
    }
    static async getUsersLive(usernames: String[], callback: CallableFunction) {
        let allLives: String[] = []
        let paramsString: string = ''
        for (let i = 0; i < usernames.length; i++) {
            if (i == 0) {
                paramsString += '?'
            } else {
                paramsString += '&'
            }
            paramsString += `user_login=${usernames[i]}`
        }
        axios({
            method: 'get',
            url: defaultUrl + `/streams${paramsString}`,
            headers: {
                Authorization: `Bearer ${process.env.TWITCH_OAUTH}`,
                'Client-ID': process.env.TWITCH_CLIENTID,
            },
        })
            .then((response: AxiosResponse) => {
                const json = response.data.data
                for (let i = 0; i < Object.keys(json).length; i++) {
                    if (json[i].type == 'live') {
                        allLives.push(json[i].user_name)
                    }
                }
                callback(allLives.filter((element) => !this.wasLive(element)))
                wasLive = allLives
            })
            .catch(function (error: AxiosError) {
                log.error(error)
            })
    }
    static wasLive(username: String): Boolean {
        return wasLive.includes(username)
    }
}
export { Requests }

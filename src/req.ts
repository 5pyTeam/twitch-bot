import { AxiosError, AxiosResponse } from 'axios'
const logger = require('pino')()
const fs = require('fs')
import { Settings } from './settings'
const axios = require('axios').default
const defaultUrl = 'https://api.twitch.tv/helix'
const config = {
    headers: {
        Authorization: `Bearer ${Settings.getOauth2token()}`,
        'Client-ID': Settings.getClientId(),
    },
}

let wasLive: String[] = []
class Requests {
    static getUserData(username: String) {
        axios
            .get(defaultUrl + `/streams?user_login=${username}`)
            .then(function (response: AxiosResponse) {})
            .catch(function (error: AxiosError) {
                logger.error(error)
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
                Authorization: `Bearer ${Settings.getOauth2token()}`,
                'Client-ID': Settings.getClientId(),
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
                logger.error(error)
            })
    }
    static wasLive(username: String): Boolean {
        return wasLive.includes(username)
    }
}
export { Requests }

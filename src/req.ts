import { AxiosError, AxiosResponse } from 'axios'

const axios = require('axios').default
const defaultUrl = 'https://api.twitch.tv/helix'
class Requests {
    static getUserData(username: String) {
        axios
            .get(defaultUrl + `/streams?user_login=${username}`)
            .then(function (response: AxiosResponse) {})
            .catch(function (error: AxiosError) {})
            .then(function () {})
    }
    static getUsersData(usernames: String[]) {}
    static isLive(username: String) {}
}
export { Requests }

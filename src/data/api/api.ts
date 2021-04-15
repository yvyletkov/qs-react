import * as _ from 'lodash'
import {Post} from '../types'

export default class API {
    fetchPosts(): Promise<Post[]> {
        return fetch(`https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow`, {
            method: "GET",
        })
            .then((res) => {
                if (res.status === 200) return res.json()
                else throw new Error('Failed to fetch data from StackOverflow')
            })
            .then((data) => {
                return _.filter(data.items, item => item.owner.reputation >= 50 && item.is_answered)
            })
    }
}
import { getDate } from '../utils/utils';
import { previousDate } from '../utils/utils';
export default class NewsApi {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    };
    getNews(keyword) {
        return fetch(`${this.baseUrl}` + 'everything?' + 'language=ru' + '&' + 'q=' + keyword + '&' + 'from=' + previousDate() + '&' + 'to=' + getDate() + '&' + 'pageSize=100' + '&' + 'apiKey=7fdacda9a907467baf3154b3f141b68f', {
            method: 'GET',
        })
            .then(res => {
                if (res.ok) {

                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .catch((err) => {
                console.log(err);
            });
    }
}

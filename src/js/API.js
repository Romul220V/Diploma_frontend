export default class API {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    };

    signUp(userData) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST', body: json.stringify(userData)
            
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })

        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err); 
        });
    }
}
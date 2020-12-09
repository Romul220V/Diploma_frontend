export default class API {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    };

    signUp(userData) {
        return fetch(`${this.baseUrl}/signup`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST', body: JSON.stringify(userData)

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

    signIn(userData) {
        return fetch(`${this.baseUrl}/signin`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'POST', body: JSON.stringify(userData)

        })
            .then(res => {
                if (res.ok) {
                    console.log(document.cookie);
                    let myCookie = "mycookie=hellocookie";
                    document.cookie = myCookie;
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
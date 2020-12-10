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
                return Promise.reject(res.status)
            })

            .then((result) => {
                return result;
            })
            .catch((err) => {

                return Promise.reject(err);
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

                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .then((result) => {
                localStorage.setItem('token', result.token);
                console.log(result.token);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
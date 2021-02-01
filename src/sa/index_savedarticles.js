import "./style_sa.css";

import SearchResultList from '../js/search-result-list';
import Card from '../js/card_saved';
import Popup from '../js/Popup';
import API from '../js/API';
//import NewsCardList from '../js/components/NewsCardList';

const ApiUrl = process.env.NODE_ENV === "production" ? "https://romullearnin.ru.com/api/" : "http://localhost:3000/api/";
export const mainApi = new API({
    baseUrl: ApiUrl
});


const loggedInName = document.querySelector('.header__button_loggedin-button');
const savedArticlesLink = document.querySelector('.header__button_sa');
const mainPage = document.getElementById('Mainpage')


window.onload = () => {
    if (localStorage.getItem('token')) {
        console.log('passed');
        loggedInName.style.display = 'flex';
        savedArticlesLink.style.display = 'inline-block';
        mainPage.style.color = '#1A1B22';
        mainApi.getUserData().then((result) => {
            mainApi.getArticles()
                .then((res) => {
                    const keywords = res.data.map((card) => card.keyword);
                    const keywordDictionary = {};
                    keywords.forEach(element => {
                        if (keywordDictionary.hasOwnProperty(element)) {
                            keywordDictionary[element] += 1;
                        }
                        else {
                            keywordDictionary[element] = 1;
                        }
                    });
                    console.log(keywordDictionary);

                    let sortedKeywords = Object.keys(keywordDictionary);
                    sortedKeywords.sort((a, b) => {
                        if (keywordDictionary[a] < keywordDictionary[b]) {
                            return 1
                        }
                        else {
                            return -1
                        };
                    });
                    console.log('sortedKeywords');
                    console.log(sortedKeywords);
                    console.log('sortedKeywords');
                    const artNumber = res.data.length;
                    document.getElementById('Logged-name').textContent = result.name;
                    document.getElementById('Greeting').textContent = result.name + ', у вас ' + artNumber + ' сохранённых статей';
                    if (artNumber === 3) {
                        document.getElementById('Keywords').textContent = 'По ключевым словам: ' + sortedKeywords[0] + ', ' + sortedKeywords[1] + ' и ' + sortedKeywords[2];
                    }
                    if (artNumber === 2) {
                        document.getElementById('Keywords').textContent = 'По ключевым словам: ' + sortedKeywords[0] + ' и ' + sortedKeywords[1];
                    }

                    if (artNumber === 1) {
                        document.getElementById('Keywords').textContent = 'По ключевым словам: ' + sortedKeywords[0];
                    }
                    if (artNumber === 0) {
                        document.getElementById('Keywords').textContent = 'Вы не сохранили ни одной новости, попробуйте еще раз';
                    }
                    else {
                        document.getElementById('Keywords').textContent = 'По ключевым словам: ' + sortedKeywords[0] + ', ' + sortedKeywords[1] + ' и ' + (artNumber - 2) + '-м другим';
                    }
                })

        });

        const articlesList = document.querySelector('.search-results-list__cards');
        const searchResultsListBlock = document.querySelector('.search-results-list');
        searchResultsListBlock.style.display = 'flex';
        const savedArticles = new SearchResultList(articlesList, []);
        mainApi.getArticles().then((res) => {
            const newInitialCards = res.data.map((element) => new Card(element));
            newInitialCards.forEach(element => savedArticles.addCard(element));
            savedArticles.renderAll();
            console.log(savedArticles);
        })
    }
    else {
        console.log('not passed');
        document.location.href = 'index.html'
    }
}


const mobile = document.querySelector('.popup_mobile');
const popupMobile = new Popup(mobile);
const openMobileButton = document.querySelector('.header__phone-button');
openMobileButton.onclick = () => {
    popupMobile.openClose();
};



// window.onload = () => {
// const articlesList = document.querySelector('.search-results-list__cards');

// const savedArticles = new NewsCardList(articlesList, []);

// api.getArticles().then((res) => {
//     const newInitialArticles = res.map((element) => new Card(element));
//     newInitialArticles.forEach(element => savedArticles.addCard(element));
//     savedArticles.render();
// })

// }

// const loggedInName = document.querySelector('.header__button_loggedin-button');
// loggedInName.onclick = () => {
//     localStorage.removeItem('token');
//     document.location.href = 'index.html';
// };


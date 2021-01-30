import "./style_sa.css";

import SearchResultList from '../js/search-result-list';
import Card from '../js/card_saved';
import Popup from '../js/Popup';
import MainAPI from '../js/api/MainApi';
//import NewsCardList from '../js/components/NewsCardList';

const ApiUrl = process.env.NODE_ENV === "production" ? "http://localhost:3000/api" : "http://localhost:3000/api";
const mainApi = new MainAPI({
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
                    const artNumber = res.data.length;
                    document.getElementById('Logged-name').textContent = result.name;
                    document.getElementById('Greeting').textContent = result.name + ', у вас ' + artNumber + ' сохранённых статей';
                    document.getElementById('Keywords').textContent = 'По ключевым словам: ' + '' + ', у вас ';
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


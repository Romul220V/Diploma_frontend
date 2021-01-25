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

// window.onload = () => {
// const articlesList = document.querySelector('.search-results-list__cards');

// const savedArticles = new NewsCardList(articlesList, []);

// api.getArticles().then((res) => {
//     const newInitialArticles = res.map((element) => new Card(element));
//     newInitialArticles.forEach(element => savedArticles.addCard(element));
//     savedArticles.render();
// })

// }

window.onload = () => {
    const articlesList = document.querySelector('.search-results-list__cards');
    const savedArticles = new SearchResultList(articlesList, []);
    mainApi.getArticles().then((res) => {
        const newInitialCards = res.map((element) => new Card(element));
        newInitialCards.forEach(element => savedArticles.addCard(element));
        savedArticles.render();
        console.log(savedArticles);
    })
}

const mobile = document.querySelector('.popup_mobile');
const popupMobile = new Popup(mobile);
const openMobileButton = document.querySelector('.header__phone-button');
openMobileButton.onclick = () => {
    popupMobile.openClose();
};
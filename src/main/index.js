import "./style.css";
import SearchResultList from '../js/search-result-list';
import Card from '../js/card';
import FormValidator from '../js/FormValidator';
import FormValidatorLogin from '../js/FormValidatorLogin';
import Popup from '../js/Popup';
import API from '../js/API';
import NewsApi from '../js/api/NewsApi';
import { getDate } from '../js/utils/utils';
import { previousDate } from '../js/utils/utils';

const cardsList = document.querySelector('.search-results-list__cards');

const searchResultsList = new SearchResultList(cardsList, []);

const registration = document.querySelector('.popup_form_register');

const popupRegistration = new Popup(registration);

const regForm = registration.querySelector('.popup__form');

const mobile = document.querySelector('.popup_mobile');
const popupMobile = new Popup(mobile);
const openMobileButton = document.querySelector('.header__phone-button');
openMobileButton.onclick = () => {
    popupMobile.openClose();
};
const openFormButtonMobile = mobile.querySelector('.header__button_login-button');
openFormButtonMobile.onclick = () => {
    popupMobile.openClose();
    popupRegistration.openClose();
    loginValidator.setDefaultValue();
    loginValidator.setSubmitButtonState();
};

const openFormButton = document.querySelector('.header__button_login-button');

const closeRegistrationButton = document.querySelector('.popup__close_registration');

const login = document.querySelector('.popup_form_login');

const popupLogin = new Popup(login);

const loginFormButton = regForm.querySelector('.popup__another-choice_link');

const closeLoginButton = document.querySelector('.popup__close_registered');

const loginForm = login.querySelector('.popup__form');

const loginValidator = new FormValidatorLogin(loginForm);
loginValidator.setEventListeners();

const regValidator = new FormValidator(regForm);

regValidator.setEventListeners();

openFormButton.onclick = () => {
    popupRegistration.openClose();
    loginValidator.setDefaultValue();
    loginValidator.setSubmitButtonState();
};

loginFormButton.onclick = () => {
    popupRegistration.openClose();
    popupLogin.openClose();
    loginValidator.checkInputValidity();
    loginValidator.setSubmitButtonState();
};

const regFormDone = document.querySelector('.popup_registered');

const popupRegDone = new Popup(regFormDone);

const regDone = regForm.querySelector('.popup__button');

 const ApiUrl = process.env.NODE_ENV === "production" ? "https://romullearnin.ru.com/api/" : "http://localhost:3000/";
// const ApiUrl = process.env.NODE_ENV === "production" ? "http://localhost:3000/api" : "http://localhost:3000/api";
const api = new API({
    baseUrl: ApiUrl
});

const NewsUrl = "https://nomoreparties.co/news/v2/";
const apiNews = new NewsApi({
    baseUrl: NewsUrl
});

regDone.onclick = () => {
    const userData = {};
    userData.email = regForm.querySelectorAll('input')[0].value;
    userData.password = regForm.querySelectorAll('input')[1].value;
    userData.name = regForm.querySelectorAll('input')[2].value;
    api.signUp(userData).then((res) => {
        popupRegistration.openClose();

        popupRegDone.openClose();
    })
        .catch((err) => { console.log(err) });
};

const loggedInName = document.querySelector('.header__button_loggedin-button');
loggedInName.style.display = 'none';
const backToRegButton = loginForm.querySelector('.popup__another-choice_link');

backToRegButton.onclick = () => {
    popupRegistration.openClose();
    popupLogin.openClose();
    loginValidator.checkInputValidity();
    loginValidator.setSubmitButtonState();
};
const tempSecondPage = login.querySelector('.popup__button');

tempSecondPage.onclick = (e) => {
    e.preventDefault();
    const userData = {};
    const userToken = {};
    userData.email = loginForm.querySelectorAll('input')[0].value;
    userData.password = loginForm.querySelectorAll('input')[1].value;
    api.signIn(userData).then((res) => {

        popupLogin.openClose();
        openFormButton.style.display = 'none';
        loggedInName.style.display = 'flex';
        api.getUserData().then((result) => {
            document.getElementById('Logged-name').textContent = result.name;
            document.getElementById('Logged-name2').textContent = result.name;
        });

    })
    document.location.href = 'index3.html';
};

const searchFieldHeader = document.querySelector('.search');
const searchFieldButton = searchFieldHeader.querySelector('.search__field-button');
const preloaderWindow = document.querySelector('.preloader');
const noresultsWindow = document.querySelector('.noresults');

searchFieldButton.onclick = () => {
    cardsList.innerHTML = '';
    noresultsWindow.style.display = 'none';
    const searchWord = document.querySelector('.search__field-space').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://nomoreparties.co/news/v2/everything?language=ru&q=' + searchWord + '&' + 'from=' + previousDate() + '&' + 'to=' + getDate() + '&' + 'pageSize=100' + '&' + 'apiKey=7fdacda9a907467baf3154b3f141b68f', [false]);
    xhr.send();
    xhr.onprogress = function () {
        preloaderWindow.style.display = 'block';
    };
    xhr.onload = function () {
        preloaderWindow.style.display = 'none';
        if (searchWord.length === 0) {
            console.log('empty')
            return
        };

        apiNews.getNews(searchWord).then((res) => {
            if (res.articles.length === 0) {
                noresultsWindow.style.display = 'flex';
                searchResultsListBlock.style.display = 'none';
                console.log('no articles')
                return
            };
            searchResultsListBlock.style.display = 'block';
            // cardsList.innerHTML = '';
            searchResultsList.countCards = 0;
            console.log(res);
            const newInitialCards = res.articles.map((element) => new Card(element));
            newInitialCards.forEach(element => searchResultsList.addCard(element));
            searchResultsList.render();
        })
    };
    xhr.onerror = function () {

        alert(`Ошибка соединения`);
    };
};
const searchResultsListBlock = document.querySelector('.search-results-list');
const searchResultsMoreButton = searchResultsListBlock.querySelector('.search-results-list__show-more');

searchResultsMoreButton.onclick = () => {
    const searchWord = document.querySelector('.search__field-space').value;
    searchResultsListBlock.style.display = 'flex';
    if (searchWord.length === 0) {
        console.log('empty')
        return
    };
    searchResultsList.render();
    if (searchResultsList.cardDeck.length <= searchResultsList.countCards) {
        searchResultsMoreButton.style.display = 'none';
        return
    }
};

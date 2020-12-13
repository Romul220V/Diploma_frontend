import "./style.css";
import SearchResultList from '../js/search-result-list';
import Card from '../js/card';
import FormValidator from '../js/FormValidator';
import FormValidatorLogin from '../js/FormValidatorLogin';
import Popup from '../js/Popup';
import API from '../js/API';
const initialCards = [
    {
        keyword: 'Природа',
        title: 'Национальное достояние – парки',
        text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        date: '2 августа, 2019',
        source: 'Лента.ру',
        link: 'https://yandex.ru/',
        image: './images/first-card.jpg'

    },
    {
        keyword: 'Природа',
        title: 'Лесные огоньки: история одной фотографии',
        text: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        date: '2 августа, 2019',
        source: 'Медуза',
        link: 'https://yandex.ru/',
        image: './images/second-card.jpg'
    },
    {
        keyword: 'Природа',
        title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
        text: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        date: '2 августа, 2019',
        source: 'Риа',
        link: 'https://yandex.ru/',
        image: './images/third-card.jpg'
    }
];
const cardsList = document.querySelector('.search-results-list__cards');
const newInitialCards = initialCards.map((element) => new Card(element));
const SearchResultsList = new SearchResultList(cardsList, newInitialCards);
console.log(cardsList);
console.log(newInitialCards);
SearchResultsList.render();


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

// const ApiUrl = process.env.NODE_ENV === "production" ? "https://romullearnin.ru.com/api/" : "http://localhost:3000/";
const ApiUrl = process.env.NODE_ENV === "production" ? "http://localhost:3000/api" : "http://localhost:3000/api";
const api = new API({
    baseUrl: ApiUrl
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

tempSecondPage.onclick = () => {
    const userData = {};
    const userToken = {};
    userData.email = loginForm.querySelectorAll('input')[0].value;
    userData.password = loginForm.querySelectorAll('input')[1].value;
    api.signIn(userData).then((res) => {

        popupLogin.openClose();
        openFormButton.style.display = 'none';
        loggedInName.style.display = 'flex';
        api.getUsers().then((result) => {
            document.getElementById('Logged-name').textContent = result.name;
            document.getElementById('Logged-name2').textContent = result.name;
        });

    })
    // document.location.href = 'index3.html';
};

const searchFieldHeader = document.querySelector('.search');
const searchFieldButton = searchFieldHeader.querySelector('.search__field-button');
searchFieldButton.onclick = () => {
    document.location.href = 'index.html';
};
const searchResultsList = document.querySelector('.search-results-list');
const searchResultsMoreButton = searchResultsList.querySelector('.search-results-list__show-more');
searchResultsMoreButton.onclick = () => {
    document.location.href = 'index.html';
};

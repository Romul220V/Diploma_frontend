import "./style.css";
import SearchResultList from '../js/search-result-list';
import Card from '../js/card';
import FormValidator from '../js/FormValidator';
import FormValidatorLogin from '../js/FormValidatorLogin';
import Popup from '../js/Popup';
const initialCards = [
    {
        keyword: 'Природа',
        title: 'Национальное достояние – парки',
        text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        date: '2 августа, 2019',
        source: 'Лента.ру',
        link: 'https://yandex.ru/',
        image: '../src/images/first-card.jpg'

    },
    {
        keyword: 'Природа',
        title: 'Лесные огоньки: история одной фотографии',
        text: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        date: '2 августа, 2019',
        source: 'Медуза',
        link: 'https://yandex.ru/',
        image: '../src/images/second-card.jpg'
    },
    {
        keyword: 'Природа',
        title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
        text: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        date: '2 августа, 2019',
        source: 'Риа',
        link: 'https://yandex.ru/',
        image: '../src/images/third-card.jpg'
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

const regForm = registration.querySelector("form");
const openFormButton = document.querySelector('.header__button_login-button');
const closeRegistrationButton = document.querySelector('.popup__close_registration');

const login = document.querySelector('.popup_form_login');

const popupLogin = new Popup(login);

const loginFormButton = regForm.querySelector('.popup__another-choice_link');

const closeLoginButton = document.querySelector('.popup__close_registered');

const popupLoginEd = document.querySelector('.popup_form_login');

const popupFormRegistration = document.querySelector('.popup_form_register');

const loginForm = popupLoginEd.querySelector('.popup__form');

const loginValidator = new FormValidatorLogin(loginForm);
loginValidator.setEventListeners();

const regisForm = popupFormRegistration.querySelector('.popup__form');

const regValidator = new FormValidator(regisForm);

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

const ApiUrl = process.env.NODE_ENV === "production" ? "https://nomoreparties.co/cohort12" : "http://nomoreparties.co/cohort12";
const api = new API({
    baseUrl: ApiUrl
});
regDone.onclick = () => {
    const userData = {};
    userData.mail = regDone.querySelectorAll('input')[0].value;
    userData.password = regDone.querySelectorAll('input')[1].value;
    userData.name = regDone.querySelectorAll('input')[2].value;
    api.signUp(userData).then((res) => {
        popupRegistration.openClose();
        popupRegDone.openClose();
    })
};

const loggedInButton = regFormDone.querySelector('.popup__another-choice_link');

loggedInButton.onclick = () => {
    popupRegDone.openClose();
    popupLogin.openClose();
};
const tempSecondPage = login.querySelector('.popup__button');

tempSecondPage.onclick = () => {
    popupLogin.openClose();
    document.location.href = 'index3.html';
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

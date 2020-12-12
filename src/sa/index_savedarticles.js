import "./style_sa.css";

import SearchResultList from '../js/search-result-list';
import Card from '../js/card_saved';
import Popup from '../js/Popup';
import API from '../js/API';
const initialCards = [
    {
        keyword: 'Природа',
        title: 'Национальное достояние – парки',
        text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        date: '2 августа, 2019',
        source: 'ДЗЕН',
        link: 'https://yandex.ru/',
        image: './images/fourth-card.jpg'

    },
    {
        keyword: 'Природа',
        title: 'Лесные огоньки: история одной фотографии',
        text: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        date: '2 августа, 2019',
        source: 'АФИША',
        link: 'https://yandex.ru/',
        image: './images/fifth-card.jpg'
    },
    {
        keyword: 'Тайга',
        title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
        text: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        date: '2 августа, 2019',
        source: 'МЕДИАЗОНА',
        link: 'https://yandex.ru/',
        image: './images/sixth-card.jpg'
    },
    {
        keyword: 'Парки',
        title: 'Национальное достояние – парки',
        text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        date: '2 августа, 2019',
        source: 'ДЗЕН',
        link: 'https://yandex.ru/',
        image: './images/fourth-card.jpg'
    },
    {
        keyword: 'Фотография',
        title: 'Лесные огоньки: история одной фотографии',
        text: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        date: '2 августа, 2019',
        source: 'АФИША',
        link: 'https://yandex.ru/',
        image: '.images/fifth-card.jpg'
    }
];
const cardsList = document.querySelector('.search-results-list__cards');
const newInitialCards = initialCards.map((element) => new Card(element));
const SearchResultsList = new SearchResultList(cardsList, newInitialCards);
console.log(cardsList);
console.log(newInitialCards);
SearchResultsList.render();


const mobile = document.querySelector('.popup_mobile');
const popupMobile = new Popup(mobile);
const openMobileButton = document.querySelector('.header__phone-button');
openMobileButton.onclick = () => {
    popupMobile.openClose();
};
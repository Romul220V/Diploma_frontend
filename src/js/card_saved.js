import { mainApi } from '../sa/index_savedarticles.js';
export default class Card {
    constructor(cardData) {
        this.keyword = cardData.keyword;
        this.title = cardData.title;
        this.text = cardData.text;
        this.date = cardData.date;
        this.source = cardData.source;
        this.link = cardData.link;
        this.image = cardData.image;
        this.remove = this.remove.bind(this);
        this.cardData = {
            title: cardData.title,
            text: cardData.description,
            date: cardData.publishedAt,
            source: cardData.source.name,
            link: cardData.url,
            image: cardData.urlToImage,
        }
    };

    remove(event, cardData) {
        this.articleDelete.removeEventListener('click', this.remove);
        mainApi.getArticles()
            .then((res) => {
                const artID = res.data.find(elem => elem.title == cardData.title);
                console.log(res.data);
                console.log(cardData.link);
                (mainApi.removeArticle(artID._id));
            })
        this.articleCard.remove();
    };


    createCard() {

        const articleCard = document.createElement('div');
        const articleImageBlock = document.createElement('div');
        const articleImage = document.createElement('img');
        const articleKeyword = document.createElement('div');
        const articleWarningTextTag = document.createElement('span');
        const articleWarning = document.createElement('div');
        const articleWarningText = document.createElement('span');
        const articleDelete = document.createElement('button');
        const articleDescription = document.createElement('div');
        const articleDate = document.createElement('span');
        const articleLink = document.createElement('a');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleSourse = document.createElement('span');

        articleCard.classList.add('search-card');

        articleImageBlock.classList.add('search-card__image-block');
        articleImage.setAttribute('src', '' + this.image + '');
        articleImage.setAttribute('alt', 'здесь могла быть ваша картинка');
        articleImage.classList.add('search-card__image');
        articleKeyword.classList.add('search-card__tag');
        articleWarningTextTag.classList.add('text', 'text_warning', 'text_warning-tag');
        articleWarningTextTag.textContent = this.keyword;
        articleWarning.classList.add('search-card__warning');
        articleWarningText.classList.add('text', 'text_warning', 'text_warning-delete');
        articleWarningText.textContent = "Убрать из сохранённых";
        articleDelete.classList.add('search-card__delete-icon');
        articleDelete.onmouseout = () => {
            articleWarning.style.display = 'none';
        };
        articleDelete.onmouseover = () => {
            articleWarning.style.display = 'flex';
        };
        articleDescription.classList.add('search-card__description');
        articleDate.classList.add('search-card__date');
        const updDate = this.date.split('T');
        const updDate2 = updDate[0].split('-');
        const date = (Date.UTC(updDate2[0], Number(updDate2[1]) - 1, updDate2[2]));
        let options = { day: 'numeric', month: 'long', year: 'numeric' };
        const articleDateBorrowed = new Intl.DateTimeFormat('ru-RU', options).format(date);
        const aB2 = articleDateBorrowed.split(' ');
        const aB3 = aB2[0] + ' ' + aB2[1] + ', ' + aB2[2];
        console.log(aB3);
        articleDate.textContent = aB3;
        articleTitle.classList.add('title_search-card');
        articleTitle.textContent = this.title;
        articleLink.href = this.link;
        articleText.classList.add('text_search-card');
        articleText.textContent = this.text;
        articleSourse.classList.add('search-card__sourse');
        articleSourse.textContent = this.source;

        articleCard.appendChild(articleImageBlock);
        articleImageBlock.appendChild(articleImage);
        articleImageBlock.appendChild(articleKeyword);
        articleKeyword.appendChild(articleWarningTextTag);
        articleImageBlock.appendChild(articleWarning);
        articleWarning.appendChild(articleWarningText);
        articleImageBlock.appendChild(articleDelete);
        articleCard.appendChild(articleDescription);
        articleDescription.appendChild(articleDate);
        articleDescription.appendChild(articleTitle);
        articleTitle.appendChild(articleLink);
        articleDescription.appendChild(articleText);
        articleDescription.appendChild(articleSourse);

        articleDelete.addEventListener('click', (e) => this.remove(e, this.cardData));
        this.articleDelete = articleDelete;
        this.articleCard = articleCard;
        return articleCard;
    };

};

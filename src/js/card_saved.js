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
    };

    remove() {
        this.articleDelete.removeEventListener('click', this.remove);
        this.articleCard.remove();
    };


    createCard() {

        const articleCard = document.createElement('div');
        const articleImage = document.createElement('div');
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

        articleImage.setAttribute('style', 'background: url(' + this.image + ')');
        articleImage.classList.add('search-card__image');
        articleKeyword.classList.add('search-card__tag');
        articleKeyword.textContent = this.keyword;
        articleWarningTextTag.classList.add('text_warning');
        articleWarning.classList.add('search-card__warning');
        articleWarningText.classList.add('text_warning');
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
        articleDate.textContent = this.date;
        articleTitle.classList.add('title_search-card');
        articleTitle.textContent = this.title;
        articleLink.href = this.link;
        articleText.classList.add('text_search-card');
        articleText.textContent = this.text;
        articleSourse.classList.add('search-card__sourse');
        articleSourse.textContent = this.source;

        articleCard.appendChild(articleImage);
        articleImage.appendChild(articleKeyword);
        articleKeyword.appendChild(articleWarningTextTag);
        articleImage.appendChild(articleWarning);
        articleWarning.appendChild(articleWarningText);
        articleImage.appendChild(articleDelete);
        articleCard.appendChild(articleDescription);
        articleDescription.appendChild(articleDate);
        articleDescription.appendChild(articleTitle);
        articleTitle.appendChild(articleLink);
        articleDescription.appendChild(articleText);
        articleDescription.appendChild(articleSourse);

        articleDelete.addEventListener('click', this.remove);
        this.articleDelete = articleDelete;
        this.articleCard = articleCard;
        return articleCard;
    };

};

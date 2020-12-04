export default class Card {
    constructor(cardData) {
        this.keyword = cardData.keyword;
        this.title = cardData.title;
        this.text = cardData.text;
        this.date = cardData.date;
        this.source = cardData.source;
        this.link = cardData.link;
        this.image = cardData.image;
    };
    bookmark(event) {
        if (event.target.classList.contains('search-card__bookmark-icon')) {
            event.target.classList.toggle('search-card__bookmark-icon_marked');
        };
    }

    createCard() {

        const articleCard = document.createElement('div');
        const articleImage = document.createElement('div');
        const articleWarning = document.createElement('div');
        const articleWarningText = document.createElement('span');
        const articleBookmark = document.createElement('button');
        const articleDescription = document.createElement('div');
        const articleDate = document.createElement('span');
        const articleLink = document.createElement('a');
        const articleTitle = document.createElement('h3');
        const articleText = document.createElement('p');
        const articleSourse = document.createElement('span');

        articleCard.classList.add('search-card');

        articleImage.setAttribute('style', 'background: url(' + this.image + ')');
        articleImage.classList.add('search-card__image');
        articleWarning.classList.add('search-card__warning');
        articleWarningText.classList.add('text_warning');
        articleWarningText.textContent = "Войдите, чтобы сохранять статьи";
        articleBookmark.classList.add('search-card__bookmark-icon');
        articleBookmark.onmouseout = () => {
            articleWarning.style.display = 'none';
        };
        articleBookmark.onmouseover = () => {
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
        articleImage.appendChild(articleWarning);
        articleWarning.appendChild(articleWarningText);
        articleImage.appendChild(articleBookmark);
        articleCard.appendChild(articleDescription);
        articleDescription.appendChild(articleDate);
        articleDescription.appendChild(articleTitle);
        articleTitle.appendChild(articleLink);
        articleDescription.appendChild(articleText);
        articleDescription.appendChild(articleSourse);

        this.articleCard = articleCard;
        articleBookmark.addEventListener('click', this.bookmark);
        this.articleBookmark = articleBookmark;
        return articleCard;
    };

};

export default class Card {
    constructor(cardData) {
        this.title = cardData.title;
        this.text = cardData.description;
        this.date = cardData.publishedAt;
        this.source = cardData.source.name;
        this.link = cardData.url;
        this.image = cardData.urlToImage;
    };
    bookmark(event) {
        if (event.target.classList.contains('search-card__bookmark-icon')) {
            event.target.classList.toggle('search-card__bookmark-icon_marked');
        };
    }

    createCard() {

        const articleCard = document.createElement('div');
        const articleImageBlock = document.createElement('div');
        const articleImage = document.createElement('img');
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

        articleImageBlock.classList.add('search-card__image-block');
        articleImage.setAttribute('src', '' + this.image + '');
        articleImage.setAttribute('alt', 'здесь могла быть ваша картинка');
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
        articleImageBlock.appendChild(articleWarning);
        articleWarning.appendChild(articleWarningText);
        articleImageBlock.appendChild(articleBookmark);
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

export default class ArticleList {
    constructor(container, articleDeck) {
        this.container = container;
        this.articleDeck = articleDeck;
    };

    createArticle(article) {
        this.articleDeck.push(article);
        this.renderArticle(article);
    };

    renderArticle(card) {
        this.container.appendChild(card.createArticle());
    }

    render() {
 
       this.articleDeck.forEach(element => this.renderArticle(element));
    }
}
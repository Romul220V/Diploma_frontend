export default class SearchResultList {
    constructor(container, cardDeck) {
        this.container = container;
        this.cardDeck = cardDeck;
        this.countCards = 0;
    };

    addCard(card) {
        this.cardDeck.push(card);
    };

    renderCard(card) {
        this.container.appendChild(card.createCard());

    }

    render() {
        this.cardDeck.slice(this.countCards, this.countCards + 3).forEach(element => this.renderCard(element));
        this.countCards += 3;
        console.log(this.countCards);
    }

}

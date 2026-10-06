class ProductListingPage{
    searchInput = '[data-test="search-query"]';
    searchButton = '[data-test="search-submit"]';

    searchProduct(productName){
        cy.get(this.searchInput).clear().type(productName);
    }
    clickSearch() {
        cy.get(this.searchButton).click();
    }
}
export default new ProductListingPage();
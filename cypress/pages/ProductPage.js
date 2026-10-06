class ProductPage {
    productName = '[data-test="product-name"]';
    addToCartButton = '[data-test="add-to-cart"]';
    productPrice='[data-test="unit-price"]';

    getProductName(){
        return cy.get(this.productName);//cy.get() produces a Cypress chainable that can be used for assertion in test/spec ex:ProductPAGE.getProductName().should('have.text', 'Combination Pliers')
    }
    addToCart(){
        cy.get(this.addToCartButton).click();
    }
    getProductPrice(){
        return cy.get(this.productPrice);
    }
}
export default new ProductPage();
import ProductPage from "../../pages/ProductPage";

describe('Product Page', () => {

    it('should display product details', () => {
        cy.visit('/')
        cy.contains('Combination Pliers').click();
        //cy.visit('/product/01M37FY5YPMYWJEAKHVXNH6M');

        ProductPage.getProductName()
        .should('be.visible')
        .and('contain.text', 'Combination Pliers');

        ProductPage.getProductPrice()
        .should('be.visible')
        .and('contain.text', '14.15');

    });
    it('should add product to cart', () => {
    cy.visit('/');

    cy.get('[data-test="product-01M39YX1Z2FENKX3BEEV1E9HES"]')
        .click();
    ProductPage.addToCart();
    cy.get('#toast-container')
        .should('contain.text', 'Product added to shopping cart');
});
});
describe('Practice Software testing',()=>{
    it('should open home page',()=>{
        cy.visit('/');
        cy.url().should('include','practicesoftwaretesting.com')
        cy.log(Cypress.expose('language'));
        cy.log(Cypress.expose('environment'));
    });
});
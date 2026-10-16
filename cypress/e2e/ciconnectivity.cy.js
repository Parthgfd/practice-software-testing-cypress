
describe('CI Browser Diagnostic', () => {
    it('should inspect the login page response', () => {
        cy.visit('/auth/login', {
            failOnStatusCode: false
        });

        cy.title().then((title) => {
            cy.log(`Page title: ${title}`);
        });

        cy.get('body').invoke('text').then((text) => {
            cy.log(`Page content: ${text.substring(0, 300)}`);
        });
    });
});

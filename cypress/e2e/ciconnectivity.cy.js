describe('CI Browser Check', () => {

  it('open login page without failing', () => {

    cy.visit('/auth/login', {
      failOnStatusCode: false
    });

    cy.document().then((doc) => {
      cy.log(doc.title);
    });

  });

});
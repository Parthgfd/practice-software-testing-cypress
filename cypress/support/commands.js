import LoginPage from "../pages/LoginPage";
Cypress.Commands.add('login',()=>{
    cy.session('user', () => {
        cy.visit('/auth/login');
        cy.env(['email','password'])
            .then( ({email,password}) => {
               LoginPage.login(email,password);
            });
            
        cy.contains('h1', 'My account').should('be.visible');

       }, {
           validate() {
             cy.visit('/account');

             cy.contains('h1', 'My account')
                .should('be.visible');
            }
          }
     );    
})
Cypress.Commands.add('assertApiSuccess', (response) => {
    expect(response.status).to.eq(200);
});
Cypress.Commands.add('assertProductExists', (products, productName) => {
    const product = products.find(
        product => product.name === productName
    );

    expect(product).to.exist;

    return product;
});
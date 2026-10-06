import LoginPage from "../../pages/LoginPage";
describe('Login',()=>{
    it('should login successfully',{ tags: '@smoke' },()=>{
        //cy.visit('/auth/login');
        cy.login();
        //cy.env(['email','password']).then(
            //({email,password}) => {
               //LoginPage.login(email,password);
           //});
           //COMMENT -> cy.env([email,password]) takes value from env:{
           //email:process.env.TEST_EMAIL,
           //assword:process.env.TEST_PASSWORD,
           //}, give me the values of email,password defined in cyress.config.js

           
        cy.visit('/account');
         cy.url().should('not.include','/auth/login')
         cy.contains('h1','My account').should('be.visible')//cy.contains searches for test,find h1 element containing text "My account"
       
    })
    
    it('should not login with invlaid credentials',{ tags: '@regression' },()=>{
         cy.visit('/auth/login');
         cy.fixture('loginData').then(({invalidUser})=>{
            LoginPage.login(invalidUser.email,invalidUser.password);
        })//cy.fixture('loginData') is used to load fixture
        cy.url().should('include','/auth/login')
    })
//sessions
    it('should access account page with reused session', () => {
    cy.login();

    cy.visit('/account');

    cy.contains('h1', 'My account')
        .should('be.visible');
});
//Retries TC 
    it('should show the current retry number', () => {
        console.log(`Current retry: ${Cypress.currentRetry}`);

        throw new Error(
        `Current retry is ${Cypress.currentRetry}`
    );
    });

    
})

class LoginPage {
    emailInput = '[data-test="email"]'
    passwordInput = '#password'
    loginButton = '[data-test="login-submit"]'

    enterEmail(email){
        cy.get(this.emailInput).type(email); // this refers to current LoginPage object 
    }
    enterPassword(password){
        cy.get(this.passwordInput).type(password);
    }
    clickLogin(){
        cy.get(this.loginButton).click();
    }

    login(email, password){
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLogin();
    }
    //Why we used login method ?
    //Instead of doing LoginPage.enterEmail(email),LoginPage.enterPassword(password),LoginPage.clickLogin(), test can simply do LoginPage.login(email,password)
}
export default new LoginPage(); // we are exporting instance of LoginPage class
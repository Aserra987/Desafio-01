import { loginPage } from "../e2e/online-shop/pages/login";

Cypress.Commands.add('getElement', ({dataCy, selector}) => { 
    if(dataCy) {
        cy.get(`[data-cy="${dataCy}"]`);
    }
    if (selector) {
        cy.get(selector);
    }
});

Cypress.Commands.add('login', (username, password) => { 
    cy.getElement({dataCy: loginPage.dataCys.usernameTexBox}).type(username);
    cy.getElement({dataCy: loginPage.dataCys.passwordTexBox}).type(password);
    cy.getElement({dataCy: loginPage.dataCys.submitFormButton}).click();
});

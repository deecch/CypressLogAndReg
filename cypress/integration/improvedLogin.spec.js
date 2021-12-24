const Locators = require('../fixtures/Locators.json');
const faker = require("faker");

describe('login test', () => {
    let validEmail = 'dragan1@gmail.com'
    let validPassword = '12345678';

    let userData = {
        randomName: faker.name.findName(),
        randomEmail: faker.internet.email(),
        randomPass: faker.datatype.number()
    }

    before(() => {
        cy.visit("/");
        //cy.get('a[href="/login"]').click();
        cy.get(Locators.Header.Login).click();
        cy.url().should('contains', 'https://gallery-app');

    });

    it.only('login with invalid credentials', () => {
        cy.get(Locators.LoginPage.email).clear().type(userData.randomEmail);
        cy.get(Locators.LoginPage.password).clear().type(userData.randomPass);
        cy.get(Locators.LoginPage.SubmitButton).click();
        cy.url().should('include', 'login');
        

    });

    it('login with valid credentials', () => {
        // cy.get('#email').type('dragan1@gmail.com');
        // cy.get('#password').type('12345678');
        // cy.get('button[type="submit"]').click();
        cy.get(Locators.LoginPage.email).clear().type(validEmail);
        cy.get(Locators.LoginPage.password).clear().type(validPassword);
        cy.get(Locators.LoginPage.SubmitButton).click();
        cy.url().should('not.include', 'login');
        // cy.get('a[role="button "]').should('be.visible');

    }); 

    it('logout', () => {
        cy.get(Locators.Logout.logout).should('be.visible')
        cy.get(Locators.Logout.logout).click();

    });

});

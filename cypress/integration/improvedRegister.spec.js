const faker = require('faker');
const Locators = require('../fixtures/Locators.json');

describe('registration test', () => {

    let userData = {
        randomName: faker.name.findName(),
        randomLastName: faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPass: faker.internet.password(8),
        randomNewPass: faker.internet.password()

    }

    before(() => {
        cy.visit("/");
        cy.get(Locators.Header.Register).click();
        cy.url().should('contains', 'register');

    });

    xit('register where the password not match password confirmation', () => {
        cy.get(Locators.RegisterPage.firstName).type('Nikola');
        cy.get(Locators.RegisterPage.lastName).type('Nikolic');
        cy.get(Locators.RegisterPage.emailReg).type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get(Locators.RegisterPage.password).type('12345678');
        cy.get(Locators.RegisterPage.confPassword).type('12345678');
        cy.get(Locators.RegisterPage.terms).click();
        cy.contains(Locators.RegisterPage.submit).click();
        // cy.get(Locators.RegisterPage.msg).should('be.visible')
        //   .and('contain', 'The password confirmation does not match.');

    });

    it('register valid data', () => {
        cy.get(Locators.RegisterPage.firstName).type(userData.randomName);
        cy.get(Locators.RegisterPage.lastName).type(userData.randomLastName);
        cy.get(Locators.RegisterPage.emailReg).type(userData.randomEmail);
        cy.get(Locators.RegisterPage.password).type(userData.randomPass);
        cy.get(Locators.RegisterPage.confPassword).type(userData.randomPass);
        cy.get(Locators.RegisterPage.terms).click();
        cy.contains(Locators.RegisterPage.submit).click();
        // cy.get(Locators.RegisterPage.msg).should('be.visible')
        //   .and('contain', 'The password confirmation does not match.');

    });

});

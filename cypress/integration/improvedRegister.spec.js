const faker = require('faker');
const Locators = require('../fixtures/Locators.json');
import { header } from '../page_objects/header';
import { validationMsg } from '../fixtures/validationMsg';
import { registerPage } from '../page_objects/registerPage';

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

    it.only('register where the password not match password confirmation', () => {
        cy.get(Locators.RegisterPage.firstName).type('Nikola');
        cy.get(Locators.RegisterPage.lastName).type('Nikolic');
        cy.get(Locators.RegisterPage.emailReg).type('nikola' + Cypress._.random(0, 1e6) + '@emailcom');
        cy.get(Locators.RegisterPage.password).type('12345678');
        cy.get(Locators.RegisterPage.confPassword).type('1234567');
        cy.get(Locators.RegisterPage.terms).click();
        cy.contains(Locators.RegisterPage.submit).click();
        registerPage.validationRegisterPage.contains(validationMsg.msgPassMatch).should('have.css', 'background-color', 'rgb(248, 215, 218)')
        header.register.should('be.visible')
        registerPage.validationRegisterPage.should('exist')
        registerPage.validationRegisterPage.should('have.length', 2)
        cy.contains(validationMsg.msgEmailValid).should('be.visible')        
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

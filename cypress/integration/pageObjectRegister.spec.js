const faker = require('faker');
import { registerPage } from '../page_objects/registerPage';
import { password, validEmail, shortPass, invalidEmail, space, invalidEmail2, passNoDigits } from "../../config";
import { header } from '../page_objects/header';
import { validationMsg } from "../fixtures/validationMsg.json";

describe('POM register', () => {

    let userData = {
        randomName: faker.name.findName(),
        randomLastName : faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPass: faker.internet.password(8)
    }

    beforeEach(function(){
        cy.visit("/");
        header.register.click();
        cy.url().should('include', 'register');
        
    })

    it('register without firstName', () => {
        registerPage.register(space, userData.randomLastName, userData.randomEmail, password, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgReqFirstName)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register without lastName', () => {
        registerPage.register(userData.randomName, space, userData.randomEmail, password, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgReqLastName)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register without email', () => {
        registerPage.register(userData.randomName, userData.randomLastName, space, password, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        cy.get('h1').should('contain', 'Register')
            .and('have.css', 'color', 'rgb(72, 73, 75)')
    });

    it('register without password', () => {
        registerPage.register(userData.randomName, userData.randomLastName, userData.randomEmail, space, space)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgPassFieldReg)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register without terms', () => {
        registerPage.registerWithoutTerms(userData.randomName, userData.randomLastName, userData.randomEmail, password, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgTerms)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register without @ in email', () => {
        registerPage.register(userData.randomName, userData.randomLastName, invalidEmail2, password, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.submitBtn.should('be.visible')
    });

    it('register without . in email', () => {
        registerPage.register(userData.randomName, userData.randomLastName, invalidEmail, password, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgEmailValid)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register with email from registred user', () => {
        registerPage.register(userData.randomName, userData.randomLastName, validEmail, password, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgEmailUsed)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register where the password not match password confirmation', () => {
        registerPage.register(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPass, password)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgPassMatch)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register where the password has less characters than recommended', () => {
        registerPage.register(userData.randomName, userData.randomLastName, userData.randomEmail, shortPass, shortPass)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgShortPass)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    
    });

    it('register with password which not contains digits', () => {
        registerPage.register(userData.randomName, userData.randomLastName, userData.randomEmail, passNoDigits, passNoDigits)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        header.login.should('exist')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgPassFormat)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    });

    it('register with all invalid credentials', () => {
        registerPage.registerWithoutTerms(space, space, invalidEmail, space, space)
        cy.url().should('include', 'register');
        registerPage.navTogglerSelector.should('contain','Register')
        header.login.should('exist')
        registerPage.validationRegisterPage.should('be.visible')
            .and('contain', validationMsg.msgReqFirstName)
            .and('contain', validationMsg.msgReqLastName)
            .and('contain', validationMsg.msgEmailValid)
            .and('contain', validationMsg.msgPassFieldReg)
            .and('contain', validationMsg.msgTerms)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 5)
    });

    it.only('register with valid credentials', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('register')
        registerPage.register(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPass, userData.randomPass)
        cy.wait('@register').then((interception) => { 
            expect(interception.response.body.token_type).to.eq('bearer')
            expect(interception.response.statusCode).to.eq(200)    
        })
        cy.url().should('not.include', 'register');
        registerPage.navTogglerSelector.should('not.contain','Register')
        header.login.should('not.exist')
        header.logout.should('be.visible')
    });

});

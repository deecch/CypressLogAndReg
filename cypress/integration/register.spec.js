import { firstName, lastName, password } from "../../config";

describe('registration test', () => {

    before(function(){
        cy.visit("/");
        cy.get('a[href="/register"]').click();
        cy.url().should('include', 'register');
    })

    it.only('register without firstName', () => {
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.url().should('include', 'register');
    });

    it('register without lastName', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.url().should('include', 'register');
    });

    it('register without email', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.url().should('include', 'register');
    });

    it('register without password', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password-confirmation').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.url().should('include', 'register');
    });

    it('register without password', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.url().should('include', 'register');
    });

    it('register without terms', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('12345678');
        cy.contains('Submit').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
          .and('contain', 'The terms and conditions must be accepted.');
    });

    it('register without @ in email', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikolaemail.com');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.url().should('include', 'register');
    });

    it('register without . in email', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola@emailcom');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.contains('The email must be a valid email address.').should('be.visible');
    });

    it('register with email form registred user', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola@email.com');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('12345678');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
          .and('contain', 'The email has already been taken.');
    });

    it('register where the password not match password confirmation', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type('12345678');
        cy.get('#password-confirmation').type('1234567');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
          .and('contain', 'The password confirmation does not match.');
    });

    it('register where the password has less characters than recommended', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type('1234567');
        cy.get('#password-confirmation').type('1234567');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
          .and('contain', 'The password must be at least 8 characters.');
    });

    it('register with password which not contains digits', () => {
        cy.get('#first-name').type('Nikola');
        cy.get('#last-name').type('Nikolic');
        cy.get('#email').type('nikola' + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type('asdfghjk');
        cy.get('#password-confirmation').type('asdfghjk');
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
          .and('contain', 'The password format is invalid.');
    });

    it('register with valid credentials', () => {
        cy.register(firstName, lastName, password);
        cy.get('a[role="button "]').should('be.visible');
        cy.get('#navbarTogglerDemo01').should('not.contain', 'Register');    
    });

});
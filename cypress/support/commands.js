// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('register', (firstName, lastName, password) => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(firstName + Cypress._.random(0, 1e6) + '@email.com');
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('input[type="checkbox"]').click();
        cy.contains('Submit').click();
  });

  Cypress.Commands.add('loginViaBackend', () => {
      cy.request({
            method: "POST",
            url: 'https://gallery-api.vivifyideas.com/api/auth/login',
            body: {
                  email: Cypress.env('validUserMail'),
                  password: Cypress.env('validUserPass')
            }
      }).its('body').then((response) => {
            window.localStorage.setItem('token', response.access_token)
      })
  })

  Cypress.Commands.add('logout', (token) => {
        cy.request({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/auth/logout",
            headers: {
                          authorization: 'bearer ' + token
                      }
        })
  })

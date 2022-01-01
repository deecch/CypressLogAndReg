import { name, internet, datatype } from "faker";
import { authLogin } from '../page_objects/authLogin';
import { header } from '../page_objects/header';
import { validEmail, validPassword, space, shortPass, invalidEmail } from "../../config";
import { validationMsg } from "../fixtures/validationMsg.json";


describe('POM login', () => {

    let authToken = window.localStorage.getItem('token')
    
    let userData = {
        randomName: name.findName(),
        randomEmail: internet.email(),
        randomPass: datatype.number()
    }

    before('visit app', () => {
        // odkomentarisati ako se koristi drugi nacin za logout
        // cy.loginViaBackend()
        cy.visit("/");
        header.login.click();
        cy.url().should('contains', 'login');
        

    });

    it('login with invalid credentials', () => {
        authLogin.login(userData.randomEmail, userData.randomPass)
        cy.url().should('include', 'login');
        authLogin.errorMsg.should('be.visible')
            .and('contain', validationMsg.msgBadCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        
    });

    it('login without email address', () => {
        authLogin.login(space, userData.randomPass)
        cy.url().should('include', 'login');
        authLogin.navTogglerSelector.should('contain', 'Login')
            .and('not.contain', 'Logout')
        authLogin.submit.should('exist')
    
    });

    it('login without password', () => {
        authLogin.login(userData.randomEmail, space)
        cy.url().should('include', 'login');
        authLogin.navTogglerSelector.should('contain', 'Login')
        authLogin.errorMsg.should('be.visible')
            .and('contain', validationMsg.msgBadCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        authLogin.submit.should('exist')
    
    });

    it('login with invalid password', () => {
        authLogin.login(validEmail, shortPass)
        cy.url().should('include', 'login');
        authLogin.navTogglerSelector.should('contain', 'Login')
        authLogin.errorMsg.should('be.visible')
            .and('contain', validationMsg.msgBadCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        authLogin.submit.should('exist')
    
    });

    it('login with empty space before password', () => {
        authLogin.login(validEmail, space + validPassword)
        cy.url().should('include', 'login');
        authLogin.errorMsg.should('be.visible')
            .and('contain', validationMsg.msgBadCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        authLogin.navTogglerSelector.should('contain', 'Login')
            .and('not.contain', 'Logout')
        authLogin.submit.should('exist')
    
    });

    it('login with empty space before email', () => {
        authLogin.login(space + validEmail, validPassword )
        cy.url().should('include', 'login');
        authLogin.navTogglerSelector.should('contain', 'Login')
            .and('not.contain', 'Logout')
        authLogin.submit.should('exist')
    
    });

    it('login without . in email', () => {
        authLogin.login(invalidEmail, validPassword)
        cy.url().should('include', 'login');
        authLogin.errorMsg.should('be.visible')
            .and('contain', validationMsg.msgBadCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        authLogin.navTogglerSelector.should('contain', 'Login')
            .and('not.contain', 'Logout')
        authLogin.submit.should('exist')
    });

    it('login without credentials', () => {
        authLogin.login( space, space )
        cy.url().should('include', 'login');
        authLogin.navTogglerSelector.should('contain', 'Login')
            .and('not.contain', 'Logout')
        authLogin.submit.should('exist')
    });

    it('login with valid credentials', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('login')
        authLogin.login(validEmail, validPassword)
        cy.wait('@login').then((interception) => {
            console.log(interception.response)
            expect(interception.response.statusCode).eq(200)
        })

        cy.url().should('not.include', 'login');
        header.logout.should('be.visible');
        authLogin.navTogglerSelector.should('exist')
            .and('not.contain', 'Login')

    }); 

    it('logout', () => {
        cy.intercept({
            method: "POST",
            url: 'https://gallery-api.vivifyideas.com/api/auth/logout'
        }).as('logout')
        header.logout.should('be.visible')
        header.logout.click();
        cy.wait('@logout').then((interception) => {
            expect(interception.response.statusCode).eq(200)
            expect(interception.response.body.message).eq('Successfully logged out')
        })
        authLogin.navTogglerSelector.should('not.contain', 'Logout')
            .and('not.contain', 'Create Gallery')
        //  drugo resenje preko command.js-a, da bi radilo mora biti odkomentarisan login u before-u
        // console.log(authToken)
        // cy.logout(authToken).then((response) => {
        //     expect(response.status).eq(200)
        //     expect(response.body.message).eq('Successfully logged out')
        // })

    });

});

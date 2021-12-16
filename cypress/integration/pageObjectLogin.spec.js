import { name, internet, datatype } from "faker";
import { authLogin } from '../page_objects/authLogin';
import { header } from '../page_objects/header';

describe('POM login', () => {
    let validEmail = 'dragan1@gmail.com'
    let validPassword = '12345678';

    let userData = {
        randomName: name.findName(),
        randomEmail: internet.email(),
        randomPass: datatype.number()
    }

    before('visit app', () => {
        cy.visit("/");
        header.login.click();
        cy.url().should('contains', 'login');

    });

    it('login with invalid credentials', () => {
        authLogin.login(userData.randomEmail, userData.randomPass)
        cy.url().should('include', 'login');
        

    });

    it('login with valid credentials', () => {
        authLogin.login(validEmail, validPassword)
        cy.wait(3000)
        cy.url().should('not.include', 'login');
        header.logout.should('be.visible');

    }); 

    it('logout', () => {
        header.logout.should('be.visible')
        header.logout.click();

    });

});

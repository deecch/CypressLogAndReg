describe('login test', () => {

    before(function(){
        cy.visit("/");
        cy.get('a[href="/login"]').click();
        cy.url().should('include', 'vivifyideas');
    })

    xit('login without email address', () => {
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    });

    xit('login without password address', () => {
        cy.get('#email').type('dragan1@gmail.com');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    });
    
    xit('login without @ in email address', () => {
        cy.get('#email').type('dragan1gmail.com');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/login')
    });
    
    xit('login with empty fields', () => {
        cy.get('button[type="submit"]').click();
        cy.url().should('include', 'login')
    });
    
    xit('login with invalid password ', () => {
        cy.get('#email').type('dragan1@gmail.com');
        cy.get('#password').type('1234567');
        cy.get('button[type="submit"]').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
        .and('contain', 'Bad Credentials')
    });

    it('login with empty space before password ', () => {
        cy.get('#email').type('dragan1@gmail.com');
        cy.get('#password').type(' 12345678');
        cy.get('button[type="submit"]').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
        .and('contain', 'Bad Credentials');
    });

    xit('login without . in email ', () => {
        cy.get('#email').type('dragan1@gmailcom');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
        .and('contain', 'Bad Credentials');
    });

    xit('login with space before email', () => {
        cy.get('#email').type('  dragan1@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.url().should('include', 'login');
    });

    xit('login with valid credentials', () => {
        cy.get('#email').type('dragan1@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.url().should('not.include', 'login');
        cy.get('a[role="button "]').should('be.visible');
    });
    
    xit('logout', () => {
        cy.get('a[role="button "]').should('be.visible')
        cy.get('a[role="button "]').click();
    });
});
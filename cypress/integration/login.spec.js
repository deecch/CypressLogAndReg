describe('login test', () => {

    before(function(){
        cy.visit("/");
        cy.get('a[href="/login"]').click();

    });

    it('login without email address', () => {
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')

    });

    it('login without password address', () => {
        cy.get('#email').type('dragan1@gmail.com');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')

    });
    
    it('login without @ in email address', () => {
        cy.get('#email').type('dragan1gmail.com');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/login')

    });
    
    it('login with empty fields', () => {
        cy.get('button[type="submit"]').click();
        cy.url().should('include', 'login')

    });
    
    it('login with invalid password ', () => {
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

    it('login without . in email ', () => {
        cy.get('#email').type('dragan1@gmailcom');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.get('p[class="alert alert-danger"]').should('be.visible')
          .and('contain', 'Bad Credentials');

    });

    it('login with space before email', () => {
        cy.get('#email').type('  dragan1@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.url().should('include', 'login');

    });

    it.only('login with valid credentials', () => {
        cy.get('#email').type('dragan1@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('button[type="submit"]').click();
        cy.url().should('not.include', 'login');
        cy.get('a[role="button "]').should('be.visible');
    });

    it('logout', () => {
        cy.get('a[role="button "]').should('be.visible')
        cy.get('a[role="button "]').click();

    });

    // xit('response has token type bearer', () => {
    //     cy.request('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', 
    //       { "email": "dragan1@gmail.com", "password": "12345678" }).then((response) => {
    //       expect(response.body).to.have.property('token_type', 'bearer')
    //       expect(response.status).to.be.eq(200)
    //       expect(response.body).to.have.property('access_token')
    //     });
    //
    // });

});

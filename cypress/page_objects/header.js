class Header {

    get login() {
        return cy.get("a[href='/login']")
    }

    get register() {
        return cy.get("a[href='/register']")
    }

    get logout() {
        return cy.get('a[role="button "]')
    }

}

export const header = new Header();

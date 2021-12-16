class AuthLogin {

    get emailInput() {
        return cy.get('#email')
    }

    get passwordInput() {
        return cy.get('#password')
    }

    get submit() {
        return cy.get("button[type='submit']")
    }

    get logout() {
        return cy.get('a[role="button "]')
    }

    login(email, password) {
        this.emailInput.clear().type(email)
        this.passwordInput.clear().type(password)
        this.submit.click()
    }
}

export const authLogin = new AuthLogin()

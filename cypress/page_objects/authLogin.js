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

    get errorMsg () {
        return cy.get('p[class="alert alert-danger"]')
    }

    get navTogglerSelector() {
        return cy.get("#navbarTogglerDemo01");
    }

    login(email, password) {
        this.emailInput.clear().type(email)
        this.passwordInput.clear().type(password)
        this.submit.click()
    }
}

export const authLogin = new AuthLogin()

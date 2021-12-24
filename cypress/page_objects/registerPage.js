class RegisterPage {

    get firstNameField() {
        return cy.get('#first-name')
    }

    get lastNameField() {
        return cy.get('#last-name')
    }

    get emailField() {
        return cy.get('#email')
    }

    get passField() {
        return cy.get('#password')
    }

    get passConfirmationField() {
        return cy.get('#password-confirmation')
    }

    get termsBox() {
        return cy.get('input[type="checkbox"]')
    }

    get submitBtn() {
        return cy.contains('Submit')
    }

    get navTogglerSelector() {
        return cy.get("#navbarTogglerDemo01");
    
    }

    get validationRegisterPage() {
        return cy.get('p[class="alert alert-danger"]');
    }

    getvalidationRegisterPage(index) {
        return cy.get('p[class="alert alert-danger"]').eq(index);
    }

    register(firstName, lastName, email, pass, passConfirmation) {
        this.firstNameField.clear().type(firstName)
        this.lastNameField.clear().type(lastName)
        this.emailField.clear().type(email)
        this.passField.clear().type(pass)
        this.passConfirmationField.clear().type(passConfirmation)
        if (this.termsBox.uncheck()) {
            this.termsBox.click()
        }
        this.submitBtn.click()
    }

    registerWithoutTerms(firstName, lastName, email, pass, passConfirmation) {
        this.firstNameField.clear().type(firstName)
        this.lastNameField.clear().type(lastName)
        this.emailField.clear().type(email)
        this.passField.clear().type(pass)
        this.passConfirmationField.clear().type(passConfirmation)
        this.submitBtn.click()
    }

}

export const registerPage = new RegisterPage();
class Utilities {

  get validationRegisterPage() {
    return cy.get('p[class="alert alert-danger"]');
  }

  get validatonMsgEmailValid() {
    return cy.contains("The email must be a valid email address.");
  }

  get validationMsgEmailUsed() {
    return cy.contains("The email has already been taken.");
  }

  get validationMsgEmailUsed() {
    return cy.contains("The email has already been taken.");
  }

  get validationMsgShortPass() {
    return cy.contains("The password must be at least 8 characters.");
  }

  get validationMsgPassMatch() {
    return cy.contains("The password confirmation does not match.");
  }

  get validationMsgPassFormat() {
    return cy.contains("The password format is invalid.");
  }

  get validationMsgTerms() {
    return cy.contains("The terms and conditions must be accepted.");
  }

  get navTogglerSelector() {
    return cy.get("#navbarTogglerDemo01");

  }
  
}

export const utilities = new Utilities();

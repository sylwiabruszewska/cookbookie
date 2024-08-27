describe("Registration", () => {
  // Before running the test, set a cookie to specify the locale for the test
  before(() => {
    cy.setCookie("NEXT_LOCALE", "pl");
  });

  it("should allow user to sign up", () => {
    // Visit the application's homepage
    cy.visit("/");

    // Click the sign-up button to start the registration process
    cy.get('[data-testid="register-button"]').click();

    // Ensure that the URL includes '/register'
    cy.url().should("include", "/register");

    // Fill form with data
    cy.get('[data-testid="register-username-input"]').type("Test");
    cy.get('[data-testid="register-email-input"]').type("test@email.com");
    cy.get('[data-testid="register-password-input"]').type("Test123!");
    cy.get('[data-testid="register-confirmpassword-input"]').type("Test123!");

    // Click the submit button to complete the registration process
    cy.get('[data-testid="register-submit-button"]').click();

    // Verify that the URL changes to include "/login", indicating successful registration and redirection
    cy.url().should("include", "/login");
  });
});

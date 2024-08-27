describe("Sign in", () => {
  // Before running the test, set a cookie to specify the locale for the test
  before(() => {
    cy.setCookie("NEXT_LOCALE", "pl");
  });

  it("should allow user to sign in", () => {
    // Visit the application's homepage
    cy.visit("/");

    // Click the sign-in button to start the login process
    cy.get('[data-testid="login-button"]').click();

    // Ensure that the URL includes '/login'
    cy.url().should("include", "/login");

    // Fill form with data
    cy.get('[data-testid="login-email-input"]').type("test4@email.com");
    cy.get('[data-testid="login-password-input"]').type("Test123!");

    // Click the submit button to complete the login process
    cy.get('[data-testid="login-submit-button"]').click();

    // Verify that the URL changes to include "/dashboard", indicating successful login and redirection
    cy.url().should("include", "/dashboard");
  });
});

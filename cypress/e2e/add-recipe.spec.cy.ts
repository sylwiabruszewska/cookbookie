describe("Add recipe", () => {
  // Before running the test, set a cookie to specify the locale for the test
  before(() => {
    cy.setCookie("NEXT_LOCALE", "pl");
    cy.login("test6@email.com", "Test123!");
  });

  it("should allow user to add recipe", () => {
    // use later
    // cy.intercept('GET', '/api/endpoint').as('fetchRequest');
    // cy.wait('@fetchRequest');
    // cy.get('[data-testid="add-recipe-btn"]').click();

    // fix later { timeout: 10000 }

    // Step 1: Open the recipe form
    cy.get('[data-testid="add-recipe-btn"]', { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="add-recipe-btn"]').click();
    cy.get('[data-testid="add-recipe-form"]', { timeout: 10000 }).should(
      "be.visible"
    );

    // Step 2: Fill out the recipe details
    cy.get('[data-testid="add-recipe-form-title-input"]').type("Recipe title");
    cy.get('[data-testid="add-recipe-form-title-description"]').type(
      "Recipe description"
    );

    // Step 3: Select category
    cy.get('[data-testid="category-select"]', { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="category-select"]').click();
    cy.get(".react-select__menu").find(".react-select__option").first().click();

    // Step 4: Select preparation time
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();

    // Step 5: Add ingredients
    cy.get('[data-testid="ingredients-select"]')
      .click()
      .get(".react-select__menu")
      .find(".react-select__option")
      .first()
      .click();
    cy.get('[data-testid="ingredients.0.quantity"]').type("300g");

    cy.get('[data-testid="add-ingredient-btn"]').click();

    cy.get('[data-testid="ingredients-select"]').click();
    cy.get('[data-testid="ingredients.1.ingredient"]')
      .get(".react-select__menu")
      .find(".react-select__option")
      .eq(2)
      .click();
    cy.get('input[name="ingredients.1.quantity"]').type("1p");

    // Step 6: Add steps
    cy.get('[data-testid="steps.0.step"]').type("First step of the recipe");

    cy.get('[data-testid="add-step-btn"]').click();

    cy.get('[data-testid="steps.1.step"]').type("Second step of the recipe");

    // Click the submit button
    cy.get('[data-testid="add-recipe-submit-btn"]').click();
  });
});

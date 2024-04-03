describe("Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Navigates to the characters page and displays the characters table", () => {
    cy.visit("/discover/episodes");

    // Click on the link to navigate to the episodes page
    cy.get('[data-testid="navigate-to-characters"]').click();

    // Verify the URL is correct
    cy.url().should("include", "/discover/characters");

    // Check for the characters table
    cy.get('[data-testid="characters-table"]').should("be.visible");
  });

  it("Navigates to the episodes page and displays the episodes table", () => {
    // Click on the link to navigate to the episodes page
    cy.get('[data-testid="navigate-to-episodes"]').click();

    // Verify the URL is correct
    cy.url().should("include", "/episodes");

    // Check for the episodes table
    cy.get('[data-testid="episodes-table"]').should("be.visible");
  });

  it("Navigates to the locations page and displays the locations table", () => {
    // Click on the link to navigate to the locations page
    cy.get('[data-testid="navigate-to-locations"]').click();

    // Verify the URL is correct
    cy.url().should("include", "/locations");

    // Check for the locations table
    cy.get('[data-testid="locations-table"]').should("be.visible");
  });
});

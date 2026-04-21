describe("Articles", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="emailOrUsername"]').type(Cypress.env("TEST_EMAIL"));
    cy.get('input[name="password"]').type(Cypress.env("TEST_PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/articles");
  });

  it("affiche la liste des articles", () => {
    cy.get("article").should("have.length.greaterThan", 0);
  });

  it("bascule le tri au clic sur le bouton", () => {
    cy.get("button").contains(/plus récent|plus ancien/i).click();
    cy.url().should("match", /sort=date_asc|sort=date_desc/);
  });

  it("ouvre le détail d'un article au clic", () => {
    cy.get("article").first().click();
    cy.url().should("match", /\/articles\/.+/);
  });
});

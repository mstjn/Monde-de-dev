describe("Authentification", () => {
  it("redirige vers /login si non connecté", () => {
    cy.visit("/articles");
    cy.url().should("include", "/");
  });

  it("affiche une erreur avec des identifiants invalides", () => {
    cy.visit("/login");
    cy.get('input[name="emailOrUsername"]').type("invalide@test.com");
    cy.get('input[name="password"]').type("mauvais");
    cy.get('button[type="submit"]').click();
    cy.get("p").should("exist");
  });

  it("connecte l'utilisateur et redirige vers /articles", () => {
    cy.visit("/login");
    cy.get('input[name="emailOrUsername"]').type(Cypress.env("TEST_EMAIL"));
    cy.get('input[name="password"]').type(Cypress.env("TEST_PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/articles");
  });
});

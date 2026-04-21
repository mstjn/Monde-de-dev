describe("Profil", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="emailOrUsername"]').type(Cypress.env("TEST_EMAIL"));
    cy.get('input[name="password"]').type(Cypress.env("TEST_PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/articles");
    cy.visit("/profile");
  });

  it("affiche le formulaire de profil pré-rempli", () => {
    cy.get('input[name="username"]').should("not.have.value", "");
    cy.get('input[name="email"]').should("not.have.value", "");
  });

  it("affiche les abonnements de l'utilisateur", () => {
    cy.contains("Abonnements").should("exist");
  });
});

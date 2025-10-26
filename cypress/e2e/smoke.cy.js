describe('smoke test', () => {
  beforeEach(()=> {
    cy.visit('/');
  })

  it('la page Accueil charge correctement', () => {
    cy.contains('Il y en a pour tous les gouts').should('be.visible');
  });

  it('verfier le menu de navigation',() => {
    cy.get('[data-cy="nav-link-home"]').should('be.visible');
    cy.get('[data-cy="nav-link-products"]').should('be.visible');
    cy.get('[data-cy="nav-link-reviews"]').should('be.visible');
    cy.get('[data-cy="nav-link-home-logo"]').should('be.visible');
    cy.get('[data-cy="nav-link-login"]').should('be.visible');
    cy.get('[data-cy="nav-link-register"]').should('be.visible');    
  });

  it('le logo ramene a la home',() =>{
    cy.get('[data-cy="nav-link-home-logo"]').click();
    cy.url().should('include','/#/');
    cy.contains('Il y en a pour tous les gouts').should('be.visible');
  });

  it('les 3 produits sont visibles et complets sur la home', () => {
    cy.get('[data-cy="product-home"]').should('have.length',3);
    cy.get('[data-cy="product-home"]').each(($product)=>{
      cy.wrap($product).should('be.visible');
      cy.wrap($product).find('[data-cy="product-home-img"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-home-name"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-home-ingredients"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-home-price"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-home-link"]').should('be.visible');
    });
  });

  it('chaque bouton consulter mene vers la fiche produit', () => {
    cy.get('[data-cy="product-home"]').each((_, i) => {
      cy.get('[data-cy="product-home"]').eq(i).find('[data-cy="product-home-link"]').click();
      cy.url().should('include', '/#/products/');
      cy.visit('/');
      cy.contains('Il y en a pour tous les gouts').should('be.visible');
      cy.get('[data-cy="product-home"]').eq(i).should('be.visible');
    });
  });
})
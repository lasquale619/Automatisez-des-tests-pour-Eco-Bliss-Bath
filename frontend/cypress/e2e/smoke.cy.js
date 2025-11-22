describe('Smoke test sans connexion', () => {
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

  it('Vérifier la présence des champs et boutons de connexion',()=>{
    cy.get('[data-cy="nav-link-login"]').click();
    cy.url().should('include','/#/login');
    cy.get('[data-cy="login-input-username"]').should('be.visible');
    cy.get('[data-cy="login-input-password"]').should('be.visible');
    cy.get('[data-cy="login-submit"]').should('be.visible');
  });    
});

describe('Smoke test quand on est connecté',()=>{
  beforeEach(()=>{
    cy.request('POST', `${Cypress.env('apiUrl')}login`,{
      username: Cypress.env('testEmail'),
      password: Cypress.env('testMDP'),
    }).then((response) => {
      const token = response.body.token;      
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('user', token);
        },
      });
    });
  }); 

  it('Vérifier la présence des boutons ajout au panier quand vous êtes connecté',()=>{
    cy.get('[data-cy="product-home-link"]').first().should('be.visible').click();
    cy.url().should('include','/#/products/');
    cy.get('[data-cy="detail-product-add"]').should('be.visible');
  });
});

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

  it('la section mere nature est visible',()=>{
    cy.get('section#nature').should('be.visible');    
  });

  it('image "mere nature" affiché',()=>{
    cy.get('.image-nature img').should('have.attr','src', 'assets/images/nature.png').should('be.visible');
  });

  it('verfier le h2 de la section mere nature',()=>{
    cy.get('.nature-content h2').should('contain.text', 'Mère Nature').should('be.visible');
  });

  it('verfier les p de la section mere nature',()=>{
    cy.get('.nature-content p').should('have.length.at.least', 3).should('be.visible');
  });

  it('verfier la section nos valeurs',()=>{
    cy.get('#values').should('be.visible');
  });

  it('verifier le titre principale',()=>{
    cy.get('#values h2').should('be.visible');
  });

  it('verfier la liste des valeurs',()=>{
    cy.get('#values .list-values .single-value').should('have.length', 3);
  });

  it('verfier que chaque valeur contient une image, un titre et un texte',()=>{
    cy.get('#values .single-value').each(($el)=>{
      cy.wrap($el).find('img').should('be.visible');
      cy.wrap($el).find('h3').should('be.visible');
      cy.wrap($el).find('p').should('be.visible');
    });
  });

  it('verfier le footer',()=>{
    cy.get('#main-footer').should('be.visible');
  });

  it('verfier le logo dans le footer',()=>{
    cy.get('#main-footer img').should('be.visible').and('have.attr', 'src', 'assets/images/logo-footer.png');
  });

  it('verfier que Le lien du logo redirige vers la page accueil',()=>{
    cy.get('#footer-logo a').should('have.attr', 'href').and('include', '/');
  });
});

describe('smoke test quand on est connecté',()=>{
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

  it('affiche Mon panier et Deconnexion quand on est connecté',()=>{
    cy.get('[data-cy="nav-link-cart"]').should('be.visible');
    cy.get('[data-cy="nav-link-logout"]').should('be.visible');
  });
})
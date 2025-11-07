describe('Tests fonctionnels - Connexion',()=>{
    const username= Cypress.env('testEmail');
    const password= Cypress.env('testMDP');

    beforeEach(()=>{
        cy.visit('/');
    });

    it('le bouton de connexion redirige vers le formulaire',()=>{
        cy.get('[data-cy="nav-link-login"]').click();
        cy.url().should('include','/#/login');
        cy.get('[data-cy="login-input-username"]').should('be.visible');
        cy.get('[data-cy="login-input-password"]').should('be.visible');
        cy.get('[data-cy="login-submit"]').should('be.visible');        
    });

    it('Connexion réussie - affiche le bouton Mon panier dans la barre de navigation après login',()=>{
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type(username);
        cy.get('[data-cy="login-input-password"]').type(password);
        cy.get('[data-cy="login-submit"]').click();
        cy.url().should('include','/#/');
        cy.get('[data-cy="nav-link-cart"]', {timeout:5000}).should('be.visible');
    });
});

describe('Tests fonctionnels - Panier',()=>{
    const base= Cypress.env('apiUrl');
    const username= Cypress.env('testEmail');
    const password= Cypress.env('testMDP');
    let token;
    let productId;
    let StockAvant;

    before(()=>{
        cy.request('POST', `${base}login`,{
            username,
            password,
        }).then((Response)=>{
            token=Response.body.token;
        });
    });

    beforeEach(()=>{
        cy.visit('/',{
            onBeforeLoad(win){
                win.localStorage.setItem('user',token);
            },
        });
    });

    it('le stock doit être supérieur à 1 pour pouvoir être ajouté',()=>{
        cy.get('[data-cy="product-home-link"]').first().should('be.visible').click();
        cy.get('[data-cy="detail-product-stock"]', {timeout:5000}).should('be.visible').and('have.class', 'stock').should(($el)=>{
            const txt = $el.text().trim();
            const m = txt.match(/\d+/);
            expect(m,`Text lu: "${txt}"`).to.not.be.null;
            const stock = parseInt(m[0], 10);
            expect(stock, `Stock extrait de "${txt}"`).to.be.greaterThan(1);
        });        
    });
})
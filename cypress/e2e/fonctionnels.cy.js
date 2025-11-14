describe('Tests fonctionnels - Connexion', () => {
    const username = Cypress.env('testEmail');
    const password = Cypress.env('testMDP');

    beforeEach(() => {
        cy.visit('/');
    });

    it('le bouton de connexion redirige vers le formulaire', () => {
        cy.get('[data-cy="nav-link-login"]').click();
        cy.url().should('include', '/#/login');
        cy.get('[data-cy="login-input-username"]').should('be.visible');
        cy.get('[data-cy="login-input-password"]').should('be.visible');
        cy.get('[data-cy="login-submit"]').should('be.visible');
    });

    it('Connexion réussie - affiche le bouton Mon panier dans la barre de navigation après login', () => {
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type(username);
        cy.get('[data-cy="login-input-password"]').type(password);
        cy.get('[data-cy="login-submit"]').click();
        cy.url().should('include', '/#/');
        cy.get('[data-cy="nav-link-cart"]', { timeout: 5000 }).should('be.visible');
    });
});

describe('Tests fonctionnels - Panier', () => {
    const base = Cypress.env('apiUrl');
    const username = Cypress.env('testEmail');
    const password = Cypress.env('testMDP');
    let token;
    let productId;
    let StockAvant;


    before(() => {
        cy.request('POST', `${base}login`, {
            username,
            password,
        }).then((Response) => {
            token = Response.body.token;
        });
    });

    beforeEach(() => {
        cy.visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('user', token);
            },
        });
        cy.request({
            method: 'GET',
            url: `${base}orders`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            if (Array.isArray(res.body.orderLines) && res.body.orderLines.length > 0) {
                res.body.orderLines.forEach((line) => {
                    cy.request({
                        method: 'DELETE',
                        url: `${base}orders/${line.id}/delete`,
                        headers: { Authorization: `Bearer ${token}` },
                    });
                });
            }
        });
        cy.intercept('PUT', '**/orders/add').as('addtocart');
        cy.intercept('GET', '**/products/4').as('GetProduct4');
        cy.intercept('GET', '**/products/5').as('GetProduct5');
    });


    it('le stock doit être supérieur à 1 pour pouvoir être ajouté', () => {
        cy.visit('/products/4');
        cy.wait('@GetProduct4').then(() => {
            cy.get('[data-cy="detail-product-add"]').click();
            cy.wait('@addtocart').then(() => {
                cy.visit('/cart');
                cy.wait(1000);
                cy.get('[data-cy="cart-empty"]').should('be.visible');
            });

        });


    });

    it('vérifier que le produit a été ajouté au panier', () => {
        cy.visit('/products/5');
        cy.get('[data-cy="detail-product-name"]').should('be.visible');
        cy.get('[data-cy="detail-product-add"]').click();
        cy.visit('/cart');
        cy.get('[data-cy="cart-empty"]').should('not.exist');
        cy.get('[data-cy="cart-line-name"]').should('be.visible');

    });

    it('vérifier que le stock diminue après ajout au panier', () => {
        cy.visit('/products/9');

        cy.get('[data-cy="detail-product-stock"]')
            .should(($el) => {
                const txt = $el.text().replace(/\s+/g, ' ').trim();
                const match = txt.match(/\d+/);
                expect(match, `Texte AVANT lu: "${txt}"`).to.not.be.null;
                StockAvant = parseInt(match[0], 10);
                expect(StockAvant).to.be.greaterThan(1);
            });

        cy.intercept('PUT', '**/orders/add').as('addToCart');
        cy.get('[data-cy="detail-product-add"]').click();
        cy.wait('@addToCart');
        cy.url().should('include', '/cart');
        cy.get('[data-cy="cart-empty"]').should('not.exist');

        cy.visit('/products/9');

        cy.get('[data-cy="detail-product-stock"]')
            .should(($el) => {
                const txt = $el.text().replace(/\s+/g, ' ').trim();
                const match = txt.match(/\d+/);
                expect(match, `Texte APRÈS lu: "${txt}"`).to.not.be.null;

                const StockApres = parseInt(match[0], 10);
                expect(StockApres, `Stock après ajout`).to.eq(StockAvant - 1);
            });

    });

    it('vérifie que on ne peut pas ajouter au panier un produit avec une quantité négative', () => {
        cy.visit('/products/5');
        cy.wait('@GetProduct5').then(() => {
            cy.get('[data-cy="detail-product-quantity"]').clear().type('-5');
            cy.get('[data-cy="detail-product-add"]').click();
            cy.wait('@addtocart').then(() => {
                cy.visit('/cart');
                cy.get('[data-cy="cart-empty"]').should('be.visible');
            });
        });

    });

    it('vérifie que on ne peut pas ajouter au panier un produit avec une quantité > a 20', () => {
        cy.visit('/products/5');
        cy.wait('@GetProduct5').then(() => {
            cy.get('[data-cy="detail-product-quantity"]').clear().type('25');
            cy.get('[data-cy="detail-product-add"]').click();
        });
        cy.wait('@addtocart').then(() => {
            cy.visit('/cart');
            cy.wait(1000)
            cy.get('[data-cy="cart-empty"]').should('be.visible');
        });

    });

})
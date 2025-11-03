describe('Test API',()=>{
    const base= Cypress.env('apiUrl');
    const username= Cypress.env('testEmail');
    const password= Cypress.env('testMDP');
    

    let token;
    let productId;
    

    it('Api doit retourner status 401 pour un utilisateur inconnu',()=>{
        cy.request({
            method : 'POST',
            url : `${base}login`,
            failOnStatusCode : false,
            body :{
                username:'ttt@test.fr',
                password: 'kjnfue',
            },
        }).then((Response)=>{
            expect(Response.status).to.eq(401);
        });
    });

    it('Api doit retourner status 200 et un token pour un utilisateur valide',()=>{
        cy.request({
            method : 'POST',
            url : `${base}login`,
            body :{
                username,
                password,
            },
        }).then((Response)=>{
            expect(Response.status).to.eq(200);
            expect(Response.body).to.have.property('token');
            token=Response.body.token;
        });
    });

    it('Api de recuperation de commande doit retourner status 401 ou 403 pour un utilisateur non authentifié',()=>{
        cy.request({
            method : 'GET',
            url : `${base}orders`,
            failOnStatusCode : false,
            body :{
                username:'ttt@test.fr',
                password: 'kjnfue',
            },
        }).then((Response)=>{
            expect(Response.status).to.eq(401);
        });
    });

    it('Api de recuperation de produits doit retourner une liste de produits',()=>{
        cy.request({
            method : 'GET',
            url : `${base}products`,            
        }).then((Response)=>{
            expect(Response.status).to.eq(200);
            expect(Response.body).to.be.an('array').and.to.have.length.greaterThan(0);
            productId=Response.body[0].id;
        });
    });

    it('Api de recuperation de produits/id doit retourner la fiche du produit demandé',()=>{
        cy.request({
            method : 'GET',
            url : `${base}products`,            
        }).then((Response)=>{
            expect(Response.status).to.eq(200);
            expect(Response.body[0]).to.have.property('id', productId);            
        });
    });

    it('Api de recuperation de commande doit retourner la liste des produits du panier après connexion',()=>{
        cy.request({
            method : 'GET',
            url : `${base}orders`,
            headers :{
                Authorization: `Bearer ${token}`
            },
        }).then((Response)=>{
            expect(Response.status).to.eq(200);
            expect(Response.body).to.be.an('object').and.not.be.empty;
        });
    });

    it('Api pour ajout de commande doit ajouter un produit disponible au panier',()=>{
        cy.request({
            method : 'POST',
            url : `${base}orders/add`,
            headers :{
                Authorization: `Bearer ${token}`
            },
            body : {
                product: productId,
                quantity: 1,
            },
        }).then((Response)=>{
            expect(Response.status).to.eq(200);            
        });
    });

    it('Api pour ajout de commande doit renvoyer une erreur si le produit est en rupture de stock',()=>{
        cy.request({
            method : 'POST',
            url : `${base}orders/add`,
            headers :{
                Authorization: `Bearer ${token}`
            },
            body : {
                product: 3,
                quantity: 5,
            },
        }).then((Response)=>{
            expect(Response.status).to.not.equal(200);            
        });
        
    });

    it('Api pour ajout un avis doit retourner status 200',()=>{
        cy.request({
            method : 'POST',
            url : `${base}reviews`,
            headers :{
                Authorization: `Bearer ${token}`
            },
            body : {
                title: 'super',
                rating: 5,
                comment: 'super produit'
            },
        }).then((Response)=>{
            expect(Response.status).to.eq(200);
            expect(Response.body).to.have.property('id');
            expect(Response.body).to.have.property('date');
            expect(Response.body).to.have.property('title', 'super');
            expect(Response.body).to.have.property('comment');
            expect(Response.body).to.have.property('rating');
            expect(Response.body).to.have.property('author');

        });
    });

})
<div align="center">

# Eco Bliss Bath — Automatisation des tests avec Cypress

![Cypress](https://img.shields.io/badge/Cypress-15-17202C?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?logo=docker&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-13-DD0031?logo=angular&logoColor=white)

</div>

Projet de formation **Testeur logiciel (OpenClassrooms)** : automatiser les tests d'**Eco Bliss Bath**, une boutique en ligne de produits de beauté écoresponsables, avant sa mise en production.

L'application se compose d'un front **Angular**, d'une **API Symfony** et d'une base **MariaDB**, lancées avec Docker.

## Ce que couvrent les tests

**22 tests Cypress**, répartis en trois campagnes :

| Fichier | Tests | Ce qui est vérifié |
|---|---|---|
| [`smoke.cy.js`](frontend/cypress/e2e/smoke.cy.js) | 4 | Chargement de l'accueil, menu de navigation, champs de connexion, boutons « Ajouter au panier » une fois connecté |
| [`api.cy.js`](frontend/cypress/e2e/api.cy.js) | 9 | Connexion (200 + token / 401 utilisateur inconnu), accès au panier sans authentification (401), liste et fiche produit, ajout au panier, produit en rupture de stock, ajout d'un avis |
| [`fonctionnels.cy.js`](frontend/cypress/e2e/fonctionnels.cy.js) | 9 | Parcours de connexion, ajout au panier, baisse du stock après ajout, quantité négative ou supérieure à 20 refusée, cohérence entre l'interface et l'API |

### Bonnes pratiques mises en place

- **Sélecteurs `data-cy`** : les tests ne dépendent ni du style ni de la structure HTML.
- **Connexion par l'API** : le token est récupéré par une requête puis injecté dans le `localStorage`, ce qui évite de repasser par le formulaire à chaque test.
- **Tests indépendants** : le panier est vidé par l'API avant chaque test.
- **Interception réseau** (`cy.intercept`) pour attendre les vraies réponses de l'API au lieu de pauses fixes.
- **Rapport Mochawesome** et **couverture de code** (`@cypress/code-coverage` + nyc).

### Point relevé

Dans l'application, l'ajout au panier passe par `PUT /orders/add`. Une requête `POST` sur ce même endpoint renvoie **405 Method Not Allowed**, ce qui fait échouer les 2 tests API d'ajout au panier.

## Lancer le projet

**Prérequis :** Docker, Node.js et npm.

```bash
git clone https://github.com/lasquale619/Automatisez-des-tests-pour-Eco-Bliss-Bath.git
cd Automatisez-des-tests-pour-Eco-Bliss-Bath

# 1. Base de données + API (http://localhost:8081)
#    Au premier lancement, la base est créée à partir de data/diay0794_ebb.sql
docker compose up -d

# 2. Cypress et ses plugins (à la racine du projet)
npm install

# 3. Front Angular (http://localhost:4200)
cd frontend
npm install
npm start
```

## Exécuter les tests

Depuis le dossier `frontend`, avec l'API et le front démarrés :

```bash
npx cypress open    # mode interactif : choisir « E2E Testing » puis le navigateur
npx cypress run     # toutes les campagnes en ligne de commande
```

Le rapport HTML est généré dans `frontend/mochawesome-report/mochawesome.html`.

Les tests utilisent le compte de démonstration fourni avec la base de données (`test2@test.fr`), configuré dans [`cypress.config.js`](frontend/cypress.config.js).

## Structure

```
├── data/                    # Jeu de données SQL chargé au premier démarrage
├── docker-compose.yml       # MariaDB + API Symfony
├── package.json             # Cypress, Mochawesome, couverture de code
└── frontend/                # Application Angular
    ├── cypress.config.js
    └── cypress/
        ├── e2e/             # smoke, api, fonctionnels
        └── support/
```

## Auteur

**Mohamed Bouguellid** — Testeur QA · [LinkedIn](https://www.linkedin.com/in/mohamed-bouguellid)

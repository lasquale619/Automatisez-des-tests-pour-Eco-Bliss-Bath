<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs
- npm

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/lasquale619/Automatisez-des-tests-pour-Eco-Bliss-Bath
```
```
cd Automatisez-des-tests-pour-Eco-Bliss-Bath
```
Pour démarrer l'API avec cette base de données.
```
docker compose up -d
```
# Pour Installez les dépendances du projet
Rendez-vous dans le dossier frontend
```
cd ./frontend
```

```
npm install 
```
# Démarrer le frontend 
Toujours dans le dossier frontend
```
npm start
``` 
# Installation du plugin code coverage
Pour activer le code coverage, installer le module :

```
npm install --save-dev @cypress/code-coverage
```

# Ouvriri Cypress et lancé les tests
Toujours dans le dossier frontend
```
npx cypress open
```
Puis 

Sélectionner E2E Testing

Choisir le navigateur

Lancer les fichiers de tests souhaités

# Lancer tous les tests en mode Headless 
Si vous voulez exécuter l’intégralité des tests d’un coup
```
npx cypress run
```

# Générer un rapport de tests (Mochawesome)
Dans le dossier frontend
```
npx cypress run --reporter mochawesome
```
Une fois les tests terminés

Rendez-vous dans le dossier 

frontend/mochawesome-report

Ouvrir le fichie le fichier 

mochawesome.html








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

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec ça base de données.
```
docker compose up -d
```
# Pour Installez les dépendances du projet
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
npm i
```
ou
npm install (si vous préférez)
```
# démarrer le frontend 
Toujours dans le dossier frontend
```
npm start
``` 

# Ouvriri Cypress
Toujours dans le dossier frontend
```

npx cypress open
```
Puis 
```

Sélectionner E2E Testing

Choisir le navigateur

Lancer les fichiers de tests souhaités
```
# Générer un rapport de tests (Mochawesome)
npx cypress run --reporter mochawesome
```
A la fin des tests
```
Rendez-vous dans le dossier frontend/mochawesome-report
```
cliquer sur le fichier html
```







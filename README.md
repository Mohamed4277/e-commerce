## Introduction

Back-end e-commerce permet de supprimer/créer/updater et affihcer une liste de produits et enregistrer ces produits dans une base de donnée Mysql.

## Modules necessaires

- nodemon (globalement)
- express
- mysql
- cypress
- et cors

## Créer une base de données sous Mysql

Créer une base de donnée 'produits' et y mettre la table:

> CREATE TABLE produits (
> id int NOT NULL AUTO_INCREMENT,
> name VARCHAR(250),
> description VARCHAR(250),
> prix FLOAT,
> image VARCHAR(250),
> PRIMARY KEY (id)
> );

## Utilisation

- Lancer npm install
- puis nodemon app.js (ou Node app.js)

Utiliser postman pour utiliser l'API

## Introduction

Cette API e-commerce permet de supprimer/créer/updater et affihcerune liste de produits et enregistrer ces produits dans une base de donnée Mysql.

## Modules necessaires

- nodemon (globalement)
- express
- mysql
- cypress
- et cors
- express-session
- lodash
- jest
- supertest

## Créer une base de données sous Mysql

Créer une base de donnée 'produits' et y mettre les tables:

> CREATE TABLE produits (
> id int NOT NULL AUTO_INCREMENT,
> name VARCHAR(250),
> description VARCHAR(250),
> prix FLOAT,
> image VARCHAR(250),
> PRIMARY KEY (id)
> );

> CREATE TABLE `clients` (
> `id` int NOT NULL AUTO_INCREMENT,
> `uuid` varchar(45) DEFAULT NULL,
> `name` varchar(45) DEFAULT NULL,
> `familly_name` varchar(45) DEFAULT NULL,
> `password` longtext NOT NULL,
> `role` varchar(45) DEFAULT 'Client',
> `email` varchar(45) DEFAULT NULL,
> PRIMARY KEY (`id`)
> );

> CREATE TABLE `orders` (
> `id` int NOT NULL AUTO_INCREMENT,
> `client_id` int NOT NULL,
> `product_id` int NOT NULL,
> `quantity` int NOT NULL,
> PRIMARY KEY (`id`),
> KEY `orders_ibfk_1` (`client_id`),
> KEY `orders_ibfk_2` (`product_id`),
> CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
> CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
> )

## Utilisation

- Lancer npm install
- puis nodemon app.js (ou Node app.js)
- Utiliser postman pour requeter

## Lancer les tests

npm test

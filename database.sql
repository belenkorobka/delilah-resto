CREATE DATABASE delilah;

USE delilah;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255),
    price FLOAT(16) 
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(32),
    phone VARCHAR(16),
    address VARCHAR(16),
    roles_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id)
);

CREATE TABLE statuses(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date DATETIME,
    total_price FLOAT,
    payment VARCHAR(255),
    statuses_id INT,
    users_id INT,
    FOREIGN KEY (statuses_id) REFERENCES statuses(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE orders_products(
    orders_id INT,
    products_id INT,
    amount INT,
    FOREIGN KEY (orders_id) REFERENCES orders(id),
    FOREIGN KEY (products_id) REFERENCES products(id)
);

INSERT INTO products VALUES (NULL, 'HamClas', 'Hamburguesa clásica', 350);
INSERT INTO products VALUES (NULL, 'BagSal', 'Bagel de Salmón', 425);
INSERT INTO products VALUES (NULL, 'SandVegg', 'Sandwich veggie', 310);
INSERT INTO products VALUES (NULL, 'EnsVegg', 'Ensalada veggie', 340);
INSERT INTO products VALUES (NULL, 'Veggie', 'Veggie avocado', 410);
INSERT INTO products VALUES (NULL, 'Focaccia', 'Focaccia', 300);
INSERT INTO products VALUES (NULL, 'SandFoc', 'Sandwich Focaccia', 440);
INSERT INTO products VALUES (NULL, 'Agua', 'Agua', 90);
INSERT INTO products VALUES (NULL, 'Cok', 'Coca Cola', 120);

INSERT INTO roles VALUES (NULL, 'admin');
INSERT INTO roles VALUES (NULL, 'user');

INSERT INTO users VALUES (NULL, 'Belén Korobka', 'belenkorobka', 'belenkorobka@gmail.com', '123456', '123456789', 'La Plata', 1);
INSERT INTO users VALUES (NULL, 'María Perez', 'mariaperez', 'mariaperez@gmail.com', '123456', '123456789', 'CABA', 2);

INSERT INTO statuses VALUES (NULL, 'Nuevo');
INSERT INTO statuses VALUES (NULL, 'Confirmado');
INSERT INTO statuses VALUES (NULL, 'Preparando');
INSERT INTO statuses VALUES (NULL, 'Enviando');
INSERT INTO statuses VALUES (NULL, 'Entregado');
INSERT INTO statuses VALUES (NULL, 'Cancelado');

INSERT INTO orders VALUES (NULL, '2021/07/10 00:00:00', 1550, 'efectivo', 1, 2);

INSERT INTO orders_products VALUES (1, 5, 2);
INSERT INTO orders_products VALUES (1, 1, 1);
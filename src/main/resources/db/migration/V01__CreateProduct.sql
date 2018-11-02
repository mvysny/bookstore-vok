create TABLE Product (
  id   int auto_increment PRIMARY KEY,
  PRODUCT_NAME varchar(200) NOT NULL,
  price decimal(20, 2),
  STOCK_COUNT int,
  availability varchar(20) not null
);
create UNIQUE INDEX idx_product_name
  ON Product (PRODUCT_NAME);

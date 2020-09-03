create TABLE Product (
  id   int auto_increment PRIMARY KEY not null,
  PRODUCT_NAME varchar(200) NOT NULL,
  price decimal(20, 2),
  STOCK_COUNT int,
  availability varchar(20) not null
);

create INDEX idx_product_name
  ON Product (PRODUCT_NAME);

create INDEX idx_price
  ON Product (price);

create INDEX idx_stock_count
  ON Product (STOCK_COUNT);

create INDEX idx_availability
  ON Product (availability);

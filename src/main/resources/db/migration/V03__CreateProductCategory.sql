create TABLE Product_Category (
  product_id   int not null references Product(ID),
  category_id int not null references Category(ID)
);

create TABLE Product_Category (
  product_id   int not null references Product(ID),
  category_id int not null references Category(ID)
);
create index pc_product on Product_Category(product_id);
create index pc_cat on Product_Category(category_id);

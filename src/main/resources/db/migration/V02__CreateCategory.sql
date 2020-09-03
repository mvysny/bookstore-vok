create TABLE Category (
  id   int auto_increment PRIMARY KEY not null,
  NAME varchar(200) NOT NULL
);
create UNIQUE INDEX idx_category_name
  ON Category (NAME);

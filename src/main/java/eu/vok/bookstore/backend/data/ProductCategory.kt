package eu.vok.bookstore.backend.data

import com.github.vokorm.DaoOfAny
import com.github.vokorm.Table
import com.github.vokorm.db

@Table("Product_Category")
data class ProductCategory(var product_id: Int? = null, var category_id: Int? = null) {
    companion object : DaoOfAny<ProductCategory> {
        fun deleteForCategory(catId: Int) {
            db {
                con.createQuery("DELETE FROM Product_Category WHERE category_id = :id")
                        .addParameter("id", catId)
                        .executeUpdate()
            }
        }

        fun deleteForProduct(id: Int) {
            db {
                con.createQuery("DELETE FROM Product_Category WHERE product_id = :id")
                        .addParameter("id", id)
                        .executeUpdate()
            }
        }
    }
}

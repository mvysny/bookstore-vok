package eu.vok.bookstore.backend.data

import com.github.vokorm.db
import com.gitlab.mvysny.jdbiorm.DaoOfAny
import com.gitlab.mvysny.jdbiorm.Table

/**
 * A join table, to maintain many-to-many relationship between [Category] and [Product].
 */
@Table("Product_Category")
data class ProductCategory(var product_id: Int? = null, var category_id: Int? = null) {
    companion object : DaoOfAny<ProductCategory>(ProductCategory::class.java) {
        fun deleteForCategory(catId: Int) {
            db {
                handle.createUpdate("DELETE FROM Product_Category WHERE category_id = :id")
                        .bind("id", catId)
                        .execute()
            }
        }

        fun deleteForProduct(id: Int) {
            db {
                handle.createUpdate("DELETE FROM Product_Category WHERE product_id = :id")
                        .bind("id", id)
                        .execute()
            }
        }
    }
}

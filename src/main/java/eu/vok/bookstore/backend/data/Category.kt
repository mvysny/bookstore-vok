package eu.vok.bookstore.backend.data

import com.github.vokorm.KEntity
import com.github.vokorm.db
import com.gitlab.mvysny.jdbiorm.Dao
import java.io.Serializable

import javax.validation.constraints.NotNull

data class Category(
        override var id: Int? = null,

        @field:NotNull
        var name: String? = null
) : KEntity<Int>, Serializable {
    override fun delete() {
        db {
            ProductCategory.deleteForCategory(id!!)
            super.delete()
        }
    }

    companion object : Dao<Category, Int>(Category::class.java) {

        fun getAllForProduct(id: Int): List<Category> = db {
            handle.createQuery("SELECT c.id, c.name FROM Category c, Product_Category pc WHERE c.id = pc.category_id and pc.product_id = :id")
                    .bind("id", id)
                    .map(rowMapper).list()
        }
    }
}

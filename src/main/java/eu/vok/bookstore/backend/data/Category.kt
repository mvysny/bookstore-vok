package eu.vok.bookstore.backend.data

import com.github.vokorm.Dao
import com.github.vokorm.Entity
import com.github.vokorm.db
import java.io.Serializable

import javax.validation.constraints.NotNull

data class Category(
        override var id: Int? = null,

        @field:NotNull
        var name: String? = null
) : Entity<Int>, Serializable {
    override fun delete() {
        db {
            ProductCategory.deleteForCategory(id!!)
            super.delete()
        }
    }

    companion object : Dao<Category> {

        fun getAllForProduct(id: Int): List<Category> = db {
            con.createQuery("SELECT c.id, c.name FROM Category c, Product_Category pc WHERE c.id = pc.category_id and pc.product_id = :id")
                    .addParameter("id", id)
                    .executeAndFetch(Category::class.java)
        }
    }
}

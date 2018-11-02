package eu.vok.bookstore.backend.data

import com.github.vokorm.As
import com.github.vokorm.Dao
import com.github.vokorm.Entity
import com.github.vokorm.db
import java.io.Serializable
import java.math.BigDecimal

import javax.validation.constraints.Min
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class Product(
        override var id: Int? = null,

        @field:NotNull
        @field:Size(min = 2, message = "Product name must have at least two characters")
        @As("PRODUCT_NAME")
        var productName: String = "",

        @field:Min(0)
        var price: BigDecimal = BigDecimal.ZERO,

        @field:Min(value = 0, message = "Can't have negative amount in stock")
        @As("STOCK_COUNT")
        var stockCount: Int? = 0,

        @field:NotNull
        var availability: Availability = Availability.COMING
) : Entity<Int>, Serializable {
    val isNewProduct: Boolean
        get() = id == null

    var category: Set<Category>
    get() = if (id == null) emptySet() else Category.getAllForProduct(id!!).toSet()
    set(value) {
        if (id != null) {
            db {
                ProductCategory.deleteForProduct(id!!)
                for (category in value) {
                    con.createQuery("INSERT INTO Product_Category (product_id, category_id) values(:pid, :cid)")
                            .addParameter("pid", id!!)
                            .addParameter("cid", category.id!!)
                            .executeUpdate()
                }
            }
        }
    }

    override fun delete() {
        db {
            ProductCategory.deleteForProduct(id!!)
            super.delete()
        }
    }

    companion object : Dao<Product>
}

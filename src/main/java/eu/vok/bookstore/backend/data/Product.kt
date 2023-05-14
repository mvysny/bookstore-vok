package eu.vok.bookstore.backend.data

import com.github.vokorm.*
import com.gitlab.mvysny.jdbiorm.Dao
import org.jdbi.v3.core.mapper.reflect.ColumnName
import java.math.BigDecimal

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

data class Product(
        override var id: Int? = null,

        @field:NotNull
        @field:Size(min = 2, message = "Product name must have at least two characters")
        @field:ColumnName("PRODUCT_NAME")
        var productName: String = "",

        @field:Min(0)
        var price: BigDecimal = BigDecimal.ZERO,

        @field:Min(value = 0, message = "Can't have negative amount in stock")
        @field:ColumnName("STOCK_COUNT")
        var stockCount: Int? = 0,

        @field:NotNull
        var availability: Availability = Availability.COMING
) : KEntity<Int> {
    val isNewProduct: Boolean
        get() = id == null

    var category: Set<Category>
    get() = if (id == null) emptySet() else Category.getAllForProduct(id!!).toSet()
    set(value) {
        if (id != null) {
            db {
                ProductCategory.deleteForProduct(id!!)
                for (category in value) {
                    handle.createUpdate("INSERT INTO Product_Category (product_id, category_id) values(:pid, :cid)")
                            .bind("pid", id!!)
                            .bind("cid", category.id!!)
                            .execute()
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

    companion object : Dao<Product, Int>(Product::class.java)
}

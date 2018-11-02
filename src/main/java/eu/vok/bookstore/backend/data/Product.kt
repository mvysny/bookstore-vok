package eu.vok.bookstore.backend.data

import java.io.Serializable
import java.math.BigDecimal

import javax.validation.constraints.Min
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

class Product : Serializable {

    @field:NotNull
    var id = -1
    @field:NotNull
    @field:Size(min = 2, message = "Product name must have at least two characters")
    var productName = ""
    @field:Min(0)
    var price = BigDecimal.ZERO
    var category: Set<Category>? = null
    @field:Min(value = 0, message = "Can't have negative amount in stock")
    var stockCount = 0
    @field:NotNull
    var availability = Availability.COMING

    val isNewProduct: Boolean
        get() = id == -1

}

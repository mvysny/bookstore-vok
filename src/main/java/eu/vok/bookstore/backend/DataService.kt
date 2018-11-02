package eu.vok.bookstore.backend

import java.io.Serializable

import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product
import eu.vok.bookstore.backend.mock.VokORMDataService

/**
 * Back-end service interface for retrieving and updating product data.
 */
@Deprecated("inline")
interface DataService : Serializable {

    @Deprecated("Use EntityDataProvider")
    fun getAllProducts(): Collection<Product>

    @Deprecated("Use EntityDataProvider")
    fun getAllCategories(): Collection<Category>

    fun updateProduct(p: Product)

    fun deleteProduct(productId: Int)

    fun getProductById(productId: Int): Product?

    companion object {
        fun get(): DataService = VokORMDataService
    }
}

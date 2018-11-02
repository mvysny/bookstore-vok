package eu.vok.bookstore.backend.mock

import com.github.vokorm.deleteById
import com.github.vokorm.findAll
import com.github.vokorm.findById
import eu.vok.bookstore.backend.DataService
import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product

/**
 * Mock data model. This implementation has very simplistic locking and does not
 * notify users of modifications.
 */
object VokORMDataService : DataService {

    override fun getAllProducts(): List<Product> = Product.findAll()

    override fun getAllCategories(): List<Category> = Category.findAll()

    override fun updateProduct(p: Product) {
        p.save()
    }

    override fun getProductById(productId: Int): Product? {
        return Product.findById(productId)
    }

    override fun deleteProduct(productId: Int) {
        Product.deleteById(productId)
    }
}

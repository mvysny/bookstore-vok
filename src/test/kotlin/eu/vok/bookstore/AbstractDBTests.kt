package eu.vok.bookstore

import com.github.vokorm.db
import eu.vok.bookstore.authentication.User
import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product
import eu.vok.bookstore.backend.data.ProductCategory
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach

/**
 * Makes sure that the database is initialized and cleared before every test is run.
 * You can now create your own instances of [Product] and [Category] right from the test.
 */
abstract class AbstractDBTests {
    companion object {
        @JvmStatic @BeforeAll fun startApp() { Bootstrap().contextInitialized(null) }
        @JvmStatic @AfterAll fun stopApp() { User.deleteAll(); Bootstrap().contextDestroyed(null) }
    }

    // it's a good practice to clear up the db before every test, to start every test with a predefined state.
    @BeforeEach @AfterEach
    fun cleanupDb() {
        db { ProductCategory.deleteAll() }
        Product.deleteAll()
        Category.deleteAll()
    }
}

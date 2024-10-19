package eu.vok.bookstore.backend.data

import com.github.mvysny.dynatest.DynaTest
import com.github.mvysny.kaributesting.v10.expectList
import eu.vok.bookstore.AbstractDBTests
import eu.vok.bookstore.usingDB
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.expect

class ProductTest : AbstractDBTests() {
    lateinit var cat1: Category
    lateinit var cat2: Category
    @BeforeEach fun createTestCategories() {
        cat1 = Category(name = "cat1").apply { save() }
        cat2 = Category(name = "cat2").apply { save() }
    }

    @Nested inner class `product-category binding` {
        @Test fun `by default Product has no categories`() {
            val p = Product(productName = "foo").apply { save() }
            expectList() { p.category.toList() }
        }

        @Test fun `Product retains its category`() {
            val p = Product(productName = "foo").apply { save() }
            p.category = setOf(cat1)
            expectList(cat1) { p.category.toList() }
        }


        @Test fun `Product retains all of its categories`() {
            val p = Product(productName = "foo").apply { save() }
            p.category = setOf(cat1, cat2)
            expectList(cat1, cat2) { p.category.toList() }
        }

        @Test fun `Deleting a product detaches the categories`() {
            val p = Product(productName = "foo").apply { save() }
            p.category = setOf(cat1, cat2)
            p.delete()
            expect(0) { ProductCategory.count() }
        }
    }
}

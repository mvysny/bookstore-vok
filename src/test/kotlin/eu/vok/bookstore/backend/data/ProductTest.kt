package eu.vok.bookstore.backend.data

import com.github.mvysny.dynatest.DynaTest
import com.github.mvysny.kaributesting.v10.expectList
import eu.vok.bookstore.usingDB
import kotlin.test.expect

class ProductTest : DynaTest({
    usingDB()

    lateinit var cat1: Category
    lateinit var cat2: Category
    beforeEach {
        cat1 = Category(name = "cat1").apply { save() }
        cat2 = Category(name = "cat2").apply { save() }
    }

    group("product-category binding") {
        test("by default Product has no categories") {
            val p = Product(productName = "foo").apply { save() }
            expectList() { p.category.toList() }
        }

        test("Product retains its category") {
            val p = Product(productName = "foo").apply { save() }
            p.category = setOf(cat1)
            expectList(cat1) { p.category.toList() }
        }


        test("Product retains all of its categories") {
            val p = Product(productName = "foo").apply { save() }
            p.category = setOf(cat1, cat2)
            expectList(cat1, cat2) { p.category.toList() }
        }

        test("Deleting a product detaches the categories") {
            val p = Product(productName = "foo").apply { save() }
            p.category = setOf(cat1, cat2)
            p.delete()
            expect(0) { ProductCategory.count() }
        }
    }
})

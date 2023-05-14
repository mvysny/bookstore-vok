package eu.vok.bookstore.backend.data

import com.github.mvysny.dynatest.DynaTest
import com.github.mvysny.kaributesting.v10.expectList
import eu.vok.bookstore.usingDB
import kotlin.test.expect

class CategoryTest : DynaTest({
    usingDB()
    test("smoke") {
        Category.getAllForProduct(2)
    }
})

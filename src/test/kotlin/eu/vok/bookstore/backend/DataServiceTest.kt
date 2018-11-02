package eu.vok.bookstore.backend

import com.github.mvysny.dynatest.DynaTest
import eu.vok.bookstore.backend.mock.MockDataService
import eu.vok.bookstore.usingDB
import kotlin.test.expect

/**
 * Simple unit test for the back-end data service.
 */
class DataServiceTest : DynaTest({
    usingDB()

    lateinit var service: DataService
    beforeEach { service = MockDataService.getInstance() }

    test("DataServiceCanFetchProducts") {
        expect(false) { service.allProducts.isEmpty() }
    }

    test("DataServiceCanFetchCategories") {
        expect(false) { service.allCategories.isEmpty() }
    }

    test("UpdateProduct_updatesTheProduct") {
        val p = service.allProducts.first()
        p.productName = "My Test Name"
        service.updateProduct(p)
        val p2 = service.allProducts.first()
        expect("My Test Name") { p2.productName }
    }
})

package eu.vok.bookstore.backend

import com.github.mvysny.dynatest.DynaTest
import eu.vok.bookstore.backend.mock.MockDataService
import kotlin.test.expect

/**
 * Simple unit test for the back-end data service.
 */
class DataServiceTest : DynaTest({

    lateinit var service: DataService
    beforeEach { service = MockDataService.getInstance() }

    test("DataServiceCanFetchProducts") {
        expect(false) { service.allProducts.isEmpty() }
    }

    test("DataServiceCanFetchCategories") {
        expect(false) { service.allCategories.isEmpty() }
    }

    test("UpdateProduct_updatesTheProduct") {
        val p = service.allProducts.iterator().next()
        p.productName = "My Test Name"
        service.updateProduct(p)
        val p2 = service.allProducts.iterator().next()
        expect("My Test Name") { p2.productName }
    }
})

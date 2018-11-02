package eu.vok.bookstore.backend

import com.github.mvysny.dynatest.DynaTest
import eu.vok.bookstore.backend.mock.MockDataGenerator
import eu.vok.bookstore.backend.mock.VokORMDataService
import eu.vok.bookstore.usingDB
import kotlin.test.expect

/**
 * Simple unit test for the back-end data service.
 */
class DataServiceTest : DynaTest({
    usingDB()

    lateinit var service: DataService
    beforeEach { service = VokORMDataService; MockDataGenerator.generate() }

    test("DataServiceCanFetchProducts") {
        expect(false) { service.getAllProducts().isEmpty() }
    }

    test("DataServiceCanFetchCategories") {
        expect(false) { service.getAllCategories().isEmpty() }
    }

    test("UpdateProduct_updatesTheProduct") {
        val p = service.getAllProducts().first()
        p.productName = "My Test Name"
        service.updateProduct(p)
        val p2 = service.getAllProducts().first()
        expect("My Test Name") { p2.productName }
    }
})

package eu.vok.bookstore

import com.github.karibu.testing.v10.*
import com.github.mvysny.dynatest.DynaNodeGroup
import com.github.vokorm.db
import com.github.vokorm.deleteAll
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.textfield.PasswordField
import com.vaadin.flow.component.textfield.TextField
import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product
import eu.vok.bookstore.crud.SampleCrudView

fun DynaNodeGroup.usingDB() {
    beforeGroup { Bootstrap().contextInitialized(null) }
    afterGroup { Bootstrap().contextDestroyed(null) }

    // it's a good practice to clear up the db before every test, to start every test with a predefined state.
    fun cleanupDb() {
        db { con.createQuery("DELETE FROM Product_Category").executeUpdate() }
        Product.deleteAll()
        Category.deleteAll()
    }
    beforeEach { cleanupDb() }
    afterEach { cleanupDb() }
}

fun DynaNodeGroup.usingUI(loginAs: String? = "user") {
    usingDB()

    beforeEach {
        MockVaadin.setup(routes = Routes().autoDiscoverViews("eu.vok.bookstore"))
        if (loginAs != null) {
            _get<TextField> { id = "username" }._value = loginAs
            _get<PasswordField> { id = "password" }._value = loginAs
            _get<Button> { caption = "Login" }._click()
            // expect that a successful login navigates to SampleCrudView
            _get<SampleCrudView>()
        }
    }
    afterEach { MockVaadin.tearDown() }
}

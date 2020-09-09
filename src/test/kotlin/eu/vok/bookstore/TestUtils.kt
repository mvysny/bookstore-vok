package eu.vok.bookstore

import com.github.mvysny.kaributesting.v10.*
import com.github.mvysny.dynatest.DynaNodeGroup
import com.github.vokorm.db
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.login.LoginForm
import com.vaadin.flow.component.textfield.PasswordField
import com.vaadin.flow.component.textfield.TextField
import eu.vok.bookstore.authentication.LoginView
import eu.vok.bookstore.authentication.User
import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product
import eu.vok.bookstore.backend.data.ProductCategory
import eu.vok.bookstore.crud.SampleCrudView

/**
 * Makes sure that the database is initialized and cleared before every test is ran.
 * You can now create your own instances of [Product] and [Category] right from the test.
 */
fun DynaNodeGroup.usingDB() {
    beforeGroup { Bootstrap().contextInitialized(null) }
    afterGroup { User.deleteAll(); Bootstrap().contextDestroyed(null) }

    // it's a good practice to clear up the db before every test, to start every test with a predefined state.
    fun cleanupDb() {
        db { ProductCategory.deleteAll() }
        Product.deleteAll()
        Category.deleteAll()
    }
    beforeEach { cleanupDb() }
    afterEach { cleanupDb() }
}

/**
 * Makes sure that the database is initialized (calls [usingDB]). Moreover, makes sure that Vaadin is properly mocked
 * and optionally given user is logged in (when [loginAs] is not null).
 */
fun DynaNodeGroup.usingUI(loginAs: String? = "user") {
    usingDB()

    lateinit var routes: Routes
    beforeGroup {
        routes = Routes().autoDiscoverViews("eu.vok.bookstore")
        routes.errorRoutes.remove(MockRouteNotFoundError::class.java)
    }

    beforeEach {
        MockVaadin.setup(routes)
        if (loginAs != null) {
            _get<LoginForm>()._login(loginAs, loginAs)
            // expect that a successful login navigates to SampleCrudView
            _get<SampleCrudView>()
        }
    }
    afterEach { MockVaadin.tearDown() }
}

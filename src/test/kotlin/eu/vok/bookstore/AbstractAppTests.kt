package eu.vok.bookstore

import com.github.mvysny.kaributesting.v10.MockRouteNotFoundError
import com.github.mvysny.kaributesting.v10.MockVaadin
import com.github.mvysny.kaributesting.v10.Routes
import com.github.mvysny.kaributesting.v10._get
import com.github.mvysny.kaributesting.v10._login
import com.vaadin.flow.component.login.LoginForm
import eu.vok.bookstore.crud.SampleCrudView
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach

/**
 * Makes sure that the database is initialized (calls [usingDB]). Moreover, makes sure that Vaadin is properly mocked
 * and optionally given user is logged in (when [loginAs] is not null).
 */
abstract class AbstractAppTests(val loginAs: String? = "user") :
    AbstractDBTests() {
    companion object {
        private lateinit var routes: Routes

        @JvmStatic
        @BeforeAll
        fun scanRoutes() {
            routes = Routes().autoDiscoverViews("eu.vok.bookstore")
            routes.errorRoutes.remove(MockRouteNotFoundError::class.java)
        }
    }

    @BeforeEach
    fun setupVaadin() {
        MockVaadin.setup(routes)
        if (loginAs != null) {
            _get<LoginForm>()._login(loginAs, loginAs)
            // expect that a successful login navigates to SampleCrudView
            _get<SampleCrudView>()
        }
    }

    @AfterEach
    fun tearDownVaadin() {
        MockVaadin.tearDown()
    }
}
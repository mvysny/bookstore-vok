package eu.vok.bookstore.authentication

import com.github.mvysny.kaributesting.v10.*
import com.github.mvysny.dynatest.DynaTest
import com.vaadin.flow.component.UI
import eu.vok.bookstore.AbstractAppTests
import eu.vok.bookstore.crud.SampleCrudView
import eu.vok.bookstore.usingUI
import org.junit.jupiter.api.Test

class LoginScreenTest : AbstractAppTests(null) {
    @Test fun `the app is protected by the login screen`() {
        UI.getCurrent().navigate(SampleCrudView::class.java)
        _get<LoginView>()
    }
}

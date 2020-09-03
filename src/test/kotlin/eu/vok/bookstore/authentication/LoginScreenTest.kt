package eu.vok.bookstore.authentication

import com.github.mvysny.kaributesting.v10.*
import com.github.mvysny.dynatest.DynaTest
import com.vaadin.flow.component.UI
import eu.vok.bookstore.crud.SampleCrudView
import eu.vok.bookstore.usingUI

/**
 * @author mavi
 */
class LoginScreenTest : DynaTest({
    usingUI(loginAs = null)

    test("the app is protected by the login screen") {
        UI.getCurrent().navigate(SampleCrudView::class.java)
        _get<LoginView>()
    }
})

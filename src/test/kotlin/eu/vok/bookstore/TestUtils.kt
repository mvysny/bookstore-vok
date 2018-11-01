package eu.vok.bookstore

import com.github.karibu.testing.v10.*
import com.github.mvysny.dynatest.DynaNodeGroup
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.textfield.PasswordField
import com.vaadin.flow.component.textfield.TextField
import eu.vok.bookstore.crud.SampleCrudView

fun DynaNodeGroup.usingUI(loginAs: String? = "user") {
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

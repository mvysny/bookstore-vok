package eu.vok.bookstore.about

import com.github.karibu.testing.v10._get
import com.github.karibu.testing.v10.textContains
import com.github.mvysny.dynatest.DynaTest
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.html.Span
import eu.vok.bookstore.usingUI

class AboutViewTest : DynaTest({
    usingUI()

    test("smoke") {
        UI.getCurrent().navigate(AboutView::class.java)
        _get<Span> { textContains("This application is using Vaadin Flow") }
    }
})

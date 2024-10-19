package eu.vok.bookstore.about

import com.github.mvysny.kaributesting.v10.*
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.html.Span
import eu.vok.bookstore.AbstractAppTests
import org.junit.jupiter.api.Test

class AboutViewTest : AbstractAppTests() {
    @Test fun smoke() {
        UI.getCurrent().navigate(AboutView::class.java)
        _get<Span> { textContains("This application is running on Vaadin") }
    }
}

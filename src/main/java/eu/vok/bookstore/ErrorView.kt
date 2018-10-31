package eu.vok.bookstore

import com.github.vok.karibudsl.flow.h1
import com.github.vok.karibudsl.flow.span
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.*
import javax.servlet.http.HttpServletResponse

/**
 * View shown when trying to navigate to a view that does not exist using
 */
@ParentLayout(MainLayout::class)
class ErrorView : VerticalLayout(), HasErrorParameter<NotFoundException> {

    private val explanation: Span

    init {
        h1("The view could not be found.")
        explanation = span()
    }

    override fun setErrorParameter(event: BeforeEnterEvent, parameter: ErrorParameter<NotFoundException>): Int {
        explanation.text = ("Could not navigate to '${event.location.path}'.")
        return HttpServletResponse.SC_NOT_FOUND
    }
}

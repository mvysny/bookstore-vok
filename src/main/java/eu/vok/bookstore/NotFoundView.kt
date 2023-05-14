package eu.vok.bookstore

import com.github.mvysny.karibudsl.v10.KComposite
import com.github.mvysny.karibudsl.v10.h1
import com.github.mvysny.karibudsl.v10.span
import com.github.mvysny.karibudsl.v10.verticalLayout
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.router.*
import jakarta.servlet.http.HttpServletResponse

/**
 * View shown when trying to navigate to a view that does not exist using
 */
@ParentLayout(MainLayout::class)
class NotFoundView : KComposite(), HasErrorParameter<NotFoundException> {

    private lateinit var explanation: Span
    private val root = ui {
        verticalLayout {
            h1("The view could not be found.")
            explanation = span()
        }
    }

    override fun setErrorParameter(event: BeforeEnterEvent, parameter: ErrorParameter<NotFoundException>): Int {
        explanation.text = ("Could not navigate to '${event.location.path}'.")
        return HttpServletResponse.SC_NOT_FOUND
    }
}

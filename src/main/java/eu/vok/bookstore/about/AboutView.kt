package eu.vok.bookstore.about

import com.github.mvysny.karibudsl.v10.*
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.Version
import eu.vaadinonkotlin.security.AllowAllUsers
import eu.vok.bookstore.MainLayout

@Route(value = "About", layout = MainLayout::class)
@PageTitle("About")
@AllowAllUsers
class AboutView : KComposite() {
    private val root = ui {
        horizontalLayout {
            setSizeFull()
            content { align(center, middle) }

            icon(VaadinIcon.INFO_CIRCLE)
            span(" This application is using Vaadin Flow ${Version.getFullVersion()}.")
        }
    }

    companion object {
        val VIEW_NAME = "About"
    }
}

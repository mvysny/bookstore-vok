package eu.vok.bookstore.about

import com.github.mvysny.karibudsl.v10.content
import com.github.mvysny.karibudsl.v10.icon
import com.github.mvysny.karibudsl.v10.span
import com.github.vok.security.AllowAllUsers
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.Version
import eu.vok.bookstore.MainLayout

@Route(value = "About", layout = MainLayout::class)
@PageTitle("About")
@AllowAllUsers
class AboutView : HorizontalLayout() {
    init {
        setSizeFull()
        content { align(center, middle) }

        icon(VaadinIcon.INFO_CIRCLE)
        span(" This application is using Vaadin Flow ${Version.getFullVersion()}.")
    }

    companion object {
        val VIEW_NAME = "About"
    }
}

package eu.vok.bookstore.about

import com.github.mvysny.karibudsl.v10.*
import com.github.mvysny.kaributools.VaadinVersion
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import eu.vok.bookstore.MainLayout
import jakarta.annotation.security.PermitAll

@Route(value = "about", layout = MainLayout::class)
@PageTitle("About")
@PermitAll
class AboutView : KComposite() {
    private val root = ui {
        horizontalLayout {
            setSizeFull()
            content { align(center, middle) }

            icon(VaadinIcon.INFO_CIRCLE)
            span(" This application is running on Vaadin ${VaadinVersion.get}.")
        }
    }
}

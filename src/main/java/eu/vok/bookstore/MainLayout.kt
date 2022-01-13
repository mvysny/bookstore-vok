package eu.vok.bookstore

import com.github.mvysny.karibudsl.v10.KComposite
import com.github.mvysny.karibudsl.v10.flexLayout
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.router.RouterLayout
import eu.vok.bookstore.about.AboutView
import eu.vok.bookstore.crud.SampleCrudView

/**
 * The layout of the pages e.g. About and Inventory.
 */
class MainLayout : KComposite(), RouterLayout {
    private val root = ui {
        flexLayout {
            setSizeFull(); className = "main-layout"

            menu {
                addView(SampleCrudView::class, "Inventory", VaadinIcon.EDIT)
                addView(AboutView::class, "About", VaadinIcon.INFO_CIRCLE)
            }
        }
    }
}

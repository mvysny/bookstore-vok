package eu.vok.bookstore

import com.vaadin.flow.component.dependency.StyleSheet
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.router.RouterLayout
import com.vaadin.flow.theme.Theme
import com.vaadin.flow.theme.lumo.Lumo
import eu.vok.bookstore.about.AboutView
import eu.vok.bookstore.crud.SampleCrudView

/**
 * The layout of the pages e.g. About and Inventory.
 */
@StyleSheet("css/shared-styles.css")
@Theme(value = Lumo::class, variant = Lumo.DARK)
class MainLayout : FlexLayout(), RouterLayout {
    init {
        setSizeFull(); className = "main-layout"

        menu {
            addView(SampleCrudView::class, SampleCrudView.VIEW_NAME, VaadinIcon.EDIT)
            addView(AboutView::class, AboutView.VIEW_NAME, VaadinIcon.INFO_CIRCLE)
        }
    }
}

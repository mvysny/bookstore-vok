package eu.vok.bookstore

import com.github.mvysny.karibudsl.v10.*
import com.github.mvysny.kaributools.toggle
import com.vaadin.flow.component.Component
import com.vaadin.flow.component.HasComponents
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.ButtonVariant
import com.vaadin.flow.component.icon.Icon
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.tabs.Tabs
import com.vaadin.flow.server.VaadinServletService
import com.vaadin.flow.server.VaadinSession
import kotlin.reflect.KClass

class Menu : KComposite() {
    private lateinit var tabs: Tabs

    private val root = ui {
        flexLayout {
            className = "menu-bar"

            // Button for toggling the menu visibility on small screens
            button("Menu") {
                className = "menu-button"
                element.themeList.add("small")
                icon = Icon(VaadinIcon.MENU)

                onLeftClick {
                    tabs.classNames.toggle("show-tabs")
                }
            }

            // header of the menu
            horizontalLayout {
                defaultVerticalComponentAlignment = FlexComponent.Alignment.CENTER
                className = "menu-header"

                // Note! Image resource url is resolved here as it is dependent on the
                // execution mode (development or production) and browser ES level support
                val resolvedImage = VaadinServletService.getCurrent().resolveResource("./img/table-logo.png")
                image(resolvedImage, "")

                label("My CRUD")
            }

            // container for the navigation buttons, which are added by addView()
            tabs = tabs {
                orientation = Tabs.Orientation.VERTICAL
                flexGrow = 1.0
            }

            // logout menu item
            button("Logout", VaadinIcon.SIGN_OUT.create()) {
                addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE)
                onLeftClick {
                    VaadinSession.getCurrent().session.invalidate()
                    UI.getCurrent().page.reload()
                }
            }
        }
    }

    /**
     * Add a view to the navigation menu
     *
     * @param viewClass that has a `Route` annotation
     * @param caption   view caption in the menu
     * @param icon      view icon in the menu
     */
    fun addView(viewClass: KClass<out Component>, caption: String, icon: VaadinIcon) {
        tabs.tab {
            routerLink(icon = icon, text = null, viewType = viewClass) {
                className = "menu-link"
                span(caption)
            }
        }
    }
}

@VaadinDsl
fun (@VaadinDsl HasComponents).menu(block: (@VaadinDsl Menu).() -> Unit = {}) = init(Menu(), block)

package eu.vok.bookstore

import com.github.mvysny.karibudsl.v10.*
import com.vaadin.flow.component.HasElement
import com.vaadin.flow.component.button.ButtonVariant
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.router.RouterLayout
import eu.vaadinonkotlin.vaadin.Session
import eu.vok.bookstore.about.AboutView
import eu.vok.bookstore.authentication.loginManager
import eu.vok.bookstore.crud.SampleCrudView
import eu.vok.bookstore.utils.navMenuBar

/**
 * The layout of the pages e.g. About and Inventory.
 */
class MainLayout : KComposite(), RouterLayout {
    private lateinit var contentPane: Div
    private val root = ui {
        appLayout {
            isDrawerOpened = false

            navbar {
                drawerToggle()
                horizontalLayout {
                    content { align(left, middle) }
                    image("img/table-logo.png", "")
                    h3("My CRUD")
                }
            }
            drawer {
                navMenuBar {
                    addRoute(VaadinIcon.EDIT, SampleCrudView::class)
                    addRoute(VaadinIcon.INFO_CIRCLE, AboutView::class)
                }
                // logout menu item
                horizontalLayout(isPadding = true) {
                    button("Logout", VaadinIcon.SIGN_OUT.create()) {
                        addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE)
                        onLeftClick {
                            Session.loginManager.logout()
                        }
                    }
                }
            }

            content {
                contentPane = div {
                    setSizeFull(); classNames.add("app-content")
                }
            }
        }
    }

    override fun showRouterLayoutContent(content: HasElement) {
        contentPane.element.appendChild(content.element)
    }
}

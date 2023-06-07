package eu.vok.bookstore

import com.github.mvysny.karibudsl.v10.*
import com.github.mvysny.karibudsl.v23.route
import com.github.mvysny.karibudsl.v23.sideNav
import com.vaadin.flow.component.HasElement
import com.vaadin.flow.component.button.ButtonVariant
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.router.RouterLayout
import eu.vaadinonkotlin.vaadin.Session
import eu.vok.bookstore.about.AboutView
import eu.vok.bookstore.authentication.loginManager
import eu.vok.bookstore.crud.SampleCrudView

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
                sideNav {
                    route(SampleCrudView::class, VaadinIcon.EDIT)
                    route(AboutView::class, VaadinIcon.INFO_CIRCLE)
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

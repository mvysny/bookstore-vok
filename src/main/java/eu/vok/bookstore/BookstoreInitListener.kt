package eu.vok.bookstore

import com.github.vok.framework.VaadinOnKotlin
import com.github.vok.framework.flow.Session
import com.github.vok.security.loggedInUserResolver
import com.vaadin.flow.server.ServiceInitEvent
import com.vaadin.flow.server.VaadinServiceInitListener
import eu.vok.bookstore.authentication.LoginScreen
import eu.vok.bookstore.authentication.loginManager

/**
 * This class is used to listen to BeforeEnter event of all UIs in order to
 * check whether a user is signed in or not before allowing entering any page.
 * It is registered in a file named
 * `com.vaadin.flow.server.VaadinServiceInitListener` in `META-INF/services`.
 */
class BookstoreInitListener : VaadinServiceInitListener {
    override fun serviceInit(initEvent: ServiceInitEvent) {
        initEvent.source.addUIInitListener { uiInitEvent ->
            uiInitEvent.ui.addBeforeEnterListener { enterEvent ->
                if (!Session.loginManager.isLoggedIn && enterEvent.navigationTarget != LoginScreen::class.java) {
                    enterEvent.rerouteTo(LoginScreen::class.java)
                } else {
                    VaadinOnKotlin.loggedInUserResolver!!.checkPermissionsOnClass(enterEvent.navigationTarget)
                }
            }
        }
    }
}

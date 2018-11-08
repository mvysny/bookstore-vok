package eu.vok.bookstore

import com.vaadin.flow.server.ServiceInitEvent
import com.vaadin.flow.server.VaadinServiceInitListener
import eu.vok.bookstore.authentication.AccessControlFactory
import eu.vok.bookstore.authentication.LoginScreen

/**
 * This class is used to listen to BeforeEnter event of all UIs in order to
 * check whether a user is signed in or not before allowing entering any page.
 * It is registered in a file named
 * `com.vaadin.flow.server.VaadinServiceInitListener` in `META-INF/services`.
 */
class BookstoreInitListener : VaadinServiceInitListener {
    override fun serviceInit(initEvent: ServiceInitEvent) {
        val accessControl = AccessControlFactory.instance
                .createAccessControl()

        initEvent.source.addUIInitListener { uiInitEvent ->
            uiInitEvent.ui.addBeforeEnterListener { enterEvent ->
                if (!accessControl.isUserSignedIn && enterEvent.navigationTarget != LoginScreen::class.java)
                    enterEvent.rerouteTo(LoginScreen::class.java)
            }
        }
    }
}

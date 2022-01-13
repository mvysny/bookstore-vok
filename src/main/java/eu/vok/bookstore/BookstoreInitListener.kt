package eu.vok.bookstore

import com.vaadin.flow.server.ServiceInitEvent
import com.vaadin.flow.server.VaadinServiceInitListener
import eu.vaadinonkotlin.security.VokViewAccessChecker
import eu.vok.bookstore.authentication.LoginView

/**
 * This class is used to listen to BeforeEnter event of all UIs in order to
 * check whether a user is signed in or not before allowing entering any page.
 * It is registered in a file named
 * `com.vaadin.flow.server.VaadinServiceInitListener` in `META-INF/services`.
 */
class BookstoreInitListener : VaadinServiceInitListener {
    override fun serviceInit(initEvent: ServiceInitEvent) {
        initEvent.source.addUIInitListener { uiInitEvent ->
            val checker = VokViewAccessChecker()
            checker.setLoginView(LoginView::class.java)
            uiInitEvent.ui.addBeforeEnterListener(checker)
        }
    }
}

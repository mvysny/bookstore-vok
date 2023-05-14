package eu.vok.bookstore

import com.github.mvysny.vaadinsimplesecurity.SimpleViewAccessChecker
import com.vaadin.flow.server.ServiceInitEvent
import com.vaadin.flow.server.VaadinServiceInitListener
import eu.vaadinonkotlin.vaadin.Session
import eu.vok.bookstore.authentication.LoginView
import eu.vok.bookstore.authentication.loginManager

/**
 * This class is used to listen to BeforeEnter event of all UIs in order to
 * check whether a user is signed in or not before allowing entering any page.
 * It is registered in a file named
 * `com.vaadin.flow.server.VaadinServiceInitListener` in `META-INF/services`.
 */
class BookstoreInitListener : VaadinServiceInitListener {
    private val checker = SimpleViewAccessChecker.usingService { Session.loginManager }
    init {
        checker.setLoginView(LoginView::class.java)
    }

    override fun serviceInit(initEvent: ServiceInitEvent) {
        initEvent.source.addUIInitListener { uiInitEvent ->
            uiInitEvent.ui.addBeforeEnterListener(checker)
        }
    }
}

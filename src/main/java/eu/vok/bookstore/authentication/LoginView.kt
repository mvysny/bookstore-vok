package eu.vok.bookstore.authentication

import com.github.mvysny.karibudsl.v10.*
import com.vaadin.flow.component.dependency.StyleSheet
import com.vaadin.flow.component.login.LoginForm
import com.vaadin.flow.component.login.LoginI18n
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.auth.AnonymousAllowed
import eu.vaadinonkotlin.vaadin.Session

/**
 * UI content when the user is not logged in yet.
 */
@Route("login")
@PageTitle("Login")
@AnonymousAllowed
class LoginView : KComposite() {

    private lateinit var loginForm: LoginForm
    private val root = ui {
        verticalLayout {
            setSizeFull(); isPadding = false; content { center() }

            val loginI18n: LoginI18n = loginI18n {
                header.title = "VoK Security Demo"
                additionalInformation = "Log in as user/user or admin/admin"
            }
            loginForm = loginForm(loginI18n) {
                addLoginListener { e ->
                    if (!Session.loginManager.login(e.username, e.password)) {
                        isError = true
                    }
                }
            }
        }
    }
}

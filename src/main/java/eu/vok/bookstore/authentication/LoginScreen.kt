package eu.vok.bookstore.authentication

import com.github.vok.framework.flow.Session
import com.github.vok.karibudsl.flow.*
import com.vaadin.flow.component.Key
import com.vaadin.flow.component.dependency.StyleSheet
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.textfield.PasswordField
import com.vaadin.flow.component.textfield.TextField
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import eu.vok.bookstore.crud.addKeyListener

/**
 * UI content when the user is not logged in yet.
 */
@Route("Login")
@PageTitle("Login")
@StyleSheet("css/shared-styles.css")
class LoginScreen : FlexLayout() {

    private lateinit var username: TextField
    private lateinit var password: PasswordField
    private val accessControl: AccessControl = AccessControlFactory.instance.createAccessControl()

    init {
        setSizeFull(); className = "login-screen"

        verticalLayout {  // login info
            className = "login-information"
            h1("Login Information")
            span("""Log in as "admin"/"admin" to have full access. Log in with "user"/"user" to have read-only access.""")
        }

        flexLayout {
            setSizeFull()
            justifyContentMode = FlexComponent.JustifyContentMode.CENTER
            alignItems = FlexComponent.Alignment.CENTER

            formLayout {
                width = "310px"
                formItem("Username") {
                    username = textField {
                        width = "15em"
                        value = "admin"
                        setId("username")
                        focus()
                    }
                }
                html("<br/>")
                formItem("Password") {
                    password = passwordField {
                        width = "15em"
                        setId("password")
                    }
                }
                html("<br/>")
                horizontalLayout { // buttons
                    button("Login") {
                        onLeftClick { login() }
                        themes.add("success primary")
                    }
                    button("Forgot password?") {
                        onLeftClick { showNotification(Notification("Hint: try anything")) }
                        themes.add("tertiary")
                    }
                }
                addKeyListener(Key.ENTER) { login() }
            }
        }
    }

    private fun login() {
        if (Session.loginManager.signIn(username.value, password.value)) {
            ui.get().navigate("")
        } else {
            showNotification(Notification("Login failed. " + "Please check your username and password and try again."))
            username.focus()
        }
    }

    private fun showNotification(notification: Notification) {
        // keep the notification visible a little while after moving the
        // mouse, or until clicked
        notification.duration = 2000
        notification.open()
    }
}

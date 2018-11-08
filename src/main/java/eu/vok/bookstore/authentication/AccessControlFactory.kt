package eu.vok.bookstore.authentication

import com.github.vok.framework.VaadinOnKotlin
import com.github.vok.framework.flow.Session
import com.github.vok.security.loggedInUserResolver

class AccessControlFactory private constructor() {
    fun createAccessControl(): AccessControl {
        return object : AccessControl {
            override fun isUserSignedIn(): Boolean = Session.loginManager.isLoggedIn

            override fun isUserInRole(role: String): Boolean =
                    VaadinOnKotlin.loggedInUserResolver!!.getCurrentUserRoles().contains(role)

            override fun getPrincipalName(): String? = Session.loginManager.user?.username
        }
    }

    companion object {
        val instance = AccessControlFactory()
    }
}

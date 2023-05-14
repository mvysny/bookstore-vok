package eu.vok.bookstore.authentication

import com.github.mvysny.vaadinsimplesecurity.AbstractLoginService
import com.github.mvysny.vaadinsimplesecurity.HasPassword
import com.github.mvysny.vaadinsimplesecurity.SimpleUserWithRoles
import com.github.vokorm.KEntity
import com.github.vokorm.findSingleBy
import com.gitlab.mvysny.jdbiorm.Dao
import com.gitlab.mvysny.jdbiorm.Table
import eu.vaadinonkotlin.vaadin.Session

/**
 * Represents an user. Stored in a database; see [KEntity] and [Accessing Databases](http://www.vaadinonkotlin.eu/databases.html) for more details.
 * Implements the [HasPassword] helper interface which provides password hashing functionality. Remember to set the
 * password via [HasPassword.setPassword] and verify the password via [HasPassword.passwordMatches].
 * @property username user name, unique
 * @property roles comma-separated list of roles
 */
@Table("users")
data class User(override var id: Long? = null,
                var username: String = "",
                private var hashedPassword: String = "",
                var roles: String = "") : KEntity<Long>, HasPassword {
    companion object : Dao<User, Long>(User::class.java) {
        /**
         * Finds user by his [username]. If there is no such user, returns `null`.
         */
        fun findByUsername(username: String): User? = findSingleBy { User::username eq username }
    }

    override fun getHashedPassword(): String = hashedPassword

    override fun setHashedPassword(hashedPassword: String) {
        this.hashedPassword = hashedPassword
    }
}

/**
 * Handles the logged-in user. Stored in a session per-user. Get the login manager instance via the [loginManager] property, never construct
 * it yourself.
 */
class LoginManager: AbstractLoginService<User>() {
    /**
     * The currently logged-in user, `null` if there is no user logged in.
     */
    var user: User? = null
    private set

    fun login(username: String, password: String): Boolean {
        val user: User = User.findByUsername(username) ?: return false
        if (!user.passwordMatches(password)) return false
        login(user)
        return true
    }

    fun isAdmin(): Boolean = isUserInRole("admin")

    override fun toUserWithRoles(user: User): SimpleUserWithRoles = SimpleUserWithRoles(user.username, user.roles.split(',').toSet())
}

/**
 * This code will tie the [LoginManager] to the session. Make sure to always ask for the login manager via this property, never create it yourself.
 */
val Session.loginManager: LoginManager get() = getOrPut(LoginManager::class) { LoginManager() }

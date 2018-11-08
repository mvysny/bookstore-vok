package eu.vok.bookstore

import com.github.vok.framework.VaadinOnKotlin
import com.github.vok.framework.flow.Session
import com.github.vok.framework.sql2o.dataSource
import com.github.vok.framework.sql2o.dataSourceConfig
import com.github.vok.security.LoggedInUserResolver
import com.github.vok.security.loggedInUserResolver
import eu.vok.bookstore.authentication.User
import eu.vok.bookstore.authentication.loginManager
import eu.vok.bookstore.backend.mock.MockDataGenerator
import org.flywaydb.core.Flyway
import org.h2.Driver
import org.slf4j.LoggerFactory
import javax.servlet.ServletContextEvent
import javax.servlet.ServletContextListener
import javax.servlet.annotation.WebListener

/**
 * Boots the app:
 *
 * * Makes sure that the database is up-to-date, by running migration scripts with Flyway. This will work even in cluster as Flyway
 *   automatically obtains a cluster-wide database lock.
 * * Initializes the VaadinOnKotlin framework.
 * * Maps Vaadin to `/`, maps REST server to `/rest`
 * @author mvy
 */
@WebListener
class Bootstrap: ServletContextListener {
    override fun contextInitialized(sce: ServletContextEvent?) {
        log.info("Starting up")

        // this will configure your database. For demo purposes, an in-memory embedded H2 database is used. To use a production-ready database:
        // 1. fill in the proper JDBC URL here
        // 2. make sure to include the database driver into the classpath, by adding a dependency on the driver into the build.gradle file.
        VaadinOnKotlin.dataSourceConfig.apply {
            driverClassName = Driver::class.java.name
            jdbcUrl = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"
            username = "sa"
            password = ""
        }

        // Initializes the VoK framework
        log.info("Initializing VaadinOnKotlin")
        VaadinOnKotlin.init()

        // Makes sure the database is up-to-date
        log.info("Running DB migrations")
        val flyway = Flyway.configure()
            .dataSource(VaadinOnKotlin.dataSource)
            .load()
        flyway.migrate()

        // setup security
        VaadinOnKotlin.loggedInUserResolver = object : LoggedInUserResolver {
            override fun isLoggedIn(): Boolean = Session.loginManager.isLoggedIn
            override fun getCurrentUserRoles(): Set<String> {
                val roles = Session.loginManager.user?.roles ?: ""
                return roles.split(",").toSet()
            }
        }
        User(username = "admin", roles = "admin,user").apply { setPassword("admin") } .save()
        User(username = "user", roles = "user").apply { setPassword("user") } .save()

        // pre-populates the database with a demo data
        log.info("Populating database with testing data")
        MockDataGenerator.generate()

        log.info("Initialization complete")
    }

    override fun contextDestroyed(sce: ServletContextEvent?) {
        log.info("Shutting down");
        log.info("Destroying VaadinOnKotlin")
        VaadinOnKotlin.destroy()
        log.info("Shutdown complete")
    }

    companion object {
        private val log = LoggerFactory.getLogger(Bootstrap::class.java)
    }
}

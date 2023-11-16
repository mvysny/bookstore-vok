import org.gradle.api.tasks.testing.logging.TestExceptionFormat
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.20"
    id("application")
    id("com.vaadin")
}

defaultTasks("clean", "build")

repositories {
    mavenCentral()
}

tasks.withType<Test> {
    useJUnitPlatform()
    testLogging {
        // to see the exceptions of failed tests in Travis-CI console.
        exceptionFormat = TestExceptionFormat.FULL
    }
}

dependencies {
    // Vaadin-on-Kotlin dependency, includes Vaadin
    implementation("eu.vaadinonkotlin:vok-framework-vokdb:${project.properties["vokVersion"]}") {
        exclude(module = "vaadin-core")
    }
    implementation("com.github.mvysny.karibudsl:karibu-dsl-v23:${project.properties["karibuDslVersion"]}")
    implementation("com.github.mvysny.vaadin-simple-security:vaadin-simple-security:0.2")
    // Vaadin
    implementation("com.vaadin:vaadin-core:${project.properties["vaadinVersion"]}") {
        afterEvaluate {
            if (vaadin.productionMode) {
                exclude(module = "vaadin-dev")
            }
        }
    }
    implementation("com.github.mvysny.vaadin-boot:vaadin-boot:12.0")

    implementation(kotlin("stdlib-jdk8"))

    // logging
    // currently we are logging through the SLF4J API to SLF4J-Simple. See src/main/resources/simplelogger.properties file for the logger configuration
    implementation("org.slf4j:slf4j-simple:2.0.7")

    // db
    implementation("com.zaxxer:HikariCP:5.0.1")
    implementation("org.flywaydb:flyway-core:9.22.0")
    implementation("com.h2database:h2:2.2.222") // remove this and replace it with a database driver of your choice.

    // testing
    testImplementation("com.github.mvysny.kaributesting:karibu-testing-v24:2.1.0")
    testImplementation("com.github.mvysny.dynatest:dynatest-engine:0.24")
}

tasks.withType<KotlinCompile> {
    // Vaadin 24 requires JDK 17+
    kotlinOptions.jvmTarget = "17"
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

application {
    mainClass.set("eu.vok.bookstore.MainKt")
}

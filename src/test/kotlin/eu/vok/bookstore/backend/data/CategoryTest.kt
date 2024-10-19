package eu.vok.bookstore.backend.data

import eu.vok.bookstore.AbstractDBTests
import org.junit.jupiter.api.Test

class CategoryTest : AbstractDBTests() {
    @Test fun smoke() {
        Category.getAllForProduct(2)
    }
}

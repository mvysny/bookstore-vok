package eu.vok.bookstore.backend.mock

import com.github.vokorm.db
import java.math.BigDecimal

import eu.vok.bookstore.backend.data.Availability
import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product
import eu.vok.bookstore.backend.data.ProductCategory
import kotlin.random.Random

object MockDataGenerator {
    private val categoryNames = arrayOf("Children's books", "Best sellers", "Romance", "Mystery", "Thriller", "Sci-fi", "Non-fiction", "Cookbooks")

    private val word1 = arrayOf("The art of", "Mastering", "The secrets of", "Avoiding", "For fun and profit: ", "How to fail at", "10 important facts about", "The ultimate guide to", "Book of", "Surviving", "Encyclopedia of", "Very much", "Learning the basics of", "The cheap way to", "Being awesome at", "The life changer:", "The Vaadin way:", "Becoming one with", "Beginners guide to", "The complete visual guide to", "The mother of all references:")

    private val word2 = arrayOf("gardening", "living a healthy life", "designing tree houses", "home security", "intergalaxy travel", "meditation", "ice hockey", "children's education", "computer programming", "Vaadin TreeTable", "winter bathing", "playing the cello", "dummies", "rubber bands", "feeling down", "debugging", "running barefoot", "speaking to a big audience", "creating software", "giant needles", "elephants", "keeping your wife happy")

    private fun createCategories(): List<Category> {
        db {
            for (name in categoryNames) {
                Category(name = name).save()
            }
        }
        return Category.findAll()
    }

    fun generate() {
        db { ProductCategory.deleteAll() }
        Product.deleteAll()
        Category.deleteAll()
        createProducts(createCategories())
    }

    private fun createProducts(categories: List<Category>) {
        db {
            for (i in 0..99) {
                createProduct(categories)
            }
        }
    }

    private fun createProduct(categories: List<Category>): Product {
        val p = Product()
        p.productName = generateName()

        p.price = BigDecimal(Random.nextDouble(5.0, 30.0))
        p.availability = Availability.values().random()
        if (p.availability == Availability.AVAILABLE) {
            p.stockCount = Random.nextInt(523)
        }

        p.save()
        p.category = getCategory(categories)
        return p
    }

    private fun getCategory(categories: List<Category>): Set<Category> =
        (0..Random.nextInt(0, 2)).map { categories.random() } .toSet()

    private fun generateName(): String = "${word1.random()} ${word2.random()}"
}

package eu.vok.bookstore.backend.mock

import com.github.vokorm.db
import com.github.vokorm.findAll
import java.math.BigDecimal
import java.util.HashSet
import java.util.Random

import eu.vok.bookstore.backend.data.Availability
import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product

object MockDataGenerator {
    private val random = Random(1)
    private val categoryNames = arrayOf("Children's books", "Best sellers", "Romance", "Mystery", "Thriller", "Sci-fi", "Non-fiction", "Cookbooks")

    private val word1 = arrayOf("The art of", "Mastering", "The secrets of", "Avoiding", "For fun and profit: ", "How to fail at", "10 important facts about", "The ultimate guide to", "Book of", "Surviving", "Encyclopedia of", "Very much", "Learning the basics of", "The cheap way to", "Being awesome at", "The life changer:", "The Vaadin way:", "Becoming one with", "Beginners guide to", "The complete visual guide to", "The mother of all references:")

    private val word2 = arrayOf("gardening", "living a healthy life", "designing tree houses", "home security", "intergalaxy travel", "meditation", "ice hockey", "children's education", "computer programming", "Vaadin TreeTable", "winter bathing", "playing the cello", "dummies", "rubber bands", "feeling down", "debugging", "running barefoot", "speaking to a big audience", "creating software", "giant needles", "elephants", "keeping your wife happy")

    fun createCategories(): List<Category> {
        db {
            for (name in categoryNames) {
                Category(name = name).save()
            }
        }
        return Category.findAll()
    }

    fun createProducts(categories: List<Category>): List<Product> {
        db {
            for (i in 0..99) {
                createProduct(categories).save()
            }
        }
        return Product.findAll()
    }

    private fun createProduct(categories: List<Category>): Product {
        val p = Product()
        p.productName = generateName()

        p.price = BigDecimal((random.nextInt(250) + 50) / 10.0)
        p.availability = Availability.values()[random.nextInt(Availability
                .values().size)]
        if (p.availability == Availability.AVAILABLE) {
            p.stockCount = random.nextInt(523)
        }

        p.category = getCategory(categories, 1, 2)
        return p
    }

    private fun getCategory(categories: List<Category>,
                            min: Int, max: Int): Set<Category> {
        val nr = random.nextInt(max) + min
        val productCategories = HashSet<Category>()
        for (i in 0 until nr) {
            productCategories.add(categories[random.nextInt(categories
                    .size)])
        }

        return productCategories
    }

    private fun generateName(): String {
        return (word1[random.nextInt(word1.size)] + " "
                + word2[random.nextInt(word2.size)])
    }

}

package eu.vok.bookstore.crud

import com.github.mvysny.karibudsl.v10.VaadinDsl
import com.github.mvysny.karibudsl.v10.columnFor
import com.github.mvysny.karibudsl.v10.init
import com.github.mvysny.vokdataloader.DataLoader
import com.github.mvysny.vokdataloader.withFilter
import com.github.vokorm.dataloader.dataLoader
import com.vaadin.flow.component.HasComponents
import com.vaadin.flow.component.grid.Grid
import com.vaadin.flow.data.renderer.LitRenderer
import eu.vaadinonkotlin.vaadin.vokdb.setDataLoader
import eu.vok.bookstore.backend.data.Product
import java.text.DecimalFormat

/**
 * Grid of products, handling the visual presentation and filtering of a set of
 * items. This version uses an in-memory data source that is suitable for small
 * data sets.
 */
class ProductGrid : Grid<Product>() {

    val selectedRow: Product
        get() = asSingleSelect().value

    init {
        setSizeFull()

        columnFor(Product::productName, sortable = true) {
            setHeader("Product name")
            flexGrow = 20
        }

        // Format and add " €" to price
        val decimalFormat = DecimalFormat().apply {
            maximumFractionDigits = 2
            minimumFractionDigits = 2
        }

        // To change the text alignment of the column, a template is used.
        val priceTemplate = "<div style='text-align: right'>[[item.price]]</div>"
        addColumn(LitRenderer.of<Product>(priceTemplate)
                .withProperty("price") { (_, _, price) -> decimalFormat.format(price) + " €" }).apply {
            setHeader("Price")
            isSortable = true
            flexGrow = 3
            key = Product::price.name
        }

        // Add an traffic light icon in front of availability
        // Three css classes with the same names of three availability values,
        // Available, Coming and Discontinued, are defined in shared-styles.css and are
        // used here in availabilityTemplate.
        val availabilityTemplate = """<iron-icon icon="vaadin:circle" class-name="[[item.availability]]"></iron-icon> [[item.availability]]"""
        addColumn(LitRenderer.of<Product>(availabilityTemplate)
                .withProperty("availability") { (_, _, _, _, availability) -> availability.displayableName }).apply {
            setHeader("Availability")
            isSortable = true
            flexGrow = 5
            key = Product::availability.name
        }

        // To change the text alignment of the column, a template is used.
        val stockCountTemplate = "<div style='text-align: right'>[[item.stockCount]]</div>"
        addColumn(LitRenderer.of<Product>(stockCountTemplate)
                .withProperty("stockCount") { (_, _, _, stockCount) -> if (stockCount == 0) "-" else Integer.toString(stockCount!!) }).apply {
            setHeader("Stock count")
            isSortable = true
            flexGrow = 3
            key = Product::stockCount.name
        }

        // Show all categories the product is in, separated by commas
        addColumn { formatCategories(it) }.apply {
            setHeader("Category")
            flexGrow = 12
        }

        setFilter("")
    }

    private fun formatCategories(product: Product): String = product.category.map { it.name!! }.sorted().joinToString()

    fun setFilter(filter: String) {
        @Suppress("UNCHECKED_CAST")
        var dp: DataLoader<Product> = Product.dataLoader
        if (filter.isNotBlank()) {
            dp = dp.withFilter { (Product::productName istartsWith filter.trim()) or ("availability ilike :a"("a" to filter.trim() + "%")) }
        }
        setDataLoader(dp)
    }
}

@VaadinDsl
fun (@VaadinDsl HasComponents).productGrid(block: (@VaadinDsl ProductGrid).() -> Unit = {}) = init(ProductGrid(), block)

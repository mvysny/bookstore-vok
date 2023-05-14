package eu.vok.bookstore.crud

import com.github.mvysny.karibudsl.v10.*
import com.github.mvysny.kaributools.addShortcut
import com.github.mvysny.kaributools.setPrimary
import com.github.mvysny.kaributools.shortcut
import com.vaadin.flow.component.HasComponents
import com.vaadin.flow.component.Key
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.button.ButtonVariant
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.data.binder.BeanValidationBinder
import com.vaadin.flow.data.converter.StringToBigDecimalConverter
import com.vaadin.flow.data.converter.StringToIntegerConverter
import com.vaadin.flow.data.value.ValueChangeMode
import eu.vok.bookstore.backend.data.Availability
import eu.vok.bookstore.backend.data.Category
import eu.vok.bookstore.backend.data.Product
import java.io.Serializable
import java.math.BigDecimal
import java.text.DecimalFormat
import java.text.NumberFormat
import java.util.*

/**
 * A form for editing a single product.
 */
class ProductForm(private val listener: FormListener<Product>) : KComposite() {

    private lateinit var save: Button
    private lateinit var discard: Button
    private lateinit var delete: Button
    private val binder = BeanValidationBinder(Product::class.java)
    private lateinit var currentProduct: Product

    private class PriceConverter : StringToBigDecimalConverter(BigDecimal.ZERO, "Cannot convert value to a number.") {

        override fun getFormat(locale: Locale?): NumberFormat {
            // Always display currency with two decimals
            val format = super.getFormat(locale)
            if (format is DecimalFormat) {
                format.setMaximumFractionDigits(2)
                format.setMinimumFractionDigits(2)
            }
            return format
        }
    }

    private class StockCountConverter : StringToIntegerConverter(0, "Could not convert value to int.") {

        override fun getFormat(locale: Locale?): NumberFormat {
            // Do not use a thousands separator, as HTML5 input type
            // number expects a fixed wire/DOM number format regardless
            // of how the browser presents it to the user (which could
            // depend on the browser locale).
            return DecimalFormat().apply {
                maximumFractionDigits = 0
                isDecimalSeparatorAlwaysShown = false
                isParseIntegerOnly = true
                isGroupingUsed = false
            }
        }
    }

    private val root = ui {
        div(classNames = "product-form") {
            verticalLayout {
                width = "400px"

                textField("Product name") {
                    width = "100%"
                    isRequired = true
                    valueChangeMode = ValueChangeMode.EAGER
                    bind(binder).bind(Product::productName)
                }

                horizontalLayout {
                    width = "100%"

                    textField("Price") {
                        suffixComponent = Span("€")
                        element.themeList.add("align-right")
                        valueChangeMode = ValueChangeMode.EAGER
                        bind(binder).withConverter(PriceConverter()).bind(Product::price)
                        isExpand = true; width = "20%"; flexBasis = "1px"
                    }

                    textField("In stock") {
                        element.themeList.add("align-right")
                        valueChangeMode = ValueChangeMode.EAGER
                        bind(binder).withConverter(StockCountConverter()).bind(Product::stockCount)
                        isExpand = true; width = "20%"; flexBasis = "1px"
                    }
                }

                comboBox<Availability>("Availability") {
                    width = "100%"
                    isRequired = true
                    setItems(*Availability.values())
                    isAllowCustomValue = false
                    bind(binder).bind(Product::availability)
                }

                val categoryLabel = label("Categories") {
                    className = "vaadin-label"
                }

                checkBoxGroup<Category> {
                    width = "100%"
                    setId("category")
                    setItems(Category.findAll())
                    setItemLabelGenerator { it.name }
                    categoryLabel.setFor(this)
                    bind(binder).bind(Product::category)
                }

                save = button("Save") {
                    width = "100%"; setPrimary()
                    onLeftClick {
                        if (binder.writeBeanIfValid(currentProduct)) {
                            listener.save(currentProduct)
                        }
                    }
                }

                discard = button("Discard changes") {
                    width = "100%"
                    onLeftClick { listener.discardChanges(currentProduct) }
                }

                delete = button("Delete") {
                    width = "100%"; setPrimary()
                    addThemeVariants(ButtonVariant.LUMO_ERROR)
                    onLeftClick {
                        listener.delete(currentProduct)
                    }
                }

                button("Cancel") {
                    width = "100%"
                    addClickListener { listener.cancel() }
                }
            }

            // enable/disable save button while editing
            binder.addStatusChangeListener { event ->
                val isValid = !event.hasValidationErrors()
                val hasChanges = binder.hasChanges()
                save.isEnabled = hasChanges && isValid
                discard.isEnabled = hasChanges
            }

            addShortcut(Key.ESCAPE.shortcut) { listener.cancel() }
        }
    }

    fun editProduct(product: Product = Product()) {
        delete.isVisible = !product.isNewProduct
        currentProduct = product
        binder.readBean(product)
    }
}

interface FormListener<B> : Serializable {
    fun save(bean: B)
    fun discardChanges(bean: B)
    /**
     * Requests to cancel the editing of the bean. The listener should hide the form.
     */
    fun cancel()

    fun delete(bean: B)
}

@VaadinDsl
fun (@VaadinDsl HasComponents).productForm(listener: FormListener<Product>, block: (@VaadinDsl ProductForm).() -> Unit = {}) = init(ProductForm(listener), block)

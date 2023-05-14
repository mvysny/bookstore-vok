package eu.vok.bookstore.crud

import com.github.mvysny.karibudsl.v10.*
import com.github.mvysny.kaributools.setPrimary
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.textfield.TextField
import com.vaadin.flow.data.value.ValueChangeMode
import com.vaadin.flow.router.*
import eu.vaadinonkotlin.vaadin.Session
import eu.vok.bookstore.MainLayout
import eu.vok.bookstore.authentication.loginManager
import eu.vok.bookstore.backend.data.Product
import jakarta.annotation.security.PermitAll

/**
 * A view for performing create-read-update-delete operations on products.
 */
@Route(value = "inventory", layout = MainLayout::class)
@RouteAlias(value = "", layout = MainLayout::class)
@PageTitle("Inventory")
@PermitAll
class SampleCrudView : KComposite(), HasUrlParameter<String> {
    private lateinit var grid: ProductGrid
    private lateinit var form: ProductForm
    private lateinit var filter: TextField

    private var newProduct: Button? = null

    private val formListener: FormListener<Product> = object : FormListener<Product> {
        override fun cancel() {
            setFragmentParameter("")
            clearSelection()
        }

        override fun save(bean: Product) {
            clearSelection()
            val newProduct = bean.isNewProduct
            bean.save()
            if (newProduct) {
                grid.dataProvider.refreshAll()
            } else {
                grid.dataProvider.refreshItem(bean)
            }
            setFragmentParameter("")
            showSaveNotification(bean.productName + if (newProduct) " created" else " updated")
        }

        override fun delete(bean: Product) {
            clearSelection()
            bean.delete()
            grid.dataProvider.refreshAll()
            setFragmentParameter("")
            showSaveNotification(bean.productName + " removed")
        }

        override fun discardChanges(bean: Product) {
            showOrEdit(bean)
        }
    }

    private val root = ui {
        horizontalLayout(isSpacing = false) {
            content { center() }
            setSizeFull()

            verticalLayout {
                setSizeFull()

                horizontalLayout {
                    // top bar
                    width = "100%"

                    filter = textField {
                        placeholder = "Filter name, availability or category"
                        addValueChangeListener { event -> grid.setFilter(event.value) }
                        valueChangeMode = ValueChangeMode.EAGER
                        isExpand = true
                    }
                    newProduct = button("New product", VaadinIcon.PLUS_CIRCLE.create()) {
                        setPrimary()
                        onLeftClick { newProduct() }
                    }
                }
                grid = productGrid {
                    asSingleSelect().addValueChangeListener { event ->
                        showOrEdit(event.value)
                    }
                    isExpand = true
                }
            }
            form = productForm(formListener)
        }
    }

    init {
        showOrEdit(null)
        newProduct!!.isEnabled = Session.loginManager.isAdmin()
    }

    private fun showSaveNotification(msg: String) {
        Notification.show(msg)
    }

    private fun clearSelection() {
        grid.selectionModel.deselectAll()
    }

    private fun selectRow(row: Product) {
        grid.selectionModel.select(row)
    }

    private fun showOrEdit(product: Product?) {
        if (product == null) {
            setFragmentParameter("")
        } else {
            setFragmentParameter(product.id!!.toString() + "")
        }
        editProduct(product)
    }

    private fun editProduct(product: Product?) {
        showForm(product != null)
        form.editProduct(product ?: Product())
    }

    private fun showForm(show: Boolean) {
        form.isVisible = show
        form.element.isEnabled = Session.loginManager.isAdmin()
    }

    private fun newProduct() {
        clearSelection()
        setFragmentParameter("new")
        editProduct(Product())
    }

    override fun setParameter(event: BeforeEvent, @OptionalParameter parameter: String?) {
        if (!parameter.isNullOrEmpty()) {
            if (parameter == "new") {
                newProduct()
            } else {
                // Ensure this is selected even if coming directly here from
                // login
                try {
                    val pid = Integer.parseInt(parameter)
                    val product = Product.findById(pid)
                    selectRow(product!!)
                } catch (e: NumberFormatException) {
                }
            }
        }
    }

    /**
     * Update the fragment without causing navigator to change view
     */
    private fun setFragmentParameter(productId: String?) {
        val fragmentParameter: String = if (productId.isNullOrEmpty()) "" else productId
        UI.getCurrent().navigate(SampleCrudView::class.java, fragmentParameter)
    }
}

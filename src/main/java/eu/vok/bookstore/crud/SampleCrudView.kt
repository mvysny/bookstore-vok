package eu.vok.bookstore.crud

import com.github.vok.karibudsl.flow.*
import com.github.vokorm.findById
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.textfield.TextField
import com.vaadin.flow.data.value.ValueChangeMode
import com.vaadin.flow.router.BeforeEvent
import com.vaadin.flow.router.HasUrlParameter
import com.vaadin.flow.router.OptionalParameter
import com.vaadin.flow.router.Route
import com.vaadin.flow.router.RouteAlias
import eu.vok.bookstore.MainLayout
import eu.vok.bookstore.authentication.AccessControl
import eu.vok.bookstore.authentication.AccessControlFactory
import eu.vok.bookstore.backend.data.Product

/**
 * A view for performing create-read-update-delete operations on products.
 */
@Route(value = "Inventory", layout = MainLayout::class)
@RouteAlias(value = "", layout = MainLayout::class)
class SampleCrudView : HorizontalLayout(), HasUrlParameter<String> {
    private lateinit var grid: ProductGrid
    private val form: ProductForm
    private lateinit var filter: TextField

    private var newProduct: Button? = null

    val selectedRow: Product
        get() = grid.selectedRow

    private val formListener = object : FormListener<Product> {
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
            edit(bean)
        }
    }

    init {
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
                setVerticalComponentAlignment(FlexComponent.Alignment.START, filter)
                newProduct = button("New product", VaadinIcon.PLUS_CIRCLE.create()) {
                    element.themeList.add("primary")
                    onLeftClick { newProduct() }
                }
            }
            grid = productGrid {
                asSingleSelect().addValueChangeListener { event ->
                    if (AccessControlFactory.getInstance().createAccessControl().isUserInRole(AccessControl.ADMIN_ROLE_NAME)) {
                        edit(event.value)
                    }
                }
                isExpand = true
            }
        }
        form = productForm(formListener)

        edit(null)
        if (!AccessControlFactory.getInstance().createAccessControl().isUserInRole(AccessControl.ADMIN_ROLE_NAME)) {
            newProduct!!.isEnabled = false
        }
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

    private fun edit(product: Product?) {
        if (product == null) {
            setFragmentParameter("")
        } else {
            setFragmentParameter(product.id!!.toString() + "")
        }
        editProduct(product)
    }

    private fun editProduct(product: Product?) {
        showForm(product != null)
        form.editProduct(product)
    }

    private fun showForm(show: Boolean) {
        form.isVisible = show
        form.element.isEnabled = show
    }

    private fun newProduct() {
        clearSelection()
        setFragmentParameter("new")
        editProduct(Product())
    }

    override fun setParameter(event: BeforeEvent, @OptionalParameter parameter: String?) {
        if (parameter != null && !parameter.isEmpty()) {
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
        } else {
            showForm(false)
        }
    }

    /**
     * Update the fragment without causing navigator to change view
     */
    private fun setFragmentParameter(productId: String?) {
        val fragmentParameter: String = if (productId == null || productId.isEmpty()) {
            ""
        } else {
            productId
        }

        UI.getCurrent().navigate(SampleCrudView::class.java, fragmentParameter)
    }

    companion object {
        val VIEW_NAME = "Inventory"
    }
}

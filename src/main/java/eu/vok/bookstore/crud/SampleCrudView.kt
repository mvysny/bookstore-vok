package eu.vok.bookstore.crud

import com.github.vok.karibudsl.flow.*
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.component.textfield.TextField
import com.vaadin.flow.data.value.ValueChangeMode
import com.vaadin.flow.router.BeforeEvent
import com.vaadin.flow.router.HasUrlParameter
import com.vaadin.flow.router.OptionalParameter
import com.vaadin.flow.router.Route
import com.vaadin.flow.router.RouteAlias
import eu.vok.bookstore.MainLayout
import eu.vok.bookstore.backend.DataService
import eu.vok.bookstore.backend.data.Product
import eu.vok.bookstore.backend.mock.VokORMDataService

/**
 * A view for performing create-read-update-delete operations on products.
 *
 * See also [SampleCrudLogic] for fetching the data, the actual CRUD
 * operations and controlling the view based on events from outside.
 */
@Route(value = "Inventory", layout = MainLayout::class)
@RouteAlias(value = "", layout = MainLayout::class)
class SampleCrudView : HorizontalLayout(), HasUrlParameter<String> {
    private lateinit var grid: ProductGrid
    private val form: ProductForm
    private lateinit var filter: TextField

    private val viewLogic = SampleCrudLogic(this)
    private var newProduct: Button? = null

    val selectedRow: Product
        get() = grid.selectedRow

    init {
        setSizeFull()

        verticalLayout {
            setSizeFull()

            horizontalLayout { // top bar
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
                    onLeftClick { viewLogic.newProduct() }
                }
            }
            grid = productGrid {
                asSingleSelect().addValueChangeListener { event -> viewLogic.rowSelected(event.value) }
                isExpand = true
            }
        }
        form = productForm(viewLogic)

        viewLogic.init()
    }

    fun showError(msg: String) {
        Notification.show(msg)
    }

    fun showSaveNotification(msg: String) {
        Notification.show(msg)
    }

    fun setNewProductEnabled(enabled: Boolean) {
        newProduct!!.isEnabled = enabled
    }

    fun clearSelection() {
        grid.selectionModel.deselectAll()
    }

    fun selectRow(row: Product) {
        grid.selectionModel.select(row)
    }

    fun updateProduct(product: Product) {
        val newProduct = product.isNewProduct
        VokORMDataService.updateProduct(product)
        if (newProduct) {
            grid.dataProvider.refreshAll()
        } else {
            grid.dataProvider.refreshItem(product)
        }
    }

    fun removeProduct(product: Product) {
        DataService.get().deleteProduct(product.id!!)
        grid.dataProvider.refreshAll()
    }

    fun editProduct(product: Product?) {
        showForm(product != null)
        form.editProduct(product)
    }

    fun showForm(show: Boolean) {
        form.isVisible = show
        form.element.isEnabled = show
    }

    override fun setParameter(event: BeforeEvent, @OptionalParameter parameter: String?) {
        viewLogic.enter(parameter)
    }

    companion object {
        val VIEW_NAME = "Inventory"
    }
}

package eu.vok.bookstore.backend.data

import com.github.vokorm.Dao
import com.github.vokorm.Entity
import java.io.Serializable

import javax.validation.constraints.NotNull

data class Category(
    @field:NotNull
    override var id: Int? = null,

    @field:NotNull
    var name: String? = null
) : Entity<Int>, Serializable {
    companion object : Dao<Category>
}

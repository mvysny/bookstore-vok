package eu.vok.bookstore.backend.data;

public enum Availability {
    COMING("Coming"), AVAILABLE("Available"), DISCONTINUED("Discontinued");
    public final String name;
    Availability(String name) {
        this.name = name;
    }
}

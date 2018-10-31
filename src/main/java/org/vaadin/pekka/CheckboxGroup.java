/*
 * Copyright 2018 Pekka Hyvönen pekka@vaadin.com, Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package org.vaadin.pekka;

import com.vaadin.flow.component.AbstractCompositeField;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.data.binder.HasDataProvider;
import com.vaadin.flow.data.binder.HasItemsAndComponents;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.Query;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.data.renderer.TextRenderer;
import com.vaadin.flow.data.selection.MultiSelect;
import com.vaadin.flow.data.selection.MultiSelectionListener;
import com.vaadin.flow.function.SerializablePredicate;
import com.vaadin.flow.shared.Registration;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

/**
 * Multiselect component showing options as checkboxes.
 * <p>
 * By default, stacks checkboxes horizontally. For stacking them vertically,
 * @param <T>
 */
public class CheckboxGroup<T> extends AbstractCompositeField<FlexLayout, CheckboxGroup<T>, Set<T>>
        implements HasStyle, HasItemsAndComponents<T>, MultiSelect<CheckboxGroup<T>, T>, HasDataProvider<T> {

    private static class ItemCheckbox<T> extends Checkbox implements ItemComponent<T>, HasComponents {
        private T item;

        ItemCheckbox(T item) {
            this.item = item;
        }

        @Override
        public T getItem() {
            return item;
        }
    }

    private DataProvider<T, ?> dataProvider = DataProvider.ofItems();

    private SerializablePredicate<T> itemEnabledProvider = item -> isEnabled();

    private ComponentRenderer<? extends Component, T> itemRenderer = new TextRenderer<>();

    private boolean isReadOnly;

    public CheckboxGroup() {
        super(Collections.emptySet());
    }

    @Override
    public void setDataProvider(DataProvider<T, ?> dataProvider) {
        this.dataProvider = dataProvider;
        refresh();
    }

    /**
     * Gets the data provider.
     *
     * @return the data provider, not {@code null}
     */
    public DataProvider<T, ?> getDataProvider() {
        return dataProvider;
    }

    /**
     * Returns the item enabled predicate.
     *
     * @return the item enabled predicate
     * @see #setItemEnabledProvider
     */
    public SerializablePredicate<T> getItemEnabledProvider() {
        return itemEnabledProvider;
    }

    /**
     * Sets the item enabled predicate for this radio button group. The
     * predicate is applied to each item to determine whether the item should be
     * enabled ({@code true}) or disabled ({@code false}). Disabled items are
     * displayed as grayed out and the user cannot select them. The default
     * predicate always returns true (all the items are enabled).
     *
     * @param itemEnabledProvider the item enable predicate, not {@code null}
     */
    public void setItemEnabledProvider(
            SerializablePredicate<T> itemEnabledProvider) {
        this.itemEnabledProvider = Objects.requireNonNull(itemEnabledProvider);
        refreshButtons();
    }

    /**
     * Returns the item component renderer.
     *
     * @return the item renderer
     * @see #setRenderer(ComponentRenderer)
     */
    public ComponentRenderer<? extends Component, T> getItemRenderer() {
        return itemRenderer;
    }

    /**
     * Sets the item renderer for this radio button group. The renderer is
     * applied to each item to create a component which represents the item.
     *
     * @param renderer the item renderer, not {@code null}
     */
    public void setRenderer(
            ComponentRenderer<? extends Component, T> renderer) {
        this.itemRenderer = Objects.requireNonNull(renderer);
        refreshButtons();
    }

    @Override
    public void onEnabledStateChanged(boolean enabled) {
        refreshButtons();
    }

    @Override
    public void setReadOnly(boolean readOnly) {
        isReadOnly = readOnly;
        if (isEnabled()) {
            refreshButtons();
        }
    }

    @Override
    public boolean isReadOnly() {
        return isReadOnly;
    }

    private void refresh() {
        removeAll();
        clear();
        getDataProvider().fetch(new Query<>()).map(this::createCheckbox)
                .forEach(this::add);
    }

    private Component createCheckbox(T item) {
        ItemCheckbox<T> button = new ItemCheckbox<>(item);
        button.addValueChangeListener(event -> {
            if (event.getValue()) {
                updateSelection(asSet(item), Collections.emptySet(), true);
            } else {
                updateSelection(Collections.emptySet(), asSet(item), true);
            }
        });
        updateButton(button);
        return button;
    }

    @SuppressWarnings("unchecked")
    private void refreshButtons() {
        getContent().getChildren().filter(ItemCheckbox.class::isInstance)
                .map(child -> (ItemCheckbox<T>) child)
                .forEach(this::updateButton);
    }

    private void updateButton(ItemCheckbox<T> button) {
        boolean enabled = !isReadOnly() && isEnabled()
                && getItemEnabledProvider().test(button.getItem());
        button.setEnabled(enabled);
        button.removeAll();
        button.add(getItemRenderer().createComponent(button.getItem()));
    }

    @Override
    protected void setPresentationValue(Set<T> newPresentationValue) {
        getContent().getChildren().filter(ItemCheckbox.class::isInstance)
                .map(child -> (ItemCheckbox<T>) child)
                .forEach(cb -> {
                    cb.setValue(newPresentationValue.contains(cb.getItem()));
                });
    }

    @Override
    public void updateSelection(Set<T> addedItems, Set<T> removedItems) {
        updateSelection(addedItems, removedItems, false);
    }

    private void updateSelection(Set<T> addedItems, Set<T> removedItems, boolean fromClient) {
        Objects.requireNonNull(addedItems, "added items cannot be null");
        Objects.requireNonNull(removedItems, "removed items cannot be null");

        addedItems.removeIf(removedItems::remove);
        Set<T> oldSelection = getSelectedItems();
        if (oldSelection.containsAll(addedItems)
                && Collections.disjoint(oldSelection, removedItems)) {
            return;
        }
        Set<T> selected = new LinkedHashSet<>(getValue());
        selected.removeAll(removedItems);
        selected.addAll(addedItems);

        setModelValue(selected, fromClient);
    }

    @Override
    public Set<T> getSelectedItems() {
        return Collections.unmodifiableSet(new LinkedHashSet<>(getValue()));
    }

    @Override
    public Registration addSelectionListener(MultiSelectionListener<CheckboxGroup<T>, T> listener) {
        return null;
    }

    private static <T> Set<T> asSet(T... items) {
        return new HashSet<>(Arrays.asList(items));
    }

}

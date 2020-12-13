import React from "react";
import * as R from "ramda";
import { v4 as uuid } from "uuid";

import { useForm, useList } from "./hooks";

const isNotEmpty = R.compose(R.not, R.isEmpty);

const newItemNameValidation = R.allPass([R.pipe(R.length, R.lte(3)), isNotEmpty]);

const newItemQuantityValidation = R.lt(0);

const newItemFormValidations = [
  ["quantity", newItemQuantityValidation],
  ["name", newItemNameValidation],
];

const newItemFormInitialValues = { name: "", quantity: 0 };

export function NewShoppingListItemForm({ handleNewItemFormSubmit }) {
  const form = useForm({
    initialValues: newItemFormInitialValues,
    validations: newItemFormValidations,
    onSubmit: handleNewItemFormSubmit,
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={form.values.name}
          onChange={form.handleOnChange("name")}
        />
      </label>
      <label>
        Quantity
        <input
          type="number"
          value={form.values.quantity}
          onChange={form.handleOnChange("quantity")}
        />
      </label>
      <button onClick={form.handleSubmit} disabled={!form.isValid}>
        Add Item
      </button>
    </form>
  );
}

export function ShoppingList(props) {
  const [shoppingList, setListThunks] = useList([]);

  return (
    <div>
      <h2>{props.listName}</h2>
      <span>Use the form below to add a new item to your shopping list.</span>
      <h3>Add New Item</h3>
      <NewShoppingListItemForm
        handleNewItemFormSubmit={R.pipe(
          R.merge({ key: uuid() }),
          setListThunks.newItem
        )}
      />
      <button onClick={setListThunks.withoutLastItem}>Delete Last Item</button>
      <button onClick={setListThunks.clear}>Reset Shopping List</button>
      <ul className="ShoppingList-list">
        {shoppingList.map((item) => (
          <li key={item.key} className="ShoppingList-item">
            <button
              className="ShoppingList-item-deleteButton"
              onClick={setListThunks.withoutItem(item.key)}
            >
              X
            </button>
            <span className="ShoppingList-item-name">
              {item.name} x {item.quantity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

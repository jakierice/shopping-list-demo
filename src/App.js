import React from "react";
import * as R from "ramda";
import { v4 as uuid } from "uuid";

import { useList, useForm } from "./hooks";

import "./App.css";

const newItemFormValidations = [
  R.propSatisfies(R.compose(R.not, R.isEmpty), "name"),
  R.propSatisfies(R.lt(0), "quantity"),
];

const newItemFormInitialValues = { name: "", quantity: 0 };

function NewShoppingListItemForm({ onNewItemSubmit }) {
  const form = useForm({
    initialValues: newItemFormInitialValues,
    validations: newItemFormValidations,
    onSubmit: R.pipe(R.merge({ key: uuid() }), onNewItemSubmit),
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

function ShoppingList(props) {
  const [shoppingList, setListThunks] = useList([]);
  return (
    <div>
      <h2>{props.listName}</h2>
      <span>Use the form below to add a new item to your shopping list.</span>
      <h3>Add New Item</h3>
      <NewShoppingListItemForm onNewItemSubmit={setListThunks.newItem} />
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

function App() {
  return (
    <div className="main-div">
      <ShoppingList listName="First List for HEB" />
    </div>
  );
}

export default App;

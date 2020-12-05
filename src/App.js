import React from "react";
import * as R from "ramda";
import { v4 as uuid } from "uuid";

import "./App.css";

function useShoppingListState(initialState) {
  const [list, setList] = React.useState(initialState);

  return {
    setListThunks: {
      newItem: ({ name, quantity }) => () =>
        setList(R.append({ key: uuid(), name, quantity })),

      withoutItem: (itemKey) => () =>
        setList(R.filter((item) => item.key !== itemKey)),

      withLastItem: () => setList(R.dropLast(1)),

      clear: () => setList([]),
    },

    shoppingList: list,
  };
}

function useForm({ onSubmit, initialValues, validations }) {
  const [values, setValues] = React.useState(initialValues);
  const isValid = R.allPass(validations)(values);

  const resetForm = () => {
    setValues(initialValues);
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (isValid) {
      onSubmit(values)();
      resetForm();
    }
  }

  return {
    values,
    isValid,
    handleSubmit,
    handleOnChange: (field) => (e) =>
      setValues(R.set(R.lensProp(field), e.target.value)),
  };
}

function NewShoppingListItemForm({ handleNewItemCreation }) {
  const validations = [
    R.propSatisfies(R.compose(R.not, R.isEmpty), "name"),
    R.propSatisfies(R.lt(0), "quantity"),
  ];

  const { isValid, handleSubmit, handleOnChange, values } = useForm({
    onSubmit: handleNewItemCreation,
    initialValues: { name: "", quantity: 0 },
    validations,
  });

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Item</h3>
      <label>
        Name
        <input
          type="text"
          value={values.name}
          onChange={handleOnChange("name")}
        />
      </label>
      <label>
        Quantity
        <input
          type="number"
          value={values.quantity}
          onChange={handleOnChange("quantity")}
        />
      </label>
      <button onClick={handleSubmit} disabled={!isValid}>
        Add Item
      </button>
    </form>
  );
}

function ShoppingList(props) {
  const { setListThunks, shoppingList } = useShoppingListState([]);

  return (
    <div>
      <h2>{props.listName}</h2>
      <NewShoppingListItemForm handleNewItemCreation={setListThunks.newItem} />
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

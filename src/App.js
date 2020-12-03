import React from "react"
import * as R from "ramda"
import { v4 as uuid } from "uuid"

import "./App.css"

const useShoppingListState = (initialState) => {
  const [list, setList] = React.useState(initialState)

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
  }
}

const useShoppingListItemForm = ({ onSubmit }) => {
  const [name, setName] = React.useState("")
  const [quantity, setQuantity] = React.useState(0)
  const isValid = R.allPass([
    R.propSatisfies(R.pipe(R.isEmpty, R.not), "name"),
    R.propSatisfies(R.lt(0), "quantity"),
  ])({ name, quantity })

  const resetForm = () => {
    setName("")
    setQuantity(0)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isValid) {
      onSubmit({ name, quantity })()
      resetForm()
    }
  }

  return {
    fields: {
      name: {
        value: name,
        handler: (e) => setName(e.target.value),
      },
      quantity: {
        value: quantity,
        handler: (e) => setQuantity(parseInt(e.target.value)),
      },
    },
    isValid,
    handleSubmit,
  }
}

function ShoppingList(props) {
  const { setListThunks, shoppingList } = useShoppingListState([])

  const { fields, isValid, handleSubmit } = useShoppingListItemForm({
    onSubmit: setListThunks.newItem,
  })

  return (
    <div>
      <h2>{props.listName}</h2>
      <form onSubmit={handleSubmit}>
        <h3>Add New Item</h3>
        <label>
          Name
          <input
            type="text"
            value={fields.name.value}
            onChange={fields.name.handler}
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            value={fields.quantity.value}
            onChange={fields.quantity.handler}
          />
        </label>
        <button onClick={handleSubmit} disabled={!isValid}>
          Add Item
        </button>
      </form>
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
  )
}

function App() {
  return (
    <div className="main-div">
      <ShoppingList listName="First List for HEB" />
    </div>
  )
}

export default App

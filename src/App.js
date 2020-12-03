import React from "react"
import { v4 as uuid } from "uuid"
import "./App.css"

const addItemToShoppingList = (itemName) => (shoppingList) =>
  shoppingList.concat({ key: uuid(), name: itemName })

const deleteItemFromShoppingList = (itemKey) => (shoppingList) =>
  shoppingList.filter((item) => item.key !== itemKey)

const deleteLastItemFromShoppingList = (shoppingList) =>
  shoppingList.filter((item, index) => index !== shoppingList.length - 1)

const emptyShoppingList = () => []

const useShoppingListState = (initialState) => {
  const [list, setList] = React.useState(initialState)

  return {
    setListStateWithNewItem: (itemName) => () =>
      setList(addItemToShoppingList(itemName)),

    setListStateWithoutItem: (itemKey) => () =>
      setList(deleteItemFromShoppingList(itemKey)),

    setListStateWithoutLastItem: () => setList(deleteLastItemFromShoppingList),

    clearListState: () => setList(emptyShoppingList),

    shoppingList: list,
  }
}

const useShoppingListItemForm = ({ setListStateWithNewItem }) => {
  const [newItemName, setNewItemName] = React.useState("")
  const validations = [newItemName.length === 0]
  const isValid = validations.includes(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isValid) {
      setListStateWithNewItem(newItemName)()
      setNewItemName("")
    }
  }

  return {
    fields: {
      name: {
        value: newItemName,
        handler: (e) => setNewItemName(e.target.value),
      },
    },
    isValid,
    handleSubmit,
  }
}

function ShoppingList(props) {
  const {
    setListStateWithNewItem,
    setListStateWithoutItem,
    setListStateWithoutLastItem,
    clearListState,
    shoppingList,
  } = useShoppingListState([])

  const { fields, isValid, handleSubmit } = useShoppingListItemForm({
    setListStateWithNewItem,
  })

  return (
    <div>
      <h1>{props.listName}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Item Name
          <input
            type="text"
            value={fields.name.value}
            onChange={fields.name.handler}
          />
        </label>
        <button onClick={handleSubmit} disabled={!isValid}>
          Add Item
        </button>
      </form>
      <button onClick={setListStateWithoutLastItem}>Delete Last Item</button>
      <button onClick={clearListState}>Reset Shopping List</button>
      <ul className="ShoppingList-list">
        {shoppingList.map((item) => (
          <li key={item.key} className="ShoppingList-item">
            {item.name}{" "}
            <button onClick={setListStateWithoutItem(item.key)}>X</button>
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

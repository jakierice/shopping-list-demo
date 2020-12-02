import React from "react"
import { v4 as uuid } from "uuid"
import "./App.css"

const addItemToShoppingList = (name) => (list) =>
  list.concat({ key: uuid(), name })

const deleteItemFromShoppingList = (itemKey) => (list) =>
  list.filter((item) => item.key !== itemKey)

const deleteLastItemFromShoppingList = (list) =>
  list.filter((_, index) => index !== list.length - 1)

function ShoppingList(props) {
  const [list, setList] = React.useState([])
  const [itemName, setItemName] = React.useState("")

  function handleFormSubmit(event) {
    event.preventDefault()

    setList(addItemToShoppingList(itemName))
    setItemName("")
  }

  return (
    <div>
      <h1>{props.listName}</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          New Item Name
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value.toUpperCase())}
          />
        </label>
        <button onClick={handleFormSubmit}>Add Item</button>
      </form>
      <button onClick={() => setList(deleteLastItemFromShoppingList)}>
        Delete Last Item
      </button>
      <ul className="ShoppingList-list">
        {list.map((listItem) => {
          return (
            <li key={listItem} className="ShoppingList-item">
              {listItem.name}{" "}
              <button
                onClick={() =>
                  setList(deleteItemFromShoppingList(listItem.key))
                }
              >
                X
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="main-div">
      <ShoppingList listName="First List for HEB" />
      <ShoppingList listName="Second List for Whole Foods" />
    </div>
  )
}

export default App

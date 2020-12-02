import React from "react"
import { v4 as uuid } from "uuid"
import "./App.css"

function ShoppingList(props) {
  const [list, setList] = React.useState([])
  const [itemName, setItemName] = React.useState("")

  function handleFormSubmit(event) {
    event.preventDefault()

    setList((previousListState) =>
      previousListState.concat({ key: uuid(), name: itemName })
    )
    setItemName("")
  }

  function handleDeleteItem(itemKey) {
    setList((prevList) => prevList.filter((item) => item.key !== itemKey))
  }

  function handleDeleteLastItem() {
    setList((prevList) =>
      prevList.filter((_, index) => index !== prevList.length - 1)
    )
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
      <button onClick={handleDeleteLastItem}>Delete Last Item</button>
      <ul className="ShoppingList-list">
        {list.map((listItem) => {
          return (
            <li key={listItem} className="ShoppingList-item">
              {listItem.name}{" "}
              <button onClick={() => handleDeleteItem(listItem.key)}>X</button>
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

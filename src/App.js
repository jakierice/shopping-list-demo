import React, { useState } from 'react'
import './App.css'

// 4. [X] move list state and form state into ShoppingList component
// 1. [X] use <form></form> for new item to get keyboard handling
// 2. [X] fix `handleDelete` functions (splice(-1, 1))
// 3. [X] refactor `handleDelete` functions to use Array.filter
// 5. add functionality to delete individual item (need uuid for key gen)
// 6. create list updater functions
// 7. create custom hooks for shopping list state and new item form state

const removeLastItemFromList = (list) =>
  list.filter((_, index) => index !== list.length - 1)

function ShoppingList(props) {
  const [list, setList] = useState([])

  const [itemName, setItemName] = useState('')


  function handleSubmit(event) {
    event.preventDefault()

    setList((previousListState) => previousListState.concat(itemName))
    setItemName('')
  }

  return (
    <div>
      <h1>{props.listName}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Item Name
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Add Item</button>
      </form>
      <button onClick={() => setList(removeLastItemFromList)}>Delete Last Item</button>
      <ul className="ShoppingList-list">
        {list.map((listItem) => {
          return (
            <li key={listItem} className="ShoppingList-item">
              {listItem}
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
    </div>
  )
}

export default App

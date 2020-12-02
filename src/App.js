import React from "react"
import "./App.css"

function ShoppingList(props) {
  const [list, setList] = React.useState([])
  const [itemName, setItemName] = React.useState("")

  function handleAddItem() {
    setList((previousListState) => previousListState.concat(itemName))
    setItemName("")
  }

  function handleDeleteItem(itemKey) {
    setList((prevList) => prevList.filter((item) => item !== itemKey))
  }

  function handleDeleteLastItem() {
    setList((prevList) =>
      prevList.filter((_, index) => index !== prevList.length - 1)
    )
  }

  return (
    <div>
      <h1>{props.listName}</h1>
      <label>
        New Item Name
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value.toUpperCase())}
        />
      </label>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleDeleteLastItem}>Delete Last Item</button>
      <ul className="ShoppingList-list">
        {list.map((listItem) => {
          return (
            <li key={listItem} className="ShoppingList-item">
              {listItem}{" "}
              <button onClick={() => handleDeleteItem(listItem)}>X</button>
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

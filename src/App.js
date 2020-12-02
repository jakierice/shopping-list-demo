import React, { useState } from "react"
import "./App.css"

function ShoppingList(props) {
  return (
    <div>
      <h1>{props.listName}</h1>
      <ul className="ShoppingList-list">
        {props.list.map((listItem) => {
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
  const [list, setList] = React.useState([])
  const [itemName, setItemName] = React.useState("")
  const [list1, setList1] = useState([])
  const [itemName1, setItemName1] = useState("")

  function handleAddItem() {
    setList((previousListState) => previousListState.concat(itemName))
    setItemName("")
  }

  function handleAddItem1() {
    setList1((previousListState) => previousListState.concat(itemName1))
    setItemName1("")
  }

  function handleDelete(i) {
    const newList = [...list]
    newList.splice(i, 1)
    setList(newList)
  }

  function handleDelete1(i) {
    const newList1 = [...list1]
    newList1.splice(i, 1)
    setList1(newList1)
  }

  return (
    <div className="main-div">
      <ShoppingList listName="First List for HEB" list={list1} />
      <label>
        New Item Name
        <input
          type="text"
          value={itemName1}
          onChange={(e) => setItemName1(e.target.value.toUpperCase())}
        />
      </label>
      <button onClick={handleAddItem1}>Add Item</button>
      <button onClick={handleDelete1}>Delete Item</button>
      <ShoppingList listName="Second List for Whole Foods" list={list} />
      <label>
        New Item Name
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value.toUpperCase())}
        />
      </label>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleDelete}>Delete Item</button>
    </div>
  )
}

export default App

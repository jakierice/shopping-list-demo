import React from "react"
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

  function handleAddItem() {
    setList((previousListState) => previousListState.concat(itemName));
    setItemName("");
  }

  return (
    <div>
      <ShoppingList
        listName="First List for HEB"
        list={["Meat", "Milk", "Crackers", "Cookies"]}
      />
      <label>
        New Item Name
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value.toUpperCase())}
        />
      </label>
      <button onClick={handleAddItem}>Add Item</button>
      <ShoppingList listName="Second List for Whole Foods" list={list} />
    
      <ShoppingList listName="Third List" list2={list} />
      <label>
        New Item Name
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value.toUpperCase())}
        />
      </label>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  )
}

export default App
import React, { useState } from "react";
import "./App.css";
import Popup from "./components/Popup";
import Name from './components/Name'
function App() {
  // State Hook - `useState`
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  const [buttonPopup, setButtonPopup] = useState(false);


  // Helper Functions

  /* Adds a new item to the list array*/
  function addItem() {
    // ! Check for empty item
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Add new item to items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to original state
    setNewItem("");
  }

  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }
  const markDone = (id) => {
    const newItem = items.map((item) => {
      if (items.id === id){
        return ({ ...items, status: !items.status })
      }
      return item;
    });
    setItems(newItem);
  }
   
  // Main part of app
  return (
    <div className="app">
      <div className="Header">
      <br></br><br></br>
      <h1>Le Todo List</h1>
      <Name></Name>
      <br></br>
      </div>
      <button className="Additems" onClick={()=>setButtonPopup(true)}>Add items</button>
     
      <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
        <h3 className="Pop">Add an item</h3>
      <input
        className="Greg"
        type="text"
        placeholder="Add an item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={() => addItem()}>Add</button>
     </Popup>
  
      <ul>
        {items.map((item) => {
          return (
            <div>
              <div>
                { item.status ? 'done' : '' }
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
                 <button
                  className="done"
                  onClick={(e) => markDone(item.id)}
                >
                  ✔️
                </button>
              </li>
              </div>
              {showEdit == item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
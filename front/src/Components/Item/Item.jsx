import React, { useEffect, useState } from 'react'
import styles from './Item.module.css'
import className from 'classnames'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Item() {

  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/home')
    .then(result => setItems(result.data))
    .catch(err => console.log(err))
  })

  const deleteItem = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/deleteItem/${id}`)
        .then(result => {
          console.log(result);
          setItems(items.filter(item => item._id !== id)); 
        })
        .catch(err => console.log(err));
    }
  };
  

  return (
    <div>
      <div className={styles["table-wrapper"]}>
        <Link to="/create" className={styles["add-item"]}>Add Item</Link>
        <table className={styles["fl-table"]}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Material</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item) => {
                return <tr>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.material}</td>
                  <td>
                    <Link to={`/update/${item._id}`} className={styles["update-user"]}>Update</Link>
                    <button className={styles["delete-user"]} onClick={() => deleteItem(item._id)}>Delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Item
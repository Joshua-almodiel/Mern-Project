import React, { useState } from 'react'
import styles from './CreateItem.module.css'
import classNames from 'classnames'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateItem() {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState()
  const [price, setPrice] = useState()
  const [material, setMaterial] = useState()
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createItem/", { product, quantity, price, material })
      .then(result => {
        console.log(result);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/home');
        }, 1500);
      })
      .catch(err => console.log(err));
  };


  return (
    <div className={styles["container"]}>
      <div className={styles["form-wrapper"]}>
        <div className={styles["form"]}>
          <form onSubmit={Submit}>
            <h2>Add Item</h2>
            <div className={styles["input-group"]}>
              <label htmlFor="product">Product: </label>
              <input type="text" placeholder='Enter the product' name='product' onChange={(e) => setProduct(e.target.value)} required/>
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="quantity">Quantity: </label>
              <input type="number" name='quantity' onChange={(e) => setQuantity(e.target.value)} required/>
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="price">Price: </label>
              <input type="number" name='price' onChange={(e) => setPrice(e.target.value)} required/>
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="material">Material: </label>
              <input type="text" name='material' onChange={(e) => setMaterial(e.target.value)} required/>
            </div>
            <button className={styles["btn"]}>Submit</button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className={styles["popup"]}>
          <div className={styles["popup-content"]}>
            <h3>Item Added Successfully</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateItem
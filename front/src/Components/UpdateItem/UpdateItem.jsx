import React, { useState, useEffect } from 'react';
import styles from './UpdateItem.module.css'
import classNames from 'classnames'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdateItem() {
  const { id } = useParams()
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState()
  const [price, setPrice] = useState()
  const [material, setMaterial] = useState()
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/getItem/' + id)
      .then(result => {
        console.log(result)
        setProduct(result.data.product)
        setQuantity(result.data.quantity)
        setPrice(result.data.price)
        setMaterial(result.data.material)
      })
      .catch(err => console.log(err))
  }, [])

  const Update = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/updateItem/" + id, { product, quantity, price, material })
      .then(result => {
        console.log(result)
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/home');
        }, 1500);
      })
      .catch(err => console.log(err))
  }


  return (
    <div className={styles["container"]}>
      <div className={styles["form-wrapper"]}>
        <div className={styles["form"]}>
          <form onSubmit={Update}>
            <h2>Update Item</h2>
            <div className={styles["input-group"]}>
              <label htmlFor="product">Product: </label>
              <input type="text" name='product' value={product} onChange={(e) => setProduct(e.target.value)} required />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="quantity">Quantity: </label>
              <input type="number" name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="price">Price: </label>
              <input type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="material">Material: </label>
              <input type="text" name='material' value={material} onChange={(e) => setMaterial(e.target.value)} required />
            </div>
            <button type='submit' className={styles["btn"]}>Update</button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className={styles["update"]}>
          <div className={styles["update-content"]}>
            <h3>Item Update Successfully</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateItem
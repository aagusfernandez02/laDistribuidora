import React, { useState, useEffect } from 'react';
import styles from './list.module.css';
import axios from 'axios';
import ListItem from '../listItem/ListItem';

const List = ({isAdmin, setIsOpen, setIdProductModal, refresh, setRefresh}) => {
  const [products, setProducts] = useState([]);

  useEffect( ()=>{
    const makeRequest = async()=>{
      try {
        const res = await axios.get("https://ladistribuidora.herokuapp.com/api/products");
        // console.log(res);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest();
  },[refresh]);

  return (
    <>
      <div className={styles.headers}>
          <p>Imagen</p>
          <p>Producto</p>
          <p>Marca</p>
          <p>Tamaño</p>
          <p>Precio</p>
      </div>
      <div className={styles.table}>
        {
          products.map(product => (
            <ListItem 
              isAdmin={isAdmin} 
              key={product._id} 
              producto={product}
              setIsOpen={setIsOpen}
              setIdProductModal={setIdProductModal}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))
        }
      </div>
    </>
  )
}

export default List
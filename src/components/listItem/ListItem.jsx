import React, { useState } from "react";
import styles from "./listItem.module.css";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';

const ListItem = ({ producto, isAdmin, setIsOpen, setIdProductModal, setRefresh, refresh }) => {
  const handleClick = () => {
    setIsOpen(true);
    setIdProductModal(producto._id);
  };
  const handleClickDelete = async() => {
    // setIsOpen(true);
    try {
      await axios.delete(`https://ladistribuidora.herokuapp.com/api/products/${producto._id}`)
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {isAdmin && (
        <>
          <div className={`${styles.editIcon} ${styles.edit}`} onClick={handleClick}>
            <FiEdit2 />
          </div>
          <div className={`${styles.editIcon} ${styles.delete}`} onClick={handleClickDelete}>
            <AiFillDelete />
          </div>
        </>
      )}
      <div className={`${styles.listItem} ${!(producto.stock) && styles.noStock}`}>
        <img
          className={styles.listItem_item}
          src={producto.img}
          alt={`Imagen del producto ${producto.producto} - ${producto.marca} - ${producto.tamanio} `}
        />
        <p className={styles.listItem_item}>{producto.producto}</p>
        <p className={styles.listItem_item}>{(producto.marca).toString().charAt(0).toUpperCase() +
                    (producto.marca).toString().slice(1)}</p>
        <p className={styles.listItem_item}>{producto.tamanio}</p>
        <p className={styles.listItem_item}>{producto.precio}</p>
      </div>
    </div>
  );
};

export default ListItem;

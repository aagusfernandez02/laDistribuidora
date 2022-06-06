import React, { useState, useEffect } from "react";
import styles from "./list.module.css";
import ListItem from "../listItem/ListItem";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const List = ({
  products,
  marcas,
  isAdmin,
  setIsOpen,
  setIdProductModal,
  refresh,
  setRefresh,
  setMarcaProductos,
  marcaProductos
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <>
      <div className={styles.headers}>
        <p>Imagen</p>
        <p>Producto</p>
        <div
          className={styles.marcas_btn}
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          <p>Marca{(marcaProductos!=="all") && <span className={styles.marcaSeleccionada}>({(marcaProductos).toString().charAt(0).toUpperCase() +
                    (marcaProductos).toString().slice(1)})</span>}</p>
          <IoMdArrowDropdownCircle className={`${styles.dropdown_btn} ${dropDownOpen && styles.dropdown_btn_active}`}/>
          {dropDownOpen && <DropDownMenu marcas={marcas} setMarcaProductos={setMarcaProductos} refresh={refresh} setRefresh={setRefresh}/>}
        </div>
        <p>Tamaño</p>
        <p>Precio</p>
      </div>
      <div className={styles.table}>
        {products.map((product) => (
          <ListItem
            isAdmin={isAdmin}
            key={product._id}
            producto={product}
            setIsOpen={setIsOpen}
            setIdProductModal={setIdProductModal}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ))}
      </div>
    </>
  );
};

const DropDownMenu = ({ marcas, setMarcaProductos, refresh, setRefresh }) => {
  return (
    <div className={styles.dropdown}>
      <span 
        className={styles.menu_item}
        onClick={()=>{setMarcaProductos("all"); setRefresh(!refresh)}}
      >
        Todos
      </span>
      {marcas.map((marca) => (
        <span 
          className={styles.menu_item} 
          key={marca._id}
          onClick={()=>{setMarcaProductos(marca.marca); setRefresh(!refresh)}}
        >
          {marca.marca.toString().charAt(0).toUpperCase() +
            marca.marca.toString().slice(1)}
        </span>
      ))}
    </div>
  );
};

export default List;

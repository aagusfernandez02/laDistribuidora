import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import styles from "./modalNewProduct.module.css";
import { Formik } from "formik";

const ModalNewProduct = ({ closeModal, setMustRefresh, mustRefresh }) => {
  const [refresh, setRefresh] = useState(false);
  

  const postearProducto = async (valores) => {
    try {
      if (localStorage.getItem("isAdmin") == "true") {
        const body = {
          producto: valores.producto,
          marca: valores.marca,
          tamanio: valores.tamanio,
          precio: valores.precio,
          img: valores.img,
        };
        console.log(body);
        const res = await axios.post(
          `http://localhost:5000/api/products/`,
          body
        );
        setRefresh(!refresh);
        setMustRefresh(!mustRefresh);
      } else {
        console.log("Acceso no autorizado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            producto: "",
            marca: "",
            tamanio: "",
            precio: "",
            img: "",
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.producto) {
              errores.producto = "Debe ingresar un producto";
            }
            if (!valores.marca) {
              errores.marca = "Debe ingresar una marca";
            }
            if (!valores.tamanio) {
              errores.tamanio = "Debe ingresar un tamaño";
            }
            if (!valores.precio) {
              errores.precio = "Debe ingresar un precio";
            }
            if (!valores.img) {
              errores.img = "Debe ingresar una URL de imagen";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            postearProducto(valores);
            console.log("FORMULARIO ENVIADO");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label htmlFor="producto">Producto</label>
                <input
                  type="text"
                  id="producto"
                  name="producto"
                  placeholder="Jugo manzana, Pepas, etc"
                  value={values.producto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.producto && errors.producto && (
                  <div className={styles.errorMsg}>{errors.producto}</div>
                )}
              </div>
              <div>
                <label htmlFor="marca">Marca</label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  placeholder="Baggio, Tia Maruca, etc"
                  value={values.marca}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.marca && errors.marca && <div className={styles.errorMsg}>{errors.marca}</div>}
              </div>
              <div>
                <label htmlFor="tamanio">Tamaño</label>
                <input
                  type="text"
                  id="tamanio"
                  name="tamanio"
                  placeholder="200cc (pack x18), 300g, etc"
                  value={values.tamanio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.tamanio && errors.tamanio && (
                  <div className={styles.errorMsg}>{errors.tamanio}</div>
                )}
              </div>
              <div>
                <label htmlFor="precio">Precio</label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  placeholder="$..."
                  value={values.precio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.precio && errors.precio && <div className={styles.errorMsg}>{errors.precio}</div>}
              </div>
              <div>
                <label htmlFor="img">URL Imagen</label>
                <div className={styles.form_imageInput}>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    placeholder="https://hostingIMG/img/Baggio.png"
                    value={values.img}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <img src={values.img} alt="Imagen del producto" />
                </div>

                {touched.img && errors.img && <div className={styles.errorMsg}>{errors.img}</div>}
              </div>
              <button type="submit">ENVIAR</button>
            </form>
          )}
        </Formik>
        <button className={styles.modal_closeButton} onClick={closeModal}>
          X
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ModalNewProduct;

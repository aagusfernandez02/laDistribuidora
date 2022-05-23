import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import styles from "./modal.module.css";
import { Formik } from "formik";

const Modal = ({ idProductModal, closeModal, setMustRefresh, mustRefresh }) => {
  const [product, setProduct] = useState({});
  const [refresh, setRefresh] = useState(false);
  

  const actualizarProducto = async (valores) => {
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
        const res = await axios.put(
          `https://ladistribuidora.herokuapp.com/api/products/${idProductModal}`,
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

  useEffect(() => {
    const requestProduct = async () => {
      try {
        const res = await axios.get(
          `https://ladistribuidora.herokuapp.com/api/products/${idProductModal}`
        );
        setProduct(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    requestProduct();
  }, [refresh]);

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            producto: product.producto ? product.producto : "",
            marca: product.marca ? product.marca : "",
            tamanio: product.tamanio ? product.tamanio : "",
            precio: product.precio ? product.precio : "",
            img: product.img ? product.img : "",
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
            if (
              valores.producto === product.producto &&
              valores.marca === product.marca &&
              valores.tamanio === product.tamanio &&
              valores.precio === product.precio &&
              valores.img === product.img
            ) {
              console.log("Producto no modificado");
            } else {
              actualizarProducto(valores);
            }
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

export default Modal;

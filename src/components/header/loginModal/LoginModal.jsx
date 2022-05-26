import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import styles from "./loginModal.module.css";
import { Formik } from "formik";

const LoginModal = ({ closeModal, setIsAdmin, setIsSigned }) => {
  const [register, setRegister] = useState(false);

  const loginUser = async (valores) => {
    try {
      const body = {
        username: valores.username,
        password: valores.password,
      };
      const res = await axios.post(
        "https://ladistribuidora.herokuapp.com/api/auth/login",
        body
      );
      closeModal();
      console.log(res);
      setIsSigned(true);
      if (res.data.isAdmin) {
        setIsAdmin(true);
      }
      window.alert("Sesión iniciada correctamente. Bienvenido");
      localStorage.setItem("user",JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (valores) => {
    try {
      const body = {
        username: valores.username,
        password: valores.password,
        name: valores.name,
      };
      const res = await axios.post(
        "https://ladistribuidora.herokuapp.com/api/auth/register",
        body
      );
      closeModal();
      console.log(res);
      setIsSigned(true);
      if (res.data.isAdmin) {
        setIsAdmin(true);
      }
      window.alert("Registrado correctamente. Bienvenido");
      localStorage.setItem("user",JSON.stringify(res.data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        {register && (
          <Formik
            initialValues={{
              username: "",
              password: "",
              name: "",
            }}
            validate={(valores) => {
              let errores = {};

              if (valores.name === "") {
                errores.name = "Debe ingresar un nombre";
              }
              if (valores.username === "") {
                errores.username = "Debe ingresar un username";
              }
              if (valores.password === "") {
                errores.password = "Debe ingresar una contraseña";
              }

              return errores;
            }}
            onSubmit={(valores) => {
              console.log("FORMULARIO DE REGISTRO ENVIADO");
              console.log(
                valores.name +
                  " | " +
                  valores.password +
                  " | " +
                  valores.username
              );
              registerUser(valores);
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
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Agustín Fernandez"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <div className={styles.errorMsg}>{errors.name}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.username && errors.username && (
                    <div className={styles.errorMsg}>{errors.username}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <div className={styles.errorMsg}>{errors.password}</div>
                  )}
                </div>
                <p className={styles.text_cambiarSignLogin}>
                  Ya tienes una cuenta?{" "}
                  <span onClick={() => setRegister(false)}>Inicia sesión</span>
                </p>
                <button type="submit" className={styles.form_buttonRegister}>
                  REGISTRARSE
                </button>
              </form>
            )}
          </Formik>
        )}
        {!register && (
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(valores) => {
              let errores = {};

              if (valores.username === "") {
                errores.username = "Debe ingresar un username";
              }
              if (valores.password === "") {
                errores.password = "Debe ingresar una contraseña";
              }
              return errores;
            }}
            onSubmit={(valores) => {
              console.log("FORMULARIO DE LOGIN ENVIADO");
              loginUser(valores);
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
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.username && errors.username && (
                    <div className={styles.errorMsg}>{errors.username}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <div className={styles.errorMsg}>{errors.password}</div>
                  )}
                </div>
                <p className={styles.text_cambiarSignLogin}>
                  No tienes una cuenta?{" "}
                  <span onClick={() => setRegister(true)}>Registrate</span>
                </p>
                <button type="submit" className={styles.form_buttonLogin}>
                  LOGIN
                </button>
              </form>
            )}
          </Formik>
        )}
        <button className={styles.modal_closeButton} onClick={closeModal}>
          X
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default LoginModal;

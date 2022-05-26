import "./App.css";
import Header from "./components/header/Header";
import List from "./components/list/List";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import ModalNewProduct from "./components/header/modalNewProduct/ModalNewProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSigned, setIsSigned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNewProduct, setIsOpenNewProduct] = useState(false);
  const [idProductModal, setIdProductModal] = useState("");
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    if (localStorage.getItem("isSigned") === "true") {
      setIsSigned(true);
    }
    if (localStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem("isAdmin", "true");
    } else {
      localStorage.setItem("isAdmin", "false");
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isSigned) {
      localStorage.setItem("isSigned", "true");
    } else {
      localStorage.setItem("isSigned", "false");
    }
  }, [isSigned]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header
        isAdmin={isAdmin}
        isSigned={isSigned}
        setIsAdmin={setIsAdmin}
        setIsSigned={setIsSigned}
        setIsOpenNewProduct={setIsOpenNewProduct}
        openModal={setIsOpen}
      />
      <List
        isAdmin={isAdmin}
        setIsOpen={setIsOpen}
        setIdProductModal={setIdProductModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      {isOpen && (
        <Modal
          idProductModal={idProductModal}
          closeModal={() => setIsOpen(false)}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {isOpenNewProduct && (
        <ModalNewProduct
          closeModal={() => setIsOpenNewProduct(false)}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}

export default App;

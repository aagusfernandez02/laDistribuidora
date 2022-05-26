import "./App.css";
import Header from "./components/header/Header";
import List from "./components/list/List";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import ModalNewProduct from "./components/header/modalNewProduct/ModalNewProduct";

function App() {
  const [isSigned, setIsSigned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNewProduct, setIsOpenNewProduct] = useState(false);
  const [idProductModal, setIdProductModal] = useState("");
  const [mustRefresh, setMustRefresh] = useState(false);

  useEffect(() => {
    if( localStorage.getItem("isSigned") === "true" ){
      setIsSigned(true);
    } 
    if( localStorage.getItem("isAdmin") === "true" ){
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
        mustRefresh={mustRefresh}
        setMustRefresh={setMustRefresh}
      />
      {isOpen && (
        <Modal
          idProductModal={idProductModal}
          closeModal={() => setIsOpen(false)}
          mustRefresh={mustRefresh}
          setMustRefresh={setMustRefresh}
        />
      )}
      {isOpenNewProduct && (
        <ModalNewProduct
          closeModal={() => setIsOpenNewProduct(false)}
          mustRefresh={mustRefresh}
          setMustRefresh={setMustRefresh}
        />
      )}
    </>
  );
}

export default App;

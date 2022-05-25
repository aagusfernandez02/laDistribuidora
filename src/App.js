import "./App.css";
import Header from "./components/header/Header";
import List from "./components/list/List";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
      localStorage.setItem("user", "");

    }
  }, [isSigned]);

  return (
    <Router>
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
    </Router>
  );
}

export default App;

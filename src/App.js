import "./App.css";
import Header from "./components/header/Header";
import List from "./components/list/List";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import ModalNewProduct from "./components/header/modalNewProduct/ModalNewProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [marcaProductos, setMarcaProductos] = useState("all");

  const [isSigned, setIsSigned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNewProduct, setIsOpenNewProduct] = useState(false);
  const [idProductModal, setIdProductModal] = useState("");

  // FETCH PRODUCTS
  useEffect( ()=>{
    const makeRequest = async()=>{
      try {
        let res = "";
        if( marcaProductos!=="all" ){
          res = await axios.get(`https://ladistribuidora.herokuapp.com/api/products?marca=${marcaProductos}`);
        }else{
          res = await axios.get("https://ladistribuidora.herokuapp.com/api/products");
          // Si quiero ordenar por producto:
          // res.data.sort((a,b)=>(a.producto > b.producto?1:-1));
          // Si quiero ordenar por marca:
          res.data.sort((a,b)=>(a.marca > b.marca?1:-1));
          // Si quiero ordenar por precio:
          // res.data.sort((a,b)=>(a.precio > b.precio?1:-1));
        }
        setProducts(res.data);
        // setRefresh(!refresh);
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest();
  },[refresh]);

  // FETCH MARCAS
  useEffect( ()=>{
    const makeRequest = async()=>{
      try {
        const res = await axios.get("https://ladistribuidora.herokuapp.com/api/marcas");
        res.data.sort((a,b)=>(a.marca > b.marca?1:-1));
        setMarcas(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest();
  },[refresh]);

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
        products={products}
        marcas={marcas}
        setMarcaProductos={setMarcaProductos}
        marcaProductos={marcaProductos}
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

import React, { useState } from "react";
import styles from "./header.module.css";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import LoginModal from "./loginModal/LoginModal";
import { AiFillPlusCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

const Header = ({ isSigned, setIsSigned, isAdmin, setIsAdmin, openModal, setIsOpenNewProduct }) => {
  const [isOpen, setIsOpen] = useState(false);


  const renderIconProfile = () => {
    if (isAdmin && isSigned) {
      return (
        <div className={styles.header_admin}>
          <AiFillPlusCircle
            onClick={()=>setIsOpenNewProduct(true)}
            data-tip
            data-for="addProduct"
          />
          <RiAdminFill
            onClick={() => {
              setIsSigned(false);
              setIsAdmin(false);
            }}
            data-tip
            data-for="signout"
          />
          <ReactTooltip id="addProduct" className={styles.tooltip}>
            AÑADIR PRODUCTO
          </ReactTooltip>
          <ReactTooltip
            id="signout"
            multiline={false}
            className={styles.tooltip}
          >
            CERRAR SESIÓN
          </ReactTooltip>
        </div>
      );
    } else if (isSigned) {
      return (
        <>
          <p className={styles.saludo}>Hola {JSON.parse(localStorage.getItem("user")).name}!</p>
          <BiUserMinus
            data-tip
            data-for="signout"
            onClick={() => setIsSigned(false)}
          />
          <ReactTooltip
            id="signout"
            multiline={false}
            className={styles.tooltip}
          >
            CERRAR SESIÓN
          </ReactTooltip>
        </>
      );
    } else {
      return (
        <>
          <BiUserPlus
            data-tip
            data-for="login"
            onClick={() => setIsOpen(true)}
          />

          <ReactTooltip id="login" multiline={false} className={styles.tooltip}>
            ACCEDER
          </ReactTooltip>
        </>
      );
    }
  };

  return (
    <header>
      <div className={styles.header_logo}>
        <p>
          La<span>Distribuidora</span>
        </p>
      </div>

      <div className={styles.header_user}>{renderIconProfile()}</div>

      {isOpen && (
        <LoginModal
          closeModal={() => setIsOpen(false)}
          setIsAdmin={setIsAdmin}
          setIsSigned={setIsSigned}
        />
      )}
    </header>
  );
};

export default Header;

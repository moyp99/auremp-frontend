import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "react-feather";
import Image from "next/image";
import styles from "../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === "/";

  function clickToggle(e) {
    e.preventDefault();
    setToggle(!toggle);
  }

  var icon;
  if (!toggle) {
    icon = <Menu width="38" height='38' />;
  } else {
    icon = <X width="38" height='38' />;
  }

  return (
    <div className={styles.nav}>
      <a className={styles.logo}>
        <div className={styles.img}>
          <Image
            src="/auremp-logo.png"
            alt="Picture of the author"
            width='40'
            height='40'
          />
        </div>

        <p>AUREMP</p>
      </a>
      <div
        className={`${styles.items} ${toggle === true ? styles.responsive : ""}`}
      >
        <ul>
          <li>
            <Link href={`/`}>INICIO</Link>
            {router.pathname === "/" && <div className={styles.line}></div>}
          </li>
          <li>
            <Link href={`/productos/aceite-sublingual-1000mg`}>Aceites</Link>
            {router.asPath === `/productos/aceite-sublingual-1000mg` && <div className={styles.line}></div>}
            
          </li>
          <li>
            <Link href={`/productos/gomitas-cbd`}>Gomitas</Link>
            {router.asPath === `/productos/gomitas-cbd` && <div className={styles.line}></div>}
          </li>
          <li>
            <Link href={`/productos/balsamo-cbd-sports`}>Balsamo</Link>
            {router.asPath === `/productos/balsamo-cbd-sports` && <div className={styles.line}></div>}
          </li>
          <li>
            <Link href={`/productos/crema-antiedad`}>Crema antiedad</Link>
            {router.asPath === `/productos/crema-antiedad` && <div className={styles.line}></div>}
          </li>
          {/* <li><Link href='#'>Suplementos</Link></li> */}
        </ul>
        <div className={styles.icons}>
          <Link href={`/cart`}>
            <ShoppingCart />
          </Link>
          {/* <Search/> */}
        </div>
      </div>
      <button className={styles.menu} onClick={clickToggle}>
        {icon}
      </button>
    </div>
  );
};

export default Navbar;

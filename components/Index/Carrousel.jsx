import React from "react";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "../../utils/urls";

const Carrousel = ({ img_url, text1, text2, text3, description, slug }) => {
  return (
    <div className={styles.carrousel}>
      <div className={styles.product}>
        <div className={styles.auremp_back}>
          <img src="/auremp-logo.png" alt="Picture of the author" />
        </div>
        <div className={styles.product_img}>
          <img src={`${API_URL}${img_url}`} alt="Picture of the author" />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.info_bg}></div>
        <p className={styles.slogan}>Enfocate en tu bienestar</p>
        <h2>
          {text1} <span className="gold_text">{text2}</span>
          {text3}
        </h2>
        <p>{description}</p>


        <Link href={`/productos/${slug}`}>
        <a className="btn btn-primary">Comprar</a>
        
        </Link>
      </div>
    </div>
  );
};

export default Carrousel;

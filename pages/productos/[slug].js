import Head from "next/head";
import { twoDecimals } from "../../utils/format";
import { API_URL } from "../../utils/urls";
import { CheckCircle, Slash, UserCheck } from "react-feather";
import styles from "../../styles/Slug.module.scss";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { useRouter } from "next/router";

const Product = ({ product }) => {
  const [currentImg, setCurrentImg] = useState("");
  const { addItemToCart } = useContext(AppContext);
  const path = useRouter().asPath;
  const [actualNav, setActualNav] = useState(0);

  useEffect(() => {
    setCurrentImg(`${API_URL}${product.imagenes[0].url}`);
  }, [path]);

  const handleNav = (direction) => {
    if (direction === "right") {
      if (actualNav === product.imagenes.length - 1) {
        setActualNav(0);
      } else {
        setActualNav(actualNav + 1);
      }
    } else {
      if (actualNav === 0) {
        setActualNav(product.imagenes.length - 1);
      } else {
        setActualNav(actualNav - 1);
      }
    }
    setCurrentImg(`${API_URL}${product.imagenes[actualNav].url}`);
  };

  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <div className={styles.main}>
        <div className={styles.thumbnails}>
          {product.imagenes &&
            product.imagenes.map((imagen, i) => (
              <div
                key={i}
                className={styles.tnail_image}
                onClick={() => setCurrentImg(`${API_URL}${imagen.url}`)}
              >
                <img src={`${API_URL}${imagen.formats.thumbnail.url}`}></img>
              </div>
            ))}
        </div>
        <div className={styles.image}>
          <div className={styles.nav} onClick={() => handleNav("left")}>
            <img src="/leftg.png" alt="Picture of the author" />
          </div>
          <div className={styles.current_image}>
            <img
              src={currentImg ? ` ${currentImg}` : "/lifestyle.jpg"}
              alt="Picture of the author"
            />
          </div>
          <div className={styles.nav} onClick={() => handleNav("right")}>
            <img src="/right.png" alt="Picture of the author" />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.top}>
            <h3>{product.nombre}</h3>
            <p className={styles.price}>$ {twoDecimals(product.precio)} MXN</p>
            <p>{product.contenido}</p>
          </div>

          <div className={styles.bottom}>
            <button
              className="btn btn-primary"
              onClick={() => {
                addItemToCart(product);
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      <div className={styles.banner}>
        <h3>
          Cuidamos cada <span className="gold_text">detalle</span> de nuestros
          productos
        </h3>
        <div className={styles.legends}>
          <p>
            {" "}
            <Slash /> Sin pruebas en animales
          </p>{" "}
          <p>
            {" "}
            <CheckCircle /> Avalados por COFEPRIS
          </p>{" "}
          <p>
            {" "}
            <UserCheck /> Eficazia comprobada.
          </p>
        </div>
      </div>
      {/* <img src={`${API_URL}product.imagen_principal)}></img> */}
      <div className={styles.brief}>
        <div className={styles.container}>
          <h3>Ficha Técnica</h3>
          <div className={styles.image}>
            <img
              src={`${API_URL}${product.info.url}`}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  // const res = await axios.post(
  //   "https://strapi-auremp.herokuapp.com/auth/local/",
  //   {
  //     identifier: "aurempmoises@gmail.com",
  //     password: "Auremp2021!",
  //   }
  // );

  // const product_res = await axios.get(
  //   `https://strapi-auremp.herokuapp.com/productos/?slug=${slug}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${res.data.jwt}`,
  //     },
  //   }
  // );

  const product_res = await axios.get(
    `https://strapi-auremp.herokuapp.com/productos/?slug=${slug}`
  );

  // const product_res = await fetch();
  const found = await product_res.data;

  return {
    props: {
      product: found[0], //Because the API response for filters is an array
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all the possible paths
  // const res = await axios.post(
  //   "https://strapi-auremp.herokuapp.com/auth/local/login",
  //   {
  //     identifier: "",
  //     password: "",
  //   }
  // );

  // const product_res = await axios.get(
  //   `https://strapi-auremp.herokuapp.com/productos/`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${res.data.jwt}`,
  //     },
  //   }
  // );

  const product_res = await axios.get(
    `https://strapi-auremp.herokuapp.com/productos/`
  );

  // const product_res = await fetch(`${API_URL}/productos/`);
  const products = await product_res.data;

  //Return them to NextJs context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, //Tells nextjs to show a 404 if the param doesnt exist
  };
}

export default Product;

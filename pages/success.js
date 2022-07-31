import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import styles from "../styles/Feedback.module.scss";

const success = ({
  payment_id,
  merchant_order_id,
  collection_status,
  data,
}) => {
  const { cartArray, cartTotal } = useContext(AppContext);

  useEffect(async () => {
    // const auxArray = JSON.parse(window.localStorage.getItem("cartArray"));
    // const shipping = JSON.parse(window.localStorage.getItem("shippingInfo"));
    // const totalCost = window.localStorage.getItem("totalCost");

    const pedidos = await axios.put(
      `http://localhost:1337/ordens/${JSON.parse(window.localStorage.getItem("currentOrder")).data.id}`,
      {
        
        payment_id: payment_id,
        merchant_order_id: merchant_order_id,
        collection_status: collection_status,
        
      },
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

  }, []);

  return (
    <div className={styles.feedback}>
      
      <h1>¡Gracias por tu compra!</h1>
      <h2>En breve recibirás un correo de confirmación</h2>
    </div>
  );
};

success.getInitialProps = async ({ query }) => {
  const { payment_id, merchant_order_id, collection_status } = query;

  const { data } = await axios.post("https://strapi-auremp.herokuapp.com/auth/local", {
    identifier: process.env.STRAPI_IDENTIFIER,
    password: process.env.STRAPI_PASSWORD,
  });

  return { payment_id, merchant_order_id, collection_status, data };
};

export default success;

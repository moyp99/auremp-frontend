import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import styles from "../styles/Feedback.module.scss";

const failure = ({
  payment_id,
  merchant_order_id,
  collection_status,
  data,
}) => {
  useEffect(async () => {
    // const auxArray = JSON.parse(window.localStorage.getItem("cartArray"));
    // const shipping = JSON.parse(window.localStorage.getItem("shippingInfo"));
    // const totalCost = window.localStorage.getItem("totalCost");

    const pedidos = await axios.put(
      `http://localhost:1337/ordens/${
        JSON.parse(window.localStorage.getItem("currentOrder")).data.id
      }`,
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
      <h1>¡Pago Rechazado!</h1>
      <h2>Intenta con otra forma de pago o intenta más tarde.</h2>
    </div>
  );
};

failure.getInitialProps = async ({ query }) => {
  const { payment_id, merchant_order_id, collection_status } = query;

  const { data } = await axios.post(
    "https://strapi-auremp.herokuapp.com/auth/local",
    {
      identifier: process.env.STRAPI_IDENTIFIER,
      password: process.env.STRAPI_PASSWORD,
    }
  );

  return { payment_id, merchant_order_id, collection_status, data };
};

export default failure;

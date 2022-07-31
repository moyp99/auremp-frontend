import React from "react";
import styles from "../../styles/Cart.module.scss";

const PriceInfo = ({ ship_cost, total_cost }) => {
  return (
    <div className={styles.price_info}>
      <p className={styles.ship_info}>
      ENVIO GRATIS
        {/* ENVIO GRATIS EN PEDIDOS MAYORES A <b>$1590.00</b> */}
      </p>
      <div className={styles.costs}>
        <div>
          <p>costo de envio:</p>
          <p>Total con envio:</p>
        </div>
        <div className={styles.cost}>
          <p>{ship_cost}</p>
          <p className={styles.total}>$ {total_cost}</p>
          <p className={styles.mxn}>MXN</p>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;

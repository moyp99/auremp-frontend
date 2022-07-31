import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/Cart.module.scss";
import AppContext from "../../context/AppContext";
import axios from "axios";

const Summary = ({ setReview, review, token }) => {
  const { checkoutBtn, cartArray, cartTotal, setShippingInfo, shippingInfo } =
    useContext(AppContext);

  const handleShipping = async (e) => {
    e.preventDefault();
    window.localStorage.setItem(
      "shippingInfo",
      JSON.stringify({
        email: e.target.email.value,
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        empresa: e.target.empresa.value,
        domicilio: e.target.domicilio.value,
        ciudad: e.target.ciudad.value,
        estado: e.target.estado.value,
        codigoPostal: e.target.codigoPostal.value,
        telefono: e.target.telefono.value,
      })
    );
    setShippingInfo(JSON.parse(window.localStorage.getItem("shippingInfo")));
    setReview(true);

    const auxArray = JSON.parse(window.localStorage.getItem("cartArray"));
    const shipping = JSON.parse(window.localStorage.getItem("shippingInfo"));
    const totalCost = window.localStorage.getItem("totalCost");

    window.localStorage.setItem("currentOrder", await axios.post(
      "http://localhost:1337/ordens",
      {
        total: totalCost,
        mail: shipping.email,
        productos: auxArray,
        direccion: `${shipping.nombre} ${shipping.apellido}, 
            ${shipping.domicilio}, ${shipping.ciudad}
            ${shipping.estado} ${shipping.codigoPostal}, Tel.: ${shipping.telefono}`,

        telefono: shipping.telefono,
        descripcion: auxArray
          .map(
            (product) =>
              `nombre: ${product.nombre}, cantidad: ${product.cartQuantity} `
          )
          .toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    ).then((res)=>{
      return JSON.stringify(res);
    }));

    

  };

  return (
    <div className={styles.sum}>
      {!review ? (
        <div className={styles.shipping_info}>
          <form onSubmit={(e) => handleShipping(e)}>
            <p> Información de contacto </p>
            <input
              type="email"
              id="email"
              // name="email"
              autoComplete="email"
              className={styles.sum_mail}
              placeholder="Email"
              required
            ></input>
            <p>Dirección de envio</p>
            <div className={styles.fullname}>
              <input
                id="nombre"
                autoComplete="nombre"
                type="text"
                className=""
                placeholder="Nombre"
                required
              ></input>
              <input
                id="apellido"
                autoComplete="apellido"
                type="text"
                className=""
                placeholder="Apellido"
                required
              ></input>
            </div>
            <input
              id="empresa"
              autoComplete="empresa"
              type="text"
              className=""
              placeholder="Empresa (opcional)"
            ></input>
            <input
              id="domicilio"
              autoComplete="domicilio"
              type="text"
              required
              className=""
              placeholder="Domicilio"
            ></input>
            <input
              id="ciudad"
              autoComplete="ciudad"
              type="text"
              className=""
              required
              placeholder="Ciudad"
            ></input>
            <div className={styles.zipcode}>
              <input
                type="text"
                id="estado"
                autoComplete="estado"
                required
                className=""
                placeholder="Estado"
              ></input>
              <input
                type="number"
                id="codigoPostal"
                autoComplete="codigoPostal"
                className=""
                required
                placeholder="Codigo Postal"
              ></input>
            </div>
            <input
              id="telefono"
              autoComplete="telefono"
              type="number"
              className=""
              placeholder="Número de Teléfono (10 digitos)"
              required
            ></input>

            <button className="btn btn-primary" type="submit">Ir a revisar compra</button>
          </form>
        </div>
      ) : (
        <div className={styles.shipping_review}>
          <table>
            <tbody>
              <tr>
                <td>Contacto:</td>
                <td>
                  Email: {shippingInfo.email}{" "}
                  {shippingInfo.telefono && <br></br>}
                  {shippingInfo.telefono && `Tel: ${shippingInfo.telefono}`}
                </td>
              </tr>
              <tr>
                <td>Enviar a:</td>
                <td>
                  {shippingInfo.nombre} {shippingInfo.apellido},{" "}
                  {shippingInfo.domicilio}, {shippingInfo.ciudad}{" "}
                  {shippingInfo.estado} {shippingInfo.codigoPostal}
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.pay} ref={checkoutBtn}>
            <h3>Pago seguro mediante MercadoPago</h3>
          </div>
        </div>
      )}

      <div className={styles.cart_info}>
        <div className={styles.sum_products}>
          {cartArray.map((p, i) => (
            <div key={i} className={styles.sum_p}>
              <div className={styles.sum_thumbnail}>
                <img src={`${p.imagen_principal.formats.thumbnail.url}`} />
              </div>
              <div className={styles.info}>
                <h4>{p.nombre}</h4>

                <div className={styles.sec}>
                  <p>${p.precio}</p>
                  <p>Cantidad: {p.cartQuantity}</p>
                </div>
              </div>

              <p className={styles.sum_price}>${p.precio * p.cartQuantity}</p>
            </div>
          ))}

          <div className={styles.sum_shipping}>
            <p>Costo de envio: </p>
            <p>Gratis</p>
          </div>
          <div className={styles.sum_total}>
            <p>Total: </p>
            <p>
              ${cartTotal} <span>MXN</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Summary;

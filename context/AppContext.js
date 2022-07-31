import React, { useState, useEffect, useRef } from "react";

const AppContext = React.createContext();

export const AppProvider = (props) => {
  const [cartArray, setCartArray] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState("");
  
  const checkoutBtn = useRef(null);

  useEffect(() => {
    if (window.localStorage.getItem("cartArray")) {
      setCartArray(JSON.parse(window.localStorage.getItem("cartArray")));
    } else {
      window.localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }
    if (window.localStorage.getItem("totalCost")) {
      setCartTotal(Number(window.localStorage.getItem("totalCost")));
    } else {
      window.localStorage.setItem("totalCost", 0);
    }
  }, []);

  const addItemToCart = (value) => {
    let findDuplicated = false;

    cartArray.forEach((current, index) => {
      if (current.id === value.id) {
        let auxArray = cartArray;
        auxArray[index].cartQuantity += 1;
        setCartArray(auxArray);
        findDuplicated = true;

        window.localStorage.setItem("cartArray", JSON.stringify(cartArray));
      }
    });

    if (!findDuplicated) {
      setCartArray((cartArray) => [...cartArray, value]);

      window.localStorage.setItem("cartArray", JSON.stringify([...cartArray, value]));
    }
  };

  const deleteItemToCart = (value) => {
    cartArray.forEach((current, index) => {
      if (current.id === value.id) {
        let auxArray = cartArray;
        if (auxArray[index].cartQuantity <= 1) {
          auxArray.splice(index, 1);
        } else {
          auxArray[index].cartQuantity -= 1;
        }

        setCartArray(auxArray);

        window.window.localStorage.setItem(
          "cartArray",
          JSON.stringify(cartArray)
        );
      }
    });
  };

  const updateQuantity = (nombre, variacion) => {
    let auxArray = cartArray;
    cartArray.forEach((e, index) => {
      if (e.nombre === nombre && e.variacions[0].nombre === variacion) {
        auxArray[index].quantity += 1;
      }
    });
    setCartArray(auxArray);
  };

  return (
    <AppContext.Provider
      value={{
        cartArray,
        addItemToCart,
        deleteItemToCart,
        updateQuantity,
        cartTotal,
        setCartTotal,
        checkoutBtn,
        shippingInfo,
        setShippingInfo,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// AppProvider.getInitialProps = ({req}) => {
//   const cookies = parseCookies(req);

//   return {
//     cookiesCartArray: cookies.cartArray
//   }
// }

export default AppContext;

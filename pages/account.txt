import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { API_URL } from "../utils/urls";

import Link from "next/link";
import AuthContext from "../context/AuthContext";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      if (user) {
        try {
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/pedidos`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          setOrders(data);
        } catch (error) {
          setOrders([]);
        }
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  return {orders, loading};
};

export default function Account() {
  const { user, logoutUser, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);
  console.log(orders);

  if (!user) {
    return (
      <div>
        <p>Please login or register</p>
        <Link href="/">
          <a>Go back</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Log out</title>

        <meta name="description" content="" />
      </Head>
      <h2>Account page</h2>
      <h3>Your Orders</h3>
      {loading && <p>Loading your orders</p>}
      {orders.map((order) => (
        <div key={order.id}>
          {new Date(order.created_at).toLocaleDateString("es-Es")}{" "}
          {order.producto.nombre} ${order.total} {order.estado}
        </div>
      ))}
      <hr />
      <p>Logged in as: {user.email}</p>
      <a href="#" onClick={logoutUser}>
        Logout
      </a>
    </div>
  );
}

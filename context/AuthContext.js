import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";

const AuthContext = createContext();
let magic;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
        //just for test
      const token = await getToken();
      console.log("Token: ", token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Retreieves the magic issues bearer token
  //This allows user to make authenticated requests
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (error) {console.log(err);}
  };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppProvider } from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <content>
          <Navbar />
        
          <Component {...pageProps} />
          <Footer />
        </content>
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;

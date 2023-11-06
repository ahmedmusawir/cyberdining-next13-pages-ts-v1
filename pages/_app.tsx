import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { persistor, store } from "@/store/store";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <ProductProvider>
            <CartProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </CartProvider>
          </ProductProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

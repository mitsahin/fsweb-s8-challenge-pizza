import { useState } from "react";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  const [page, setPage] = useState("home"); // sayfa kontrolü
  const [orderData, setOrderData] = useState(null); // form verisi

  const goToOrder = () => setPage("order");

  const submitOrder = (data) => {
    setOrderData(data);
    setPage("confirmation");
  };

  return (
    <div className="min-h-screen bg-bej">
      {page === "home" && <Home goToOrder={goToOrder} />}
      {page === "order" && <OrderPage submitOrder={submitOrder} />}
      {page === "confirmation" && <ConfirmationPage data={orderData} />}
    </div>
  );
}

export default App;

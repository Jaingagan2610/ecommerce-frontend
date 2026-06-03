import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ flexGrow: 1 }}>
        <AppRoutes />
      </div>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
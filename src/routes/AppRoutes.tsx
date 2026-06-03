import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id/details"
          element={
            <ProductDetail />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
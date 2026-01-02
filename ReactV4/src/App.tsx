import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { MemberProvider } from "./contexts/MemberContext";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
function App() {
  return (
    <>
      <MemberProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MemberProvider>
    </>
  );
}

export default App;

import {Routes, Route} from "react-router-dom";
import ProductList from './pages/ProductList';
import ProductAdd from "./pages/ProductAdd";
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route 
            path="*" 
            element={<ProductList />}
        />
        <Route 
            exact 
            path="/addproduct" 
            element={<ProductAdd />}
        />
      </Routes>
      <Footer />
    </div>
  );
}
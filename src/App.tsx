import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <div className="main-container">
                {/* Left side: Product details (or placeholder) */}
                <div className="details-pane">
                    <Routes>
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="*" element={<div style={{ padding: '20px' }}>Please select a product from the list.</div>} />
                    </Routes>
                </div>

                {/* Right side: Product list */}
                <div className="list-pane">
                    <ProductList />
                </div>
            </div>
        </Router>
    );
};

export default App;

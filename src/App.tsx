import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import "./App.css";
import useMediaQuery from './hooks/useMediaQuery';

const ProductLayout: React.FC = () => {
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    const { id } = useParams<{ id: string }>();

    if (isSmallScreen) {
        return id ? <ProductDetails /> : <ProductList />;
    }

    return (
        <div className="main-container">
            <div className="details-pane">
                {id
                    ? <ProductDetails />
                    : <div> Please select a product from the list.</div>
                }
            </div>
            <div className="list-pane">
                <ProductList />
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/product/:id?" element={<ProductLayout />} />
                <Route path="/" element={<Navigate to="/product" replace />} />
            </Routes>
        </Router>
    );
};

export default App;

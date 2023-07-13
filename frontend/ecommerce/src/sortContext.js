import { createContext } from 'react';

const SortContext = createContext();

const ProductProvider = ({ children }) => {
    const [sortedProducts, setSortedProducts] = useState([]);

    const updateProducts = (updatedProducts) => {
        setSortedProducts(updatedProducts);
    };

    return (
        <ProductContext.Provider value={{ sortedproducts, updateProducts }}>
            {children}
        </ProductContext.Provider>
    );
}

export {SortContext, ProductProvider};
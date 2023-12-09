import "./Catalogue.css";
import { useState,useEffect } from "react";
import DropdownImage from "../../assets/catalog/Vector 50.svg";
import CatalogProduct from "../../Components/CatalogProducts/CatalogProduct";
import axios from 'axios';

export default function Catalogue(){

    const [collectionVisible, setCollectionVisible] = useState(false);
    const [sizeVisible, setSizeVisible] = useState(false);
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);
        
    const loadProducts = async () => {
        try {
            setProducts(null);

            const response = await axios.get('http://localhost:3080/api/product/details', { params: { category } });

            if (response.status === 200) {
                setProducts(response.data.products);
            }else {
                setProducts([]);
            }

        } catch (err) {
          console.error(err);
        }
      };    

    useEffect(() => {
        loadProducts();
    }, [category]);

    const handleCollectionButtonClick = () => {
        setCollectionVisible(!collectionVisible);
    };

    return(
        <>
            <div className="catalog-container">
                <div className="catalog-title">{category}</div>
                <div className="catalog-product-section">
                    <div className="catalog-filter">
                        <div className="catalog-collection-filter">
                            <button onClick={handleCollectionButtonClick} className="filter-collection-btn" id="collection-filter-btn">Category<img src={DropdownImage} alt="" /></button>
                            <div id="collection-filter" style={{ display: collectionVisible ? 'block' : 'none' }}>
                                <button onClick={() => {setCategory("Frocks");}} className="set-category-btn">Frocks</button>
                                <button onClick={() => {setCategory("Shoes");}} className="set-category-btn">Shoes</button>
                                <button onClick={() => {setCategory("Earings");}} className="set-category-btn">Earings</button>
                            </div>
                        </div>
                        <button onClick={() => {setCategory(null);}} className="clear-filter-btn">Clear Filters</button>
                    </div>
                    <div className="catalog-products">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                            <CatalogProduct
                                key={product._id}
                                productId={product._id}
                                productName={product.productName}
                                productPrice={product.productRegularPrice}
                                productImage={product.productImages[0]}
                            />
                            ))
                        ) : (
                            <div className="no-products-message">No products available for the selected category</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


    

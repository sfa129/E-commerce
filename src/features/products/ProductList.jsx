// ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!Array.isArray(items)) return <p>No products found.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {items.map(product => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            width: "200px",
            borderRadius: "8px",
          }}
        >
            
          <img
            src={product.mainImage.url}
            alt={product.name}
            width="100%"
            height="150"
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
          <h4>{product.name}</h4>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

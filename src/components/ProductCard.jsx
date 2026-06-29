// // ── Single Product Card ──────────────────────────────────
// // ✅ Correct field names
// const ProductCard = ({ product, handleAddToCart }) => {

  
//   return (
//     <div className="product-card">
//       <img
//         src={product.productImage}       // ✅ correct
//         alt={product.productName}      // ✅ correct
//         className="product-image"
//       />
//       <div className="product-info">
//         <p className="product-name text-black" >{product.productName}</p>  
//         <p className="product-price">₹{product.productPrice}</p>   
//         <button
//           className="btn btn-warning btn-sm w-100 fw-bold"
//           onClick={() => handleAddToCart(product)}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };
import { useNavigate } from "react-router-dom";

function priceChange(number) {
  return Number(number).toLocaleString("ko-KR");
}

export default function ProductCard({ product, reviewCount }) {
  const navigate = useNavigate();

  return (
    <li className="shop-product-card" onClick={() => navigate(`/detail/${product.id}`)}>
      <div className="shop-product-thumb">
        <img src={product.imgurl} alt={product.title} />
        <span className="shop-cart-icon"><img src="/img/prdcart.png" alt="cart" /></span>
      </div>
      <div className="shop-product-info">
        <strong>{product.title}</strong>
        <p>{priceChange(product.price)}원</p>
        <div className="shop-review">REVIEWS <span>{reviewCount}</span></div>
      </div>
    </li>
  );
}

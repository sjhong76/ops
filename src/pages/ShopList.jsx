import ProductCard from "../components/ProductCard";

const categoryMap = {
  전체: { title: "Shop", description: "OPS의 다양한 상품을 만나보세요." },
  빵: { title: "Bread", description: "매일 정성스럽게 구워낸 OPS 베이커리입니다." },
  쿠키: { title: "Cookie", description: "선물하기 좋은 구움과자와 쿠키 상품입니다." },
  초콜렛: { title: "Chocolate", description: "달콤한 초콜렛 상품을 만나보세요." },
  선물세트: { title: "Gift Set", description: "소중한 분께 전하기 좋은 선물세트입니다." },
  케이크: { title: "Cake", description: "기념일과 특별한 날을 위한 케이크입니다." },
};

const fallbackIds = {
  쿠키: [2, 9, 10, 13],
  선물세트: [7, 13, 16, 6],
};

export default function ShopList({ prdlist, category = "전체" }) {
  const meta = categoryMap[category] || categoryMap.전체;
  let products = category === "전체" ? prdlist : prdlist.filter((item) => item.category === category);

  if (fallbackIds[category]) {
    products = fallbackIds[category].map((id) => prdlist.find((item) => item.id === id)).filter(Boolean);
  }

  return (
    <div id="wrap">
      <div id="container">
        <main id="contents2">
          <div className="path"><ol><li><a href="/">홈</a></li><li><a>SHOP</a></li><li><a>{category}</a></li></ol></div>
          <div className="titlearea shop-titlearea"><h2>{meta.title}</h2><p>{meta.description}</p></div>
          <div className="shop-category-tabs">
            <a href="/shop/bread" className={category === "빵" ? "on" : ""}>빵</a>
            <a href="/shop/cookie" className={category === "쿠키" ? "on" : ""}>쿠키</a>
            <a href="/shop/chocolate" className={category === "초콜렛" ? "on" : ""}>초콜렛</a>
            <a href="/shop/gift" className={category === "선물세트" ? "on" : ""}>선물세트</a>
            <a href="/shop/cake" className={category === "케이크" ? "on" : ""}>케이크</a>
          </div>
          <div className="shop-list-wrap">
            <ul className="shop-product-grid">
              {products.map((product, index) => <ProductCard key={product.id} product={product} reviewCount={(index + 2) * 8} />)}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

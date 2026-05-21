import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const categoryMap = {
  전체:   { title: "Shop",      description: "OPS의 다양한 상품을 만나보세요." },
  빵:     { title: "Bread",     description: "매일 정성스럽게 구워낸 OPS 베이커리입니다." },
  쿠키:   { title: "Cookie",    description: "선물하기 좋은 구움과자와 쿠키 상품입니다." },
  초콜렛: { title: "Chocolate", description: "달콤한 초콜렛 상품을 만나보세요." },
  선물세트: { title: "Gift Set", description: "소중한 분께 전하기 좋은 선물세트입니다." },
  케이크: { title: "Cake",      description: "기념일과 특별한 날을 위한 케이크입니다." },
};

// 데이터에 카테고리가 없는 경우 fallback 상품 id 목록
const fallbackIds = {
  쿠키:   [2, 9, 10, 13],
  선물세트: [7, 13, 16, 6],
};

const CATEGORY_TABS = [
  { label: "빵",     path: "/shop/bread" },
  { label: "쿠키",   path: "/shop/cookie" },
  { label: "초콜렛", path: "/shop/chocolate" },
  { label: "선물세트", path: "/shop/gift" },
  { label: "케이크", path: "/shop/cake" },
];

export default function ShopList({ prdlist, category = "전체" }) {
  const meta = categoryMap[category] || categoryMap.전체;

  let products =
    category === "전체"
      ? prdlist
      : prdlist.filter((item) => item.category === category);

  // fallback: 카테고리 데이터 없는 경우 id로 직접 필터
  if (fallbackIds[category]) {
    products = fallbackIds[category]
      .map((id) => prdlist.find((item) => item.id === id))
      .filter(Boolean);
  }

  return (
    <div id="wrap">
      <div id="container">
        <main id="contents2">

          {/* breadcrumb */}
          <div className="path">
            <ol>
              <li><Link to="/">홈</Link></li>
              <li><span>SHOP</span></li>
              <li><span>{category}</span></li>
            </ol>
          </div>

          {/* 타이틀 */}
          <div className="titlearea shop-titlearea">
            <h2>{meta.title}</h2>
            <p>{meta.description}</p>
          </div>

          {/* ── 카테고리 탭 ── */}
          {/* Link 사용: a href → 풀 리로드 버그 수정 */}
          <div className="shop-category-tabs">
            {CATEGORY_TABS.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className={category === label ? "on" : ""}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* 상품 목록 */}
          <div className="shop-list-wrap">
            <ul className="shop-product-grid">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>

        </main>
      </div>
    </div>
  );
}

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header  from "./components/Header";
import Footer  from "./components/Footer";

import Home     from "./pages/Home";
import About    from "./pages/About";
import Member   from "./pages/Member";
import Login    from "./pages/Login";
import Join     from "./pages/Join";
import ShopList from "./pages/ShopList";
import Detail   from "./pages/Detail";
import Cart     from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function App() {
  const [prdlist, setPrdlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── 서버에서 상품 목록 fetch
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setPrdlist(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("상품 로딩 실패:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/"               element={<Home prdlist={prdlist} />} />

        {/* Shop */}
        <Route path="/shop"           element={<ShopList prdlist={prdlist} category="전체" />} />
        <Route path="/shop/bread"     element={<ShopList prdlist={prdlist} category="빵" />} />
        <Route path="/shop/cookie"    element={<ShopList prdlist={prdlist} category="쿠키" />} />
        <Route path="/shop/chocolate" element={<ShopList prdlist={prdlist} category="초콜렛" />} />
        <Route path="/shop/gift"      element={<ShopList prdlist={prdlist} category="선물세트" />} />
        <Route path="/shop/cake"      element={<ShopList prdlist={prdlist} category="케이크" />} />

        {/* 상세 / 장바구니 */}
        <Route path="/detail/:id"     element={<Detail prdlist={prdlist} />} />
        <Route path="/cart"           element={<Cart />} />

        {/* 정보 페이지 */}
        <Route path="/About"          element={<About />} />
        <Route path="/Member"         element={<Member />} />

        {/* 인증 */}
        <Route path="/Login"          element={<Login />} />
        <Route path="/Join"           element={<Join />} />
        <Route path="/wishlist"        element={<Wishlist />} />
      </Routes>

      <Footer />

      <div
        className="scrollbtn relative flex flexvcenter flexhcenter on"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src="/img/up.png" alt="top" />
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const SHOP_MENUS = [
  { label: "빵",     path: "/shop/bread" },
  { label: "쿠키",   path: "/shop/cookie" },
  { label: "초콜렛", path: "/shop/chocolate" },
  { label: "선물세트", path: "/shop/gift" },
  { label: "케이크", path: "/shop/cake" },
];

const COMMUNITY_MENUS = [
  "NOTICE", "OPS MAGAZINE", "Q&A", "매장안내", "RVIP 전용", "FAQ", "EVENT",
];

export default function Header() {
  const navigate    = useNavigate();
  const dispatch    = useDispatch();
  const [sswitch, setSswitch] = useState(false);

  // ── Redux에서 로그인 상태 읽기
  const { isLoggedIn, userId, wishCount } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header relative">
      <div className="headerwrap fixed">
        <div className="container flex flexvcenter">

          {/* ── 왼쪽 네비 ── */}
          <nav>
            <ul className="flex">
              <li className="categoryitem">
                <a className="categorylink" onClick={() => navigate("/About")}>ABOUT US</a>
              </li>
              <li className="categoryitem">
                <a className="categorylink" onClick={() => navigate("/shop/bread")}>SHOP</a>
                <div className="subcategory">
                  <ul className="subcategorylist">
                    {SHOP_MENUS.map(({ label, path }) => (
                      <li key={label} className="subcategoryitem">
                        <a className="subcategorylink" onClick={() => navigate(path)}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="categoryitem">
                <a className="categorylink" onClick={() => navigate("/Login")}>COMMUNITY</a>
                <div className="subcategory">
                  <ul className="subcategorylist">
                    {COMMUNITY_MENUS.map((label) => (
                      <li key={label} className="subcategoryitem">
                        <a className="subcategorylink" onClick={() => navigate("/Login")}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="categoryitem">
                <a className="categorylink" onClick={() => navigate("/Member")}>MEMBERSHIP</a>
              </li>
            </ul>
          </nav>

          {/* ── 로고 ── */}
          <div className="toplogo">
            <a className="toplogolink flex flexvcenter flexhcenter" onClick={() => navigate("/")}>
              <img src="/img/logo.png" alt="OPS Logo" />
            </a>
          </div>

          {/* ── 오른쪽 유저 메뉴 ── */}
          <div className="rightmenu flex flexvcenter">

            {/* 로그인 상태에 따라 다르게 표시 */}
            {isLoggedIn ? (
              <div>
                <span className="usermenulink">{userId}</span>
                <span className="slash"> | </span>
                <a className="usermenulink" onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                <a className="usermenulink" onClick={() => navigate("/Login")} style={{ cursor: "pointer" }}>Login </a>
                <span className="slash">/ </span>
                <a className="usermenulink" onClick={() => navigate("/Join")} style={{ cursor: "pointer" }}> Join</a>
              </div>
            )}

            <div className="iconmenu flex flexvcenter">
              <a className="iconmenuitem" onClick={() => setSswitch(true)}>
                <img src="/img/search.png" style={{ width: "18px", height: "18px" }} alt="search" />
              </a>
              <a className="iconmenuitem" style={{ position: "relative" }}
                onClick={() => isLoggedIn ? navigate("/wishlist") : navigate("/Login")}>
                <img src="/img/heart.png" style={{ width: "18px", height: "18px" }} alt="wishlist" />
                {isLoggedIn && wishCount > 0 && (
                  <span className="icon-badge">{wishCount}</span>
                )}
              </a>
              <a className="iconmenuitem" onClick={() => navigate("/cart")}>
                <img src="/img/cart.png" style={{ width: "20px", height: "20px" }} alt="cart" />
              </a>
            </div>
          </div>
        </div>

        {/* ── 검색창 ── */}
        <div className={"search " + (sswitch ? "on" : "")}>
          <div className="container">
            <div className="searchform relative flex flexvcenter">
              <fieldset className="searchfield">
                <input id="keyword" name="keyword" type="text"
                  placeholder="무엇을 찾아드릴까요?" className="searchinput" />
              </fieldset>
              <span className="searchclose" onClick={() => setSswitch(false)}>
                <img src="/img/close.png" alt="close" />
              </span>
            </div>
          </div>
        </div>
        <div className={"searchbg " + (sswitch ? "on" : "")} onClick={() => setSswitch(false)} />
      </div>
    </header>
  );
}

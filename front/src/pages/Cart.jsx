import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCount, decreaseCount, deleteItem } from "../store";
import { getTotalPrice, getDeliveryFee, formatPrice } from "../utils/cart";

export default function Cart() {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [fade, setFade] = useState("");
  useEffect(() => {
    setFade("end");
    return () => setFade("");
  }, []);

  // 비로그인 → 로그인 페이지로 (shoppy 패턴)
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

  const totalPrice   = getTotalPrice(cartItems);
  const deliveryFee  = getDeliveryFee(totalPrice);
  const allPrice     = totalPrice + deliveryFee;

  if (!isLoggedIn) return null;

  return (
    <div id="contents2" className={"start " + fade}>
      <div className="titlearea blanktop">
        <h2>장바구니</h2>
      </div>

      {/* 단계 표시 */}
      <div className="ecbasestep">
        <ol>
          <li className="selected">1. 장바구니</li>
          <li>2. 주문서작성</li>
          <li>3. 주문완료</li>
        </ol>
      </div>

      {cartItems.length === 0 ? (
        /* ── 빈 장바구니 (shoppy 패턴) ── */
        <div className="cart-empty">
          <p>장바구니에 담은 상품이 없습니다.</p>
          <Link to="/shop" className="btnsubmit sizem">상품 보러가기</Link>
        </div>
      ) : (
        <div className="cartcontainer">

          {/* ── 상품 목록 ── */}
          <div className="cartproduct">
            <div className="ecbasefold3 theme3 selected">
              <div className="title"><h3>장바구니 상품</h3></div>
              <div className="contents selected">
                <div className="title subtitle">
                  <h4>일반상품 ({cartItems.length})</h4>
                </div>
                <div className="xansordernormal">
                  <div className="xanorderlist">
                    {cartItems.map((item) => (
                      <div className="ecbaseprdinfo" key={item.id}>
                        <div className="prdbox">
                          <input type="checkbox" className="check" />

                          {/* 썸네일 */}
                          <Link className="thumbnail" to={`/detail/${item.id}`}>
                            <img src={item.imgurl} alt={item.name}
                              style={{ width: "100%", height: "100%", cursor: "pointer" }} />
                          </Link>

                          {/* 상품 정보 */}
                          <div className="description">
                            <strong className="prdname">{item.name}</strong>
                            <p className="price">₩{formatPrice(item.ogprice)}</p>
                            <p className="info">배송 : 3만원 이상 [무료] / 기본배송</p>
                          </div>

                          {/* 합계 금액 */}
                          <div className="sumprice">
                            ₩<strong>{formatPrice(item.ogprice * item.count)}</strong>
                          </div>

                          {/* 수량 조절 (shoppy: + / - 버튼 패턴) */}
                          <div className="quantity">
                            <span className="ecbaseqty">
                              <input value={item.count} type="text" readOnly />
                              <a className="up" onClick={() => dispatch(addCount(item.id))}>
                                수량증가
                              </a>
                              <a className="down" onClick={() => dispatch(decreaseCount(item.id))}>
                                수량감소
                              </a>
                            </span>
                          </div>

                          {/* 버튼 */}
                          <div className="buttongroup">
                            <a className="btnnormal sizes">관심상품</a>
                            <a className="btnsubmit sizes" onClick={() => navigate("/")}>
                              주문하기
                            </a>
                          </div>
                        </div>

                        {/* 삭제 버튼 */}
                        <a className="btndelete" onClick={() => dispatch(deleteItem(item.id))}>
                          삭제
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 금액 요약 (shoppy: cart-summary 패턴) ── */}
          <div className="carttotal">
            <div className="sticky">
              <div className="totalsummary">
                <h3 className="totalsummarytitle">주문상품</h3>

                <div className="totalsummaryitem">
                  <div className="heading">
                    <h4 className="title">총 상품금액</h4>
                    <div className="data">
                      ₩<strong><span>{formatPrice(totalPrice)}</span></strong>
                    </div>
                  </div>
                </div>

                <div className="totalsummaryitem">
                  <div className="heading">
                    <h4 className="title">총 배송비</h4>
                    <div className="data">
                      ₩<strong><span>{formatPrice(deliveryFee)}</span></strong>
                    </div>
                  </div>
                  {deliveryFee === 0 && totalPrice > 0 && (
                    <p style={{ fontSize: "11px", color: "#e74c3c", marginTop: "4px" }}>
                      🎉 무료배송 적용됨
                    </p>
                  )}
                  {deliveryFee > 0 && (
                    <p style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>
                      {formatPrice(30000 - totalPrice)}원 더 담으면 무료배송
                    </p>
                  )}
                </div>

                <div className="total">
                  <h3 className="title">결제예정금액</h3>
                  <div className="paymentprice">
                    ₩<strong><span>{formatPrice(allPrice)}</span></strong>
                  </div>
                </div>
              </div>

              <div className="ecbasebutton">
                <a className="btnsubmit gfull sizel"
                  onClick={() => navigate("/checkout")}>
                  전체상품주문
                </a>
                <a className="btnnormal gfull sizel">선택상품주문</a>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

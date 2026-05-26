import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartCount } from "../store";
import { axiosGet, axiosPatch, axiosDelete } from "../utils/dataFetch";
import { getDeliveryFee, formatPrice } from "../utils/cart";

export default function Cart() {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const uid        = useSelector((state) => state.user.uid);

  const [cartItems, setCartItems] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [fade,      setFade]      = useState("");

  useEffect(() => {
    setFade("end");
    return () => setFade("");
  }, []);

  // ── DB에서 장바구니 목록 fetch
  const fetchCart = async () => {
    try {
      const data = await axiosGet(`/cart/${uid}`);
      setCartItems(data);
      dispatch(setCartCount(data.reduce((sum, item) => sum + item.count, 0)));
    } catch (err) {
      console.error("장바구니 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && uid) fetchCart();
  }, [uid, isLoggedIn]);

  // ── 수량 변경 → PATCH /api/cart/:cid
  const handleUpdateCount = async (cid, count) => {
    if (count < 1) { alert("최소 주문수량은 1개 입니다."); return; }
    try {
      await axiosPatch(`/cart/${cid}`, { count });
      fetchCart();
    } catch (err) {
      console.error("수량 변경 실패:", err);
    }
  };

  // ── 삭제 → DELETE /api/cart/:cid
  const handleDelete = async (cid) => {
    try {
      await axiosDelete(`/cart/${cid}`);
      fetchCart();
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  const totalPrice  = cartItems.reduce((sum, item) => sum + item.ogprice * item.count, 0);
  const deliveryFee = getDeliveryFee(totalPrice);
  const allPrice    = totalPrice + deliveryFee;

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div id="contents2" className={"start " + fade}>
      <div className="titlearea blanktop">
        <h2>장바구니</h2>
      </div>

      <div className="ecbasestep">
        <ol>
          <li className="selected">1. 장바구니</li>
          <li>2. 주문서작성</li>
          <li>3. 주문완료</li>
        </ol>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>장바구니에 담은 상품이 없습니다.</p>
          <Link to="/shop" className="btnsubmit sizem">상품 보러가기</Link>
        </div>
      ) : (
        <div className="cartcontainer">
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
                      <div className="ecbaseprdinfo" key={item.cid}>
                        <div className="prdbox">
                          <input type="checkbox" className="check" />

                          <Link className="thumbnail" to={`/detail/${item.pid}`}>
                            <img src={item.imgurl} alt={item.name}
                              style={{ width: "100%", height: "100%", cursor: "pointer" }} />
                          </Link>

                          <div className="description">
                            <strong className="prdname">{item.name}</strong>
                            <p className="price">₩{formatPrice(item.ogprice)}</p>
                            <p className="info">배송 : 3만원 이상 [무료] / 기본배송</p>
                          </div>

                          <div className="sumprice">
                            ₩<strong>{formatPrice(item.ogprice * item.count)}</strong>
                          </div>

                          <div className="quantity">
                            <span className="ecbaseqty">
                              <input value={item.count} type="text" readOnly />
                              <a className="up"
                                onClick={() => handleUpdateCount(item.cid, item.count + 1)}>
                                수량증가
                              </a>
                              <a className="down"
                                onClick={() => handleUpdateCount(item.cid, item.count - 1)}>
                                수량감소
                              </a>
                            </span>
                          </div>

                          <div className="buttongroup">
                            <a className="btnnormal sizes">관심상품</a>
                            <a className="btnsubmit sizes" onClick={() => navigate("/")}>주문하기</a>
                          </div>
                        </div>

                        <a className="btndelete" onClick={() => handleDelete(item.cid)}>삭제</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="carttotal">
            <div className="sticky">
              <div className="totalsummary">
                <h3 className="totalsummarytitle">주문상품</h3>
                <div className="totalsummaryitem">
                  <div className="heading">
                    <h4 className="title">총 상품금액</h4>
                    <div className="data">₩<strong><span>{formatPrice(totalPrice)}</span></strong></div>
                  </div>
                </div>
                <div className="totalsummaryitem">
                  <div className="heading">
                    <h4 className="title">총 배송비</h4>
                    <div className="data">₩<strong><span>{formatPrice(deliveryFee)}</span></strong></div>
                  </div>
                  {deliveryFee === 0 && totalPrice > 0 && (
                    <p style={{ fontSize: "11px", color: "#e74c3c", marginTop: "4px" }}>🎉 무료배송 적용됨</p>
                  )}
                  {deliveryFee > 0 && (
                    <p style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>
                      {formatPrice(30000 - totalPrice)}원 더 담으면 무료배송
                    </p>
                  )}
                </div>
                <div className="total">
                  <h3 className="title">결제예정금액</h3>
                  <div className="paymentprice">₩<strong><span>{formatPrice(allPrice)}</span></strong></div>
                </div>
              </div>
              <div className="ecbasebutton">
                <a className="btnsubmit gfull sizel" onClick={() => navigate("/order")}>전체상품주문</a>
                <a className="btnnormal gfull sizel">선택상품주문</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

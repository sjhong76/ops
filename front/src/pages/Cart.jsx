import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartCount, setWishCount } from "../store"; // 💡 리덕스 액션들 깔끔하게 대기
import { axiosGet, axiosPatch, axiosDelete } from "../utils/dataFetch";
import { getDeliveryFee, formatPrice, getTotalPrice } from "../utils/cart"; // 💡 getTotalPrice 추가

export default function Cart() {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const uid        = useSelector((state) => state.user.uid);

  const [cartItems, setCartItems] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [fade,      setFade]      = useState("");
  
  // 💡 [선택 기능] 체크박스 상태 관리 (선택된 상품들의 cid를 배열로 보관)
  const [checkedCids, setCheckedCids] = useState([]);

  useEffect(() => {
    setFade("end");
    return () => setFade("");
  }, []);

  // ── DB에서 장바구니 목록 fetch
  const fetchCart = async () => {
    try {
      const data = await axiosGet(`/cart/${uid}`);
      setCartItems(data);
      // 장바구니 로드 시 기본적으로 모든 상품을 체크 상태로 세팅
      setCheckedCids(data.map(item => item.cid));
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

  // ── 💡 찜 토글 기능 최종 수정 (이름 충돌 제거 및 pid 매핑)
  const handleToggleWish = async (item) => {
    if (!isLoggedIn) { alert("로그인이 필요합니다."); navigate("/Login"); return; }
    try {
      const res  = await fetch("/api/wishlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ uid, pid: Number(item.pid) }), // 💡 id ➔ pid로 정확히 수정!
      });
      const data = await res.json();
      dispatch(setWishCount(data.wishCount)); // 💡 이제 리덕스 액션이 완벽하게 실행됩니다!
      // alert("관심상품 상태가 변경되었습니다.");
    } catch (err) { 
      console.error("찜 토글 실패:", err); 
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

  /* ────────────────────────────────────────
     🔥 체크박스 및 선택 주문 제어 핸들러
  ──────────────────────────────────────── */
  const handleCheckToggle = (cid) => {
    if (checkedCids.includes(cid)) {
      setCheckedCids(checkedCids.filter(id => id !== cid));
    } else {
      setCheckedCids([...checkedCids, cid]);
    }
  };

  const handleAllCheckToggle = () => {
    if (checkedCids.length === cartItems.length) {
      setCheckedCids([]);
    } else {
      setCheckedCids(cartItems.map(item => item.cid));
    }
  };

  // 개별 상품 [주문하기]
  const handleSingleOrder = (item) => {
    // Order.jsx 규격에 맞춰 위조 포장 후 배열로 감싸서 패스!
    const directOrderItem = {
      cid: item.cid,
      name: item.name,
      imgurl: item.imgurl,
      ogprice: item.ogprice,
      count: item.count
    };
    navigate("/order", { state: { directItems: [directOrderItem] } });
  };

  // 하단 [선택상품주문]
  const handleSelectedOrder = () => {
    const selectedItems = cartItems.filter(item => checkedCids.includes(item.cid));
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다. 주문할 상품을 체크해 주세요.");
      return;
    }
    // Order.jsx 포맷에 완벽 매칭되는 리스트 전달
    const formattedItems = selectedItems.map(item => ({
      cid: item.cid,
      name: item.name,
      imgurl: item.imgurl,
      ogprice: item.ogprice,
      count: item.count
    }));
    navigate("/order", { state: { directItems: formattedItems } });
  };

  // ── 💡 [금액 계산] 내가 체크박스로 고른 상품들만 실시간 동적 계산!
  const checkedItems = cartItems.filter(item => checkedCids.includes(item.cid));
  const totalPrice  = checkedItems.reduce((sum, item) => sum + item.ogprice * item.count, 0);
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
                
                {/* 💡 상단 마스터 체크박스 연동 */}
                <div className="title subtitle" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input 
                    type="checkbox" 
                    checked={cartItems.length > 0 && checkedCids.length === cartItems.length}
                    onChange={handleAllCheckToggle}
                    style={{ cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  <h4>일반상품 ({cartItems.length})</h4>
                </div>

                <div className="xansordernormal">
                  <div className="xanorderlist">
                    {cartItems.map((item) => (
                      <div className="ecbaseprdinfo" key={item.cid}>
                        <div className="prdbox">
                          
                          {/* 💡 체크박스 상태 바인딩 */}
                          <label className="check-label" style={{display:"flex", alignItems:"center", cursor:"pointer"}}>
                            <input 
                              type="checkbox" 
                              className="check hidden-check" // 💡 기본 체크박스를 숨길 클래스 추가
                              checked={checkedCids.includes(item.cid)}
                              onChange={() => handleCheckToggle(item.cid)}/>
                            <span className="check-mark"></span>
                          </label>

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
                            <a className="btnnormal sizes" onClick={()=> handleToggleWish(item)}>관심상품</a>
                            
                            {/* 💡 개별 상품 주문하기 버튼 이벤트 꼬임 완벽 방지 */}
                            <a className="btnsubmit sizes" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSingleOrder(item); }}>
                              주문하기
                            </a>
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
                {/* 💡 전체 상품 주문 클릭 시에도 현재 담긴 장바구니 전체를 깔끔하게 배열 포장하여 라우팅 */}
                <a className="btnsubmit gfull sizel" onClick={() => navigate("/order", { state: { directItems: cartItems } })}>전체상품주문</a>
                
                {/* 💡 선택상품주문 버튼 핸들러 연결 */}
                <a className="btnnormal gfull sizel" onClick={handleSelectedOrder}>선택상품주문</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
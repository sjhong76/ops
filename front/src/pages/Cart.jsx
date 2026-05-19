import { useDispatch, useSelector } from "react-redux";
// import store, {changeName, increase} from './store.js'
import { addCount, decreaseCount, deleteItem, sortName } from "../store";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Cart() {
  let state = useSelector((state) => state);
  // console.log(state.cart[0].name);

  // dispatch는  store.js 로 요청보내주는 함수
  let dispatch = useDispatch();

  const smallProdcuctStyle = {
    width: "100%",
    height: "100%",
    cursor: "pointer",
  };

  let textverticalAlign = {
    verticalAlign: "middle",
    textAlign: "center",
  };

  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  const [cartselect, setCartselect] = useState(true);

  const trCount = state.cart.length;

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const totalCartPrice = state.cart.reduce(
    (total, item) => total + item.ogprice * item.count,
    0,
  );

  let delprice = 3000;
  if (totalCartPrice >= 30000) {
    delprice = 0;
  } else if (totalCartPrice <= 0) {
    delprice = 0;
  } else {
    delprice = 3000;
  }

  let allprice = totalCartPrice + delprice;

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
      <div className="cartcontainer">
        <div className="cartproduct">
          <div
            className={
              "ecbasefold3 theme3 " + (cartselect == true ? "selected" : null)
            }
          >
            <div
              className="title"
              onClick={() => {
                setCartselect(!cartselect);
              }}
            >
              <h3>장바구니 상품</h3>
            </div>
            <div
              className={"contents " + (cartselect == true ? "selected" : null)}
            >
              <div className="title subtitle">
                <h4>일반상품 ({trCount})</h4>
              </div>
              <div className="xansordernormal">
                <div className="xanorderlist">
                  {state.cart.map((a, i) => (
                    <div className="ecbaseprdinfo" key={i}>
                      <div className="prdbox">
                        <input
                          type="checkbox"
                          id="basketchkid0"
                          name="basketproductnormaltypenormal"
                          className="check"
                        ></input>
                        <Link
                          className="thumbnail"
                          to={`/detail/${state.cart[i].id}`}
                        >
                          <img
                            src={`img/${state.cart[i].imgurl}`}
                            style={smallProdcuctStyle}
                          />
                        </Link>
                        <div className="description">
                          <strong className="prdname">
                            {state.cart[i].name}
                          </strong>
                          <p className="price">
                            ₩{formatNumber(state.cart[i].ogprice)}
                          </p>
                          <p className="info">
                            배송 : 3만원 이상 [무료] / 기본배송
                          </p>
                        </div>
                        <div className="sumprice">
                          ₩
                          <strong>
                            {formatNumber(
                              state.cart[i].ogprice * state.cart[i].count,
                            )}{" "}
                          </strong>
                        </div>
                        <div className="quantity">
                          <div>
                            <span className="ecbaseqty">
                              <input
                                id="quantityid0"
                                name="quantityname0"
                                value={state.cart[i].count}
                                type="text"
                              ></input>
                              <a
                                className="up"
                                onClick={() => {
                                  dispatch(addCount(state.cart[i].id));
                                }}
                              >
                                수량증가
                              </a>
                              <a
                                className="down"
                                onClick={() => {
                                  dispatch(decreaseCount(state.cart[i].id));
                                }}
                              >
                                수량감소
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="buttongroup">
                          <a className="btnnormal sizes">관심상품</a>
                          <a className="btnsubmit sizes">주문하기</a>
                        </div>
                      </div>
                      <a
                        className="btndelete"
                        onClick={() => {
                          dispatch(deleteItem(state.cart[i].id));
                        }}
                      >
                        삭제
                      </a>
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
                  <div className="data">
                    ₩
                    <strong>
                      <span>{formatNumber(totalCartPrice)}</span>
                    </strong>
                  </div>
                </div>
              </div>
              <div className="totalsummaryitem">
                <div className="heading">
                  <h4 className="title">총 배송비</h4>
                  <div className="data">
                    ₩
                    <strong>
                      <span>{formatNumber(delprice)}</span>
                    </strong>
                  </div>
                </div>
              </div>
              <div className="total">
                <h3 className="title">결제예정금액</h3>
                <div className="paymentprice">
                  ₩
                  <strong>
                    <span>{formatNumber(allprice)}</span>
                  </strong>
                </div>
              </div>
            </div>
            <div>
              <div className="ecbasebutton">
                <a className="btnsubmit gfull sizel">전체상품주문</a>
                <a className="btnnormal gfull sizel">선택상품주문</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Cart;
